//! La `Pose`: residuos con su tipo y sus coordenadas.
//!
//! A diferencia de Rosetta, donde cada `Residue` es un objeto con sus propios átomos, aquí las
//! coordenadas de toda la estructura van en un solo arreglo contiguo y cada residuo guarda
//! dónde empiezan las suyas. Es la disposición que luego necesitan SIMD y el cálculo de energía.

use std::sync::Arc;

use crate::chemical::{ResidueType, ResidueTypeSet};
use crate::io::pdb::{self, AtomRecord};

#[derive(Debug, Clone)]
pub struct Residue {
    pub rtype: Arc<ResidueType>,
    pub chain: char,
    /// Número de residuo en el PDB de origen.
    pub pdb_seq: i32,
    pub pdb_i_code: char,
    atom_offset: usize,
}

#[derive(Debug, Clone, Default)]
pub struct Pose {
    residues: Vec<Residue>,
    coords: Vec<[f64; 3]>,
    /// Si el átomo vino en el archivo. Los ausentes tienen coordenadas en cero.
    present: Vec<bool>,
    b_factors: Vec<f64>,
}

/// Lo que no se pudo trasladar del archivo a la `Pose`, para no perderlo en silencio.
#[derive(Debug, Clone, Default, PartialEq)]
pub struct LoadReport {
    /// Residuos sin tipo cargado (agua, ligandos…). Rosetta, por defecto, se detendría.
    pub skipped_residues: Vec<SkippedResidue>,
    /// Átomos que el tipo de residuo no declara. Hoy son sobre todo los de los terminales
    /// (`OXT`, `1H`…), que en Rosetta añaden los parches, todavía sin portar.
    pub unknown_atoms: Vec<UnknownAtom>,
    /// Átomos con ocupación ≤ 0, que Rosetta trata como ausentes.
    pub zero_occupancy_atoms: usize,
    /// Ubicaciones alternativas descartadas (se queda la de mayor ocupación; ante empate, la primera).
    pub alt_locs_dropped: usize,
}

#[derive(Debug, Clone, PartialEq)]
pub struct SkippedResidue {
    pub chain: char,
    pub res_seq: i32,
    pub i_code: char,
    pub res_name: String,
}

#[derive(Debug, Clone, PartialEq)]
pub struct UnknownAtom {
    /// Índice del residuo en la `Pose`.
    pub residue: usize,
    pub atom_name: String,
}

impl Pose {
    /// Construye una `Pose` desde el texto de un PDB.
    pub fn from_pdb_str(text: &str, types: &ResidueTypeSet) -> (Pose, LoadReport) {
        Self::from_pdb_records(&pdb::parse_pdb(text), types)
    }

    pub fn from_pdb_records(records: &[AtomRecord], types: &ResidueTypeSet) -> (Pose, LoadReport) {
        let mut pose = Pose::default();
        let mut report = LoadReport::default();

        for group in group_by_residue(records) {
            let first = &group[0];
            let Some(rtype) = best_type(group, types) else {
                report.skipped_residues.push(SkippedResidue {
                    chain: first.chain,
                    res_seq: first.res_seq,
                    i_code: first.i_code,
                    res_name: first.res_name.clone(),
                });
                continue;
            };

            let residue_index = pose.residues.len();
            let offset = pose.coords.len();
            let n = rtype.n_atoms();
            pose.coords.resize(offset + n, [0.0; 3]);
            pose.present.resize(offset + n, false);
            pose.b_factors.resize(offset + n, 0.0);
            let mut occupancy = vec![f64::NEG_INFINITY; n];

            for record in group {
                let Some(atom) = rtype.atom_index(&record.name) else {
                    report.unknown_atoms.push(UnknownAtom {
                        residue: residue_index,
                        atom_name: record.name.trim().to_string(),
                    });
                    continue;
                };
                if record.occupancy <= 0.0 {
                    report.zero_occupancy_atoms += 1;
                    continue;
                }
                if pose.present[offset + atom] {
                    report.alt_locs_dropped += 1;
                    if record.occupancy <= occupancy[atom] {
                        continue;
                    }
                }
                occupancy[atom] = record.occupancy;
                pose.coords[offset + atom] = record.xyz;
                pose.present[offset + atom] = true;
                pose.b_factors[offset + atom] = record.b_factor;
            }

            pose.residues.push(Residue {
                rtype,
                chain: first.chain,
                pdb_seq: first.res_seq,
                pdb_i_code: first.i_code,
                atom_offset: offset,
            });
        }
        (pose, report)
    }

