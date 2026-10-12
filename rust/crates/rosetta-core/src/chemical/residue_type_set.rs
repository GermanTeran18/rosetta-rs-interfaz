use std::collections::HashMap;
use std::fs;
use std::path::Path;
use std::sync::Arc;

use super::params::parse_params;
use super::residue_type::ResidueType;
use crate::error::{Error, Result};

const FA_STANDARD: &str = "chemical/residue_type_sets/fa_standard";
const ATOM_PROPERTIES: &str = "chemical/atom_type_sets/fa_standard/atom_properties.txt";

/// Conjunto de tipos de residuo, compartible entre hilos.
///
/// Rosetta carga una copia por proceso; aquí los tipos van en `Arc` para cargarlos una sola vez.
#[derive(Debug, Clone, Default)]
pub struct ResidueTypeSet {
    types: Vec<Arc<ResidueType>>,
    by_name3: HashMap<String, Vec<usize>>,
}

impl ResidueTypeSet {
    /// Carga los aminoácidos canónicos de `fa_standard`, en el orden de `residue_types.txt`.
    ///
    /// `database` es la carpeta `database/` de Rosetta. Los parches (terminales, variantes)
    /// todavía no están portados.
    pub fn load_canonical_amino_acids(database: &Path) -> Result<Self> {
        let elements = load_elements(&database.join(ATOM_PROPERTIES))?;
        let set_dir = database.join(FA_STANDARD);
        let list_path = set_dir.join("residue_types.txt");
        let list = fs::read_to_string(&list_path).map_err(|e| Error::io(&list_path, e))?;

        let mut types = Vec::new();
        for line in list.lines() {
            let entry = line.split('#').next().unwrap_or("").trim();
            if !entry.starts_with("residue_types/l-caa/") {
                continue;
            }
            let path = set_dir.join(entry);
            let text = fs::read_to_string(&path).map_err(|e| Error::io(&path, e))?;
            let mut rsd = parse_params(&text, entry)?;
            for atom in &mut rsd.atoms {
                atom.element = elements.get(&atom.atom_type).cloned();
            }
            types.push(rsd);
        }
        Ok(Self::from_types(types))
    }

    pub fn from_types(types: Vec<ResidueType>) -> Self {
        let mut by_name3: HashMap<String, Vec<usize>> = HashMap::new();
        for (i, rsd) in types.iter().enumerate() {
            by_name3.entry(rsd.name3.clone()).or_default().push(i);
        }
        Self {
            types: types.into_iter().map(Arc::new).collect(),
            by_name3,
        }
    }

    /// Busca por nombre único (`NAME`).
    pub fn get(&self, name: &str) -> Option<&Arc<ResidueType>> {
        self.types.iter().find(|rsd| rsd.name == name)
    }

    /// Tipos que corresponden a un código de tres letras de PDB, en orden de carga.
    pub fn candidates(&self, name3: &str) -> impl Iterator<Item = &Arc<ResidueType>> {
        self.by_name3
            .get(name3)
            .into_iter()
            .flatten()
            .map(|&i| &self.types[i])
    }

    pub fn iter(&self) -> impl Iterator<Item = &Arc<ResidueType>> {
        self.types.iter()
    }

    pub fn len(&self) -> usize {
        self.types.len()
    }

    pub fn is_empty(&self) -> bool {
        self.types.is_empty()
    }
}

/// Lee la columna de elemento de `atom_properties.txt`: tipo de átomo → elemento.
fn load_elements(path: &Path) -> Result<HashMap<String, String>> {
    let text = fs::read_to_string(path).map_err(|e| Error::io(path, e))?;
    Ok(text
        .lines()
        .skip(1)
        .filter_map(|line| {
            let mut t = line.split('#').next()?.split_whitespace();
            Some((t.next()?.to_string(), t.next()?.to_string()))
        })
        .collect())
}
