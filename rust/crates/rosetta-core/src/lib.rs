//! Núcleo de Rosetta portado a Rust.
//!
//! Esta primera pieza cubre lo mínimo para tener una estructura en memoria:
//!
//! - [`chemical`]: lee los tipos de residuo (`.params`) de la base de datos de Rosetta.
//! - [`io::pdb`]: lee y escribe registros `ATOM`/`HETATM` de archivos PDB.
//! - [`pose`]: la `Pose`, una estructura con sus residuos y coordenadas.
//!
//! Convención de índices: Rosetta numera desde 1; aquí todo índice es base 0.

pub mod chemical;
pub mod error;
pub mod io;
pub mod pose;

pub use error::{Error, Result};