    pub fn len(&self) -> usize {
        self.residues.len()
    }

    pub fn is_empty(&self) -> bool {
        self.residues.is_empty()
    }

    pub fn residues(&self) -> &[Residue] {
        &self.residues
    }

    pub fn residue(&self, index: usize) -> &Residue {
        &self.residues[index]
    }

    /// Coordenadas de un átomo, o `None` si no vino en el archivo.
    pub fn xyz(&self, residue: usize, atom: usize) -> Option<[f64; 3]> {
        let i = self.residues[residue].atom_offset + atom;
        self.present[i].then(|| self.coords[i])
    }

    /// Índices de los átomos reales del tipo que faltan en un residuo. Los virtuales no cuentan:
    /// nunca vienen en un PDB.
    pub fn missing_atoms(&self, residue: usize) -> impl Iterator<Item = usize> + '_ {
        let r = &self.residues[residue];
        (0..r.rtype.n_atoms())
            .filter(move |&a| !r.rtype.atoms[a].is_virtual() && !self.present[r.atom_offset + a])
    }

    /// Secuencia en código de una letra.
    pub fn sequence(&self) -> String {
        self.residues.iter().map(|r| r.rtype.name1).collect()
    }

    /// Cadenas en orden de aparición.
    pub fn chains(&self) -> Vec<char> {
        let mut chains: Vec<char> = Vec::new();
        for r in &self.residues {
            if !chains.contains(&r.chain) {
                chains.push(r.chain);
            }
        }
        chains
    }

    /// Registros PDB de los átomos presentes, con los nombres de Rosetta.
    pub fn to_pdb_records(&self) -> Vec<AtomRecord> {
        let mut records = Vec::new();
        for r in &self.residues {
            for (a, atom) in r.rtype.atoms.iter().enumerate() {
                let i = r.atom_offset + a;
                if !self.present[i] {
                    continue;
                }
                records.push(AtomRecord {
                    het: false,
                    serial: records.len() as i32 + 1,
                    name: atom.name.clone(),
                    alt_loc: ' ',
                    res_name: r.rtype.name3.clone(),
                    chain: r.chain,
                    res_seq: r.pdb_seq,
                    i_code: r.pdb_i_code,
                    xyz: self.coords[i],
                    occupancy: 1.0,
                    b_factor: self.b_factors[i],
                    element: atom.element.clone().unwrap_or_default(),
                });
            }
        }
        records
    }

    pub fn to_pdb_string(&self) -> String {
        pdb::write_pdb(&self.to_pdb_records())
    }
}

/// Agrupa registros consecutivos con la misma cadena, número y código de inserción.
fn group_by_residue(records: &[AtomRecord]) -> Vec<&[AtomRecord]> {
    let key = |r: &AtomRecord| (r.chain, r.res_seq, r.i_code, r.res_name.clone());
    let mut groups = Vec::new();
    let mut start = 0;
    for i in 1..=records.len() {
        if i == records.len() || key(&records[i]) != key(&records[start]) {
            if start < i {
                groups.push(&records[start..i]);
            }
            start = i;
        }
    }
    groups
}

/// Elige, entre los tipos con ese código de tres letras, el que reconoce más átomos del grupo.
/// Ante empate gana el tipo base sobre las variantes y, después, el primero en cargarse:
/// así un HIS sin hidrógenos queda como `HIS` y un CYS sin `HG` como `CYS`, no `CYZ`.
fn best_type(group: &[AtomRecord], types: &ResidueTypeSet) -> Option<Arc<ResidueType>> {
    let res_name = &group[0].res_name;
    let mut best: Option<(&Arc<ResidueType>, usize)> = None;
    for candidate in types.candidates(res_name) {
        let matched = group
            .iter()
            .filter(|r| candidate.atom_index(&r.name).is_some())
            .count();
        let better = match best {
            None => true,
            Some((current, current_matched)) => {
                matched > current_matched
                    || (matched == current_matched
                        && current.is_variant()
                        && !candidate.is_variant())
            }
        };
        if better {
            best = Some((candidate, matched));
        }
    }
    best.map(|(rtype, _)| Arc::clone(rtype))
}
