/// Un átomo declarado en un `.params` (línea `ATOM`).
#[derive(Debug, Clone, PartialEq)]
pub struct AtomSpec {
    /// Nombre con el relleno de 4 columnas del `.params`, p. ej. `" CA "` o `"1HB "`.
    /// Es el mismo relleno que usan las columnas 13-16 de un PDB.
    pub name: String,
    /// Tipo de átomo de Rosetta (`Nbb`, `CAbb`, `Hapo`…), clave de los parámetros de energía.
    pub atom_type: String,
    /// Tipo de mecánica molecular (CHARMM).
    pub mm_type: String,
    /// Carga parcial que Rosetta usa por defecto.
    pub charge: f64,
    /// Segunda carga de la línea; Rosetta solo la usa con `-corrections:chemical:parse_charge`.
    pub parse_charge: f64,
    /// Elemento, resuelto desde `atom_properties.txt` al cargar el conjunto de tipos.
    pub element: Option<String>,
    pub properties: Vec<String>,
}

impl AtomSpec {
    pub fn trimmed_name(&self) -> &str {
        self.name.trim()
    }

    pub fn is_hydrogen(&self) -> bool {
        match &self.element {
            Some(element) => element == "H",
            // Sin tabla de elementos, los tipos de hidrógeno de fa_standard empiezan por H.
            None => self.atom_type.starts_with('H'),
        }
    }

    /// Átomo virtual (tipo `VIRT`, elemento `X`): Rosetta lo construye desde las coordenadas
    /// internas y nunca lo lee de un PDB, como el `NV` que cierra el anillo de la prolina.
    pub fn is_virtual(&self) -> bool {
        self.atom_type == "VIRT" || self.element.as_deref() == Some("X")
    }
}

/// Coordenada interna ideal de un átomo (línea `ICOOR_INTERNAL`).
///
/// Los extremos pueden ser átomos del residuo o conexiones como `UPPER`, `LOWER` o `CONN1`,
/// por eso se guardan como nombres y no como índices.
#[derive(Debug, Clone, PartialEq)]
pub struct ICoor {
    pub child: String,
    /// Torsión, en radianes (el archivo la trae en grados).
    pub phi: f64,
    /// Ángulo, en radianes (el archivo lo trae en grados).
    pub theta: f64,
    /// Distancia al padre, en Å.
    pub distance: f64,
    /// Padre, átomo del ángulo y átomo de la torsión.
    pub stub: [String; 3],
}

/// Topología de un tipo de residuo, leída de un `.params`.
#[derive(Debug, Clone, PartialEq)]
pub struct ResidueType {
    /// Nombre único del tipo (`NAME`), p. ej. `HIS_D`.
    pub name: String,
    /// Código de tres letras en PDB (`IO_STRING`), p. ej. `HIS`.
    pub name3: String,
    /// Código de una letra (`IO_STRING`).
    pub name1: char,
    /// `TYPE`: `POLYMER` o `LIGAND`.
    pub kind: String,
    /// `AA`, p. ej. `SER`.
    pub aa: String,
    pub atoms: Vec<AtomSpec>,
    /// Alias de nombres de átomo (`ATOM_ALIAS`): (índice del átomo, alias sin espacios).
    pub aliases: Vec<(usize, String)>,
    /// Enlaces: (átomo, átomo, tipo). El tipo es `1` salvo que `BOND_TYPE` diga otro.
    pub bonds: Vec<(usize, usize, String)>,
    /// Ángulos chi, en orden (`CHI n a b c d`).
    pub chis: Vec<[usize; 4]>,
    pub properties: Vec<String>,
    pub variants: Vec<String>,
    pub nbr_atom: usize,
    pub nbr_radius: f64,
    pub first_sidechain_atom: Option<usize>,
    pub lower_connect: Option<usize>,
    pub upper_connect: Option<usize>,
    pub icoor: Vec<ICoor>,
}

impl ResidueType {
    /// Busca un átomo por nombre, sin importar el relleno, aceptando también sus alias.
    pub fn atom_index(&self, name: &str) -> Option<usize> {
        let name = name.trim();
        self.atoms
            .iter()
            .position(|atom| atom.trimmed_name() == name)
            .or_else(|| {
                self.aliases
                    .iter()
                    .find(|(_, alias)| alias == name)
                    .map(|(index, _)| *index)
            })
    }

    pub fn n_atoms(&self) -> usize {
        self.atoms.len()
    }

    /// Átomos pesados reales, sin hidrógenos ni virtuales.
    pub fn n_heavy_atoms(&self) -> usize {
        self.atoms
            .iter()
            .filter(|atom| !atom.is_hydrogen() && !atom.is_virtual())
            .count()
    }

    pub fn has_property(&self, property: &str) -> bool {
        self.properties.iter().any(|p| p == property)
    }

    pub fn is_variant(&self) -> bool {
        !self.variants.is_empty()
    }
}
