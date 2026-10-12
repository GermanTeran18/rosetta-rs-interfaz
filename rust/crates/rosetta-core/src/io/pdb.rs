//! Registros `ATOM`/`HETATM` de un PDB, por columnas fijas (formato wwPDB 3.3).
//!
//! Lee solo el primer modelo: se detiene en el primer `ENDMDL`.

/// Un átomo tal como viene en el archivo, sin interpretar.
#[derive(Debug, Clone, PartialEq)]
pub struct AtomRecord {
    pub het: bool,
    pub serial: i32,
    /// Columnas 13-16 tal cual, con su relleno (p. ej. `" CA "`).
    pub name: String,
    /// Columna 17; espacio si no hay ubicación alternativa.
    pub alt_loc: char,
    pub res_name: String,
    /// Columna 22; espacio si no hay cadena.
    pub chain: char,
    pub res_seq: i32,
    /// Columna 27; espacio si no hay código de inserción.
    pub i_code: char,
    pub xyz: [f64; 3],
    /// Si la columna falta se asume 1.0. Coordenadas `nan` dejan −1.0, como en Rosetta.
    pub occupancy: f64,
    pub b_factor: f64,
    pub element: String,
}

/// Columnas 1-based e inclusivas, tolerando líneas cortas.
fn col(line: &str, from: usize, to: usize) -> &str {
    let end = to.min(line.len());
    if from > end {
        return "";
    }
    line.get(from - 1..end).unwrap_or("")
}

fn col_char(line: &str, at: usize) -> char {
    col(line, at, at).chars().next().unwrap_or(' ')
}

pub fn parse_pdb(text: &str) -> Vec<AtomRecord> {
    let mut records = Vec::new();
    for line in text.lines() {
        let record = col(line, 1, 6);
        if record == "ENDMDL" {
            break;
        }
        let het = record == "HETATM";
        if record != "ATOM  " && record.trim_end() != "ATOM" && !het {
            continue;
        }

        let mut occupancy_forced_missing = false;
        let mut coord = |from, to| match col(line, from, to).trim() {
            "nan" => {
                occupancy_forced_missing = true;
                0.0
            }
            value => value.parse().unwrap_or(0.0),
        };
        let xyz = [coord(31, 38), coord(39, 46), coord(47, 54)];
        let occupancy = match col(line, 55, 60).trim() {
            _ if occupancy_forced_missing => -1.0,
            "" => 1.0,
            value => value.parse().unwrap_or(1.0),
        };

        records.push(AtomRecord {
            het,
            serial: col(line, 7, 11).trim().parse().unwrap_or(0),
            name: format!("{:<4}", col(line, 13, 16)),
            alt_loc: col_char(line, 17),
            res_name: col(line, 18, 20).trim().to_string(),
            chain: col_char(line, 22),
            res_seq: col(line, 23, 26).trim().parse().unwrap_or(0),
            i_code: col_char(line, 27),
            xyz,
            occupancy,
            b_factor: col(line, 61, 66).trim().parse().unwrap_or(0.0),
            element: col(line, 77, 78).trim().to_string(),
        });
    }
    records
}

pub fn write_pdb(records: &[AtomRecord]) -> String {
    let mut out = String::with_capacity(records.len() * 81);
    for r in records {
        let [x, y, z] = r.xyz;
        out.push_str(&format!(
            "{:<6}{:>5} {:<4}{}{:>3} {}{:>4}{}   {:>8.3}{:>8.3}{:>8.3}{:>6.2}{:>6.2}          {:>2}\n",
            if r.het { "HETATM" } else { "ATOM" },
            r.serial,
            r.name,
            r.alt_loc,
            r.res_name,
            r.chain,
            r.res_seq,
            r.i_code,
            x,
            y,
            z,
            r.occupancy,
            r.b_factor,
            r.element,
        ));
    }
    out.push_str("END\n");
    out
}
