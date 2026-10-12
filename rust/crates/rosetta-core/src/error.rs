use std::fmt;
use std::path::PathBuf;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    /// No se pudo leer un archivo.
    Io {
        path: PathBuf,
        source: std::io::Error,
    },
    /// Un archivo se leyó pero su contenido no es válido.
    Parse {
        source: String,
        line: usize,
        message: String,
    },
}

impl Error {
    pub(crate) fn io(path: impl Into<PathBuf>, source: std::io::Error) -> Self {
        Error::Io {
            path: path.into(),
            source,
        }
    }

    pub(crate) fn parse(
        source: impl Into<String>,
        line: usize,
        message: impl Into<String>,
    ) -> Self {
        Error::Parse {
            source: source.into(),
            line,
            message: message.into(),
        }
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::Io { path, source } => write!(f, "no se pudo leer {}: {source}", path.display()),
            Error::Parse {
                source,
                line,
                message,
            } => write!(f, "{source}:{line}: {message}"),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::Io { source, .. } => Some(source),
            Error::Parse { .. } => None,
        }
    }
}
