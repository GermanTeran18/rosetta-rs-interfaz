//! `rosetta-rs`: línea de comandos delgada sobre `rosetta-core`.

use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

use rosetta_core::chemical::ResidueTypeSet;
use rosetta_core::pose::{LoadReport, Pose};

const USAGE: &str = "\
Uso:
  rosetta-rs info <archivo.pdb>                 Resume la estructura y lo que no se pudo cargar
  rosetta-rs normalize <entrada.pdb> <salida.pdb>
                                                Reescribe el PDB con los nombres de átomo de Rosetta

Opciones:
  --database <carpeta>   Carpeta database/ de Rosetta. Si falta, se usa $ROSETTA_DATABASE
                         o se busca hacia arriba desde el directorio actual.";

fn main() -> ExitCode {
    match run(env::args().skip(1).collect()) {
        Ok(()) => ExitCode::SUCCESS,
        Err(message) => {
            eprintln!("{message}");
            ExitCode::FAILURE
        }
    }
}

fn run(mut args: Vec<String>) -> Result<(), String> {
    let database = take_option(&mut args, "--database")?;
    let command = args.first().cloned().ok_or(USAGE)?;
    match (command.as_str(), &args[1..]) {
        ("info", [input]) => {
            let (pose, report) = load(input, database)?;
            print_info(&pose, &report);
            Ok(())
        }
        ("normalize", [input, output]) => {
            let (pose, report) = load(input, database)?;
            fs::write(output, pose.to_pdb_string())
                .map_err(|e| format!("no se pudo escribir {output}: {e}"))?;
            println!("{} residuos escritos en {output}", pose.len());
            if !report.unknown_atoms.is_empty() || !report.skipped_residues.is_empty() {
                println!("Quedaron fuera átomos o residuos; usa `info` para ver cuáles.");
            }
            Ok(())
        }
        _ => Err(USAGE.to_string()),
    }
}

fn take_option(args: &mut Vec<String>, name: &str) -> Result<Option<PathBuf>, String> {
    let Some(i) = args.iter().position(|a| a == name) else {
        return Ok(None);
    };
    if i + 1 >= args.len() {
        return Err(format!("{name} necesita un valor"));
    }
    let value = args.remove(i + 1);
    args.remove(i);
    Ok(Some(PathBuf::from(value)))
}

fn load(input: &str, database: Option<PathBuf>) -> Result<(Pose, LoadReport), String> {
    let database = database
        .or_else(|| env::var_os("ROSETTA_DATABASE").map(PathBuf::from))
        .or_else(find_database)
        .ok_or("No encontré la carpeta database/ de Rosetta. Pásala con --database.")?;
    let types = ResidueTypeSet::load_canonical_amino_acids(&database).map_err(|e| e.to_string())?;
    let text = fs::read_to_string(input).map_err(|e| format!("no se pudo leer {input}: {e}"))?;
    Ok(Pose::from_pdb_str(&text, &types))
}

/// Busca `database/` subiendo desde el directorio actual (el port vive dentro del repo de Rosetta).
fn find_database() -> Option<PathBuf> {
    let cwd = env::current_dir().ok()?;
    cwd.ancestors()
        .map(|dir| dir.join("database"))
        .find(|candidate| is_database(candidate))
}

fn is_database(path: &Path) -> bool {
    path.join("chemical/residue_type_sets/fa_standard/residue_types.txt")
        .is_file()
}

fn print_info(pose: &Pose, report: &LoadReport) {
    let chains: String = pose
        .chains()
        .iter()
        .map(|c| if *c == ' ' { '_' } else { *c })
        .collect();
    let missing: Vec<(usize, usize)> = (0..pose.len())
        .map(|i| {
            let rtype = &pose.residue(i).rtype;
            let (mut heavy, mut hydrogen) = (0, 0);
            for a in pose.missing_atoms(i) {
                if rtype.atoms[a].is_hydrogen() {
                    hydrogen += 1;
                } else {
                    heavy += 1;
                }
            }
            (heavy, hydrogen)
        })
        .collect();
    let missing_heavy: usize = missing.iter().map(|m| m.0).sum();
    let missing_h: usize = missing.iter().map(|m| m.1).sum();

    println!("Residuos:   {}", pose.len());
    println!("Cadenas:    {chains}");
    println!("Secuencia:  {}", pose.sequence());
    println!("Átomos pesados ausentes: {missing_heavy}");
    println!("Hidrógenos ausentes:     {missing_h}");
    if report.zero_occupancy_atoms > 0 {
        println!(
            "Átomos con ocupación 0 (tratados como ausentes): {}",
            report.zero_occupancy_atoms
        );
    }
    if report.alt_locs_dropped > 0 {
        println!(
            "Ubicaciones alternativas descartadas: {}",
            report.alt_locs_dropped
        );
    }
    if !report.skipped_residues.is_empty() {
        println!(
            "Residuos sin tipo cargado: {}",
            report.skipped_residues.len()
        );
        for r in report.skipped_residues.iter().take(10) {
            println!(
                "  {} {}{}{}",
                r.res_name,
                r.chain,
                r.res_seq,
                r.i_code.to_string().trim()
            );
        }
    }
    if !report.unknown_atoms.is_empty() {
        println!(
            "Átomos que el tipo no declara: {}",
            report.unknown_atoms.len()
        );
        for a in report.unknown_atoms.iter().take(10) {
            let r = pose.residue(a.residue);
            println!(
                "  {} en {} {}{}",
                a.atom_name, r.rtype.name3, r.chain, r.pdb_seq
            );
        }
    }
    for (i, &(heavy, _)) in missing.iter().enumerate() {
        if heavy > 0 {
            let r = pose.residue(i);
            println!(
                "  Faltan {heavy} átomos pesados en {} {}{}",
                r.rtype.name3, r.chain, r.pdb_seq
            );
        }
    }
}
