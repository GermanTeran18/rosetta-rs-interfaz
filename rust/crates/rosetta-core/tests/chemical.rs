mod common;

use rosetta_core::chemical::parse_params;

#[test]
fn lee_serina_completa() {
    let text = common::read(
        "database/chemical/residue_type_sets/fa_standard/residue_types/l-caa/SER.params",
    );
    let ser = parse_params(&text, "SER.params").unwrap();

    assert_eq!(ser.name, "SER");
    assert_eq!((ser.name3.as_str(), ser.name1), ("SER", 'S'));
    assert_eq!(ser.kind, "POLYMER");
    assert_eq!(ser.n_atoms(), 11);
    // El nombre conserva el relleno de columnas, igual que en un PDB.
    assert_eq!(ser.atoms[1].name, " CA ");
    assert_eq!(ser.atoms[9].name, "1HB ");
    assert_eq!(ser.atoms[0].atom_type, "Nbb");
    assert_eq!(ser.atoms[0].charge, -0.6046255);
    assert_eq!(ser.atoms[0].parse_charge, -0.350);

    assert_eq!(ser.atom_index("HB2"), ser.atom_index("1HB"), "ATOM_ALIAS");
    assert_eq!(ser.bonds.len(), 10);
    assert!(
        ser.bonds
            .iter()
            .any(|(a, b, t)| (*a, *b) == (2, 3) && t == "2"),
        "BOND_TYPE C O 2"
    );
    assert_eq!(ser.chis, vec![[0, 1, 4, 5], [1, 4, 5, 7]]);
    assert_eq!(ser.atoms[ser.nbr_atom].trimmed_name(), "CB");
    assert_eq!(ser.nbr_radius, 3.4473);
    assert_eq!(ser.first_sidechain_atom, ser.atom_index("CB"));
    assert_eq!((ser.lower_connect, ser.upper_connect), (Some(0), Some(2)));
    assert!(ser.has_property("POLAR"));

    assert_eq!(ser.icoor.len(), 13);
    let cb = ser.icoor.iter().find(|ic| ic.child == "CB").unwrap();
    assert!((cb.phi - (-122.0f64).to_radians()).abs() < 1e-12);
    assert_eq!(cb.distance, 1.516263);
    assert_eq!(
        cb.stub,
        ["CA".to_string(), "N".to_string(), "C".to_string()]
    );
}

#[test]
fn carga_los_aminoacidos_canonicos_de_fa_standard() {
    let types = common::types();
    // 22 líneas activas en residue_types.txt: los 20 canónicos, HIS_D y CYZ.
    assert_eq!(types.len(), 22);

    let heavy = [
        ("ALA", 5),
        ("ARG", 11),
        ("ASN", 8),
        ("ASP", 8),
        ("CYS", 6),
        ("GLN", 9),
        ("GLU", 9),
        ("GLY", 4),
        ("HIS", 10),
        ("ILE", 8),
        ("LEU", 8),
        ("LYS", 9),
        ("MET", 8),
        ("PHE", 11),
        ("PRO", 7),
        ("SER", 6),
        ("THR", 7),
        ("TRP", 14),
        ("TYR", 12),
        ("VAL", 7),
    ];
    for (name, expected) in heavy {
        let rsd = types.get(name).unwrap_or_else(|| panic!("falta {name}"));
        assert_eq!(rsd.n_heavy_atoms(), expected, "átomos pesados de {name}");
        assert!(
            rsd.atoms.iter().all(|a| a.element.is_some()),
            "elementos de {name}"
        );
    }

    assert_eq!(types.get("ALA").unwrap().n_atoms(), 10);
    let pro = types.get("PRO").unwrap();
    assert!(pro.atoms[pro.atom_index("NV").unwrap()].is_virtual());

    let his: Vec<&str> = types.candidates("HIS").map(|r| r.name.as_str()).collect();
    assert_eq!(his, ["HIS", "HIS_D"]);
}
