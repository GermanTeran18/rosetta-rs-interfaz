//! Lector de archivos de topología `.params`.
//!
//! Sigue a `read_topology_file` de `core/chemical/residue_io.cc`: primero las líneas `ATOM`
//! (para que los enlaces y coordenadas internas puedan referirse a cualquier átomo), luego el
//! resto de etiquetas y al final `ICOOR_INTERNAL`. Las etiquetas que todavía no se usan en el
//! port (`ROTAMER_AA`, `NU`, `ADD_RING`…) se ignoran sin error.

use super::residue_type::{AtomSpec, ICoor, ResidueType};
use crate::error::{Error, Result};

/// Lee un `.params`. `source` solo se usa para los mensajes de error.
pub fn parse_params(text: &str, source: &str) -> Result<ResidueType> {
    // Como Rosetta: se descarta todo desde '#' y se omiten las líneas vacías.
    let lines: Vec<(usize, &str)> = text
        .lines()
        .enumerate()
        .map(|(i, line)| (i + 1, line.split('#').next().unwrap_or("")))
        .filter(|(_, line)| !line.trim().is_empty())
        .collect();

    let err = |line: usize, message: String| Error::parse(source, line, message);

    let mut atoms = Vec::new();
    for &(n, line) in &lines {
        let line = line.trim_end();
        let mut tokens = line.split_whitespace();
        if tokens.next() != Some("ATOM") {
            continue;
        }
        // El nombre son las columnas 6-9 tal cual, con su relleno; el resto va separado por espacios.
        let name = line
            .get(5..9)
            .ok_or_else(|| err(n, "línea ATOM demasiado corta".into()))?
            .to_string();
        let _name_token = tokens.next();
        let atom_type = tokens
            .next()
            .ok_or_else(|| err(n, "ATOM sin tipo de átomo".into()))?;
        let mm_type = tokens
            .next()
            .ok_or_else(|| err(n, "ATOM sin tipo MM".into()))?;
        let charge: f64 = tokens
            .next()
            .and_then(|t| t.parse().ok())
            .ok_or_else(|| err(n, "ATOM sin carga válida".into()))?;
        let rest: Vec<&str> = tokens.collect();
        let (parse_charge, properties) = match rest.first().and_then(|t| t.parse::<f64>().ok()) {
            Some(value) => (value, &rest[1..]),
            None => (charge, &rest[..]),
        };
        atoms.push(AtomSpec {
            name,
            atom_type: atom_type.to_string(),
            mm_type: mm_type.to_string(),
            charge,
            parse_charge,
            element: None,
            properties: properties.iter().map(|p| p.to_string()).collect(),
        });
    }
    if atoms.is_empty() {
        return Err(err(0, "el archivo no tiene líneas ATOM válidas".into()));
    }

    let find = |name: &str| atoms.iter().position(|a| a.trimmed_name() == name.trim());
    let atom = |n: usize, name: Option<&str>| -> Result<usize> {
        let name = name.ok_or_else(|| err(n, "falta un nombre de átomo".into()))?;
        find(name).ok_or_else(|| err(n, format!("el átomo {name:?} no está declarado en ATOM")))
    };

    let mut rsd = ResidueType {
        name: String::new(),
        name3: String::new(),
        name1: 'X',
        kind: String::new(),
        aa: String::new(),
        atoms: Vec::new(),
        aliases: Vec::new(),
        bonds: Vec::new(),
        chis: Vec::new(),
        properties: Vec::new(),
        variants: Vec::new(),
        nbr_atom: 0,
        nbr_radius: 0.0,
        first_sidechain_atom: None,
        lower_connect: None,
        upper_connect: None,
        icoor: Vec::new(),
    };
    let mut nbr_atom = None;
    let mut nbr_radius = None;

    for &(n, line) in &lines {
        let mut t = line.split_whitespace();
        let Some(tag) = t.next() else { continue };
        match tag {
            "NAME" => rsd.name = t.next().unwrap_or_default().to_string(),
            "IO_STRING" => {
                rsd.name3 = t.next().unwrap_or_default().to_string();
                rsd.name1 = t.next().and_then(|s| s.chars().next()).unwrap_or('X');
            }
            "TYPE" => rsd.kind = t.next().unwrap_or_default().to_string(),
            "AA" => rsd.aa = t.next().unwrap_or_default().to_string(),
            "ATOM_ALIAS" => {
                // Columnas fijas, como en Rosetta: átomo en 12-15 y alias cada 5 columnas desde la 17.
                let canonical = line
                    .get(11..15)
                    .ok_or_else(|| err(n, "ATOM_ALIAS demasiado corta".into()))?;
                let index = atom(n, Some(canonical))?;
                let mut pos = 16;
                while let Some(alias) = line.get(pos..pos + 4) {
                    rsd.aliases.push((index, alias.trim().to_string()));
                    pos += 5;
                }
            }
            "BOND" => {
                let a = atom(n, t.next())?;
                let b = atom(n, t.next())?;
                rsd.bonds.push((a, b, "1".to_string()));
            }
            "BOND_TYPE" => {
                let a = atom(n, t.next())?;
                let b = atom(n, t.next())?;
                let order = t.next().unwrap_or("1").to_string();
                rsd.bonds.push((a, b, order));
            }
            "CHI" => {
                let index: usize = t
                    .next()
                    .and_then(|s| s.parse().ok())
                    .ok_or_else(|| err(n, "CHI sin número".into()))?;
                let chi = [
                    atom(n, t.next())?,
                    atom(n, t.next())?,
                    atom(n, t.next())?,
                    atom(n, t.next())?,
                ];
                if index != rsd.chis.len() + 1 {
                    return Err(err(n, format!("CHI {index} fuera de orden")));
                }
                rsd.chis.push(chi);
            }
            "PROPERTIES" => rsd.properties.extend(t.map(str::to_string)),
            "VARIANT" => rsd.variants.extend(t.map(str::to_string)),
            "NBR_ATOM" => nbr_atom = Some(atom(n, t.next())?),
            "NBR_RADIUS" => {
                nbr_radius = Some(
                    t.next()
                        .and_then(|s| s.parse::<f64>().ok())
                        .ok_or_else(|| err(n, "NBR_RADIUS no es un número".into()))?,
                )
            }
            "FIRST_SIDECHAIN_ATOM" => {
                let name = t.next().unwrap_or("NONE");
                if name != "NONE" {
                    rsd.first_sidechain_atom = Some(atom(n, Some(name))?);
                }
            }
            "LOWER_CONNECT" => rsd.lower_connect = Some(atom(n, t.next())?),
            "UPPER_CONNECT" => rsd.upper_connect = Some(atom(n, t.next())?),
            "ICOOR_INTERNAL" => {
                let child = t
                    .next()
                    .ok_or_else(|| err(n, "ICOOR_INTERNAL sin átomo".into()))?;
                let mut number = || -> Result<f64> {
                    t.next()
                        .and_then(|s| s.parse().ok())
                        .ok_or_else(|| err(n, "ICOOR_INTERNAL con un número inválido".into()))
                };
                let (phi, theta, distance) = (number()?, number()?, number()?);
                let mut stub_atom = || -> Result<String> {
                    t.next().map(str::to_string).ok_or_else(|| {
                        err(n, "ICOOR_INTERNAL sin sus tres átomos de referencia".into())
                    })
                };
                let stub = [stub_atom()?, stub_atom()?, stub_atom()?];
                rsd.icoor.push(ICoor {
                    child: child.to_string(),
                    phi: phi.to_radians(),
                    theta: theta.to_radians(),
                    distance,
                    stub,
                });
            }
            _ => {}
        }
    }

    rsd.nbr_atom = nbr_atom.ok_or_else(|| err(0, "falta la línea NBR_ATOM".into()))?;
    rsd.nbr_radius = nbr_radius.ok_or_else(|| err(0, "falta la línea NBR_RADIUS".into()))?;
    if rsd.name.is_empty() {
        return Err(err(0, "falta la línea NAME".into()));
    }
    rsd.atoms = atoms;
    Ok(rsd)
}
