//! Tipos químicos: equivalente a `core/chemical` de Rosetta.

mod params;
mod residue_type;
mod residue_type_set;

pub use params::parse_params;
pub use residue_type::{AtomSpec, ICoor, ResidueType};
pub use residue_type_set::ResidueTypeSet;
