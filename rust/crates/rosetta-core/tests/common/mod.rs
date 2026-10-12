use std::path::PathBuf;

use rosetta_core::chemical::ResidueTypeSet;

/// Raíz del repo de Rosetta, donde vive este port.
pub fn rosetta_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../../..")
}

pub fn database() -> PathBuf {
    rosetta_root().join("database")
}

pub fn types() -> ResidueTypeSet {
    ResidueTypeSet::load_canonical_amino_acids(&database()).expect("cargar fa_standard")
}

pub fn read(relative: &str) -> String {
    let path = rosetta_root().join(relative);
    std::fs::read_to_string(&path).unwrap_or_else(|e| panic!("leer {}: {e}", path.display()))
}
