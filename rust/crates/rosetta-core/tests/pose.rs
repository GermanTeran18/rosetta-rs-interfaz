mod common;

use rosetta_core::io::pdb::parse_pdb;
use rosetta_core::pose::Pose;

const UBIQUITINA: &str =
    "MQIFVKTLTGKTITLEVEPSDTIENVKAKIQDKEGIPPDQQRLIFAGKQLEDGRTLSDYNIQKESTLHLVLRLRGG";

#[test]
fn ubiquitina_cristalografica() {
    let types = common::types();
    let text = common::read("tests/integration/tests/zinc_heterodimer/1UBQ.pdb");
    assert_eq!(parse_pdb(&text).len(), 602);

    let (pose, report) = Pose::from_pdb_str(&text, &types);
    assert_eq!(pose.len(), 76);
    assert_eq!(pose.chains(), ['A']);
    assert_eq!(pose.sequence(), UBIQUITINA);

    // Todos los átomos pesados están; el cristal no trae hidrógenos.
    let heavy_missing: usize = (0..pose.len())
        .map(|i| {
            pose.missing_atoms(i)
                .filter(|&a| !pose.residue(i).rtype.atoms[a].is_hydrogen())
                .count()
        })
        .sum();
    assert_eq!(heavy_missing, 0);

    // Solo queda fuera el OXT terminal, que en Rosetta añade el parche CtermProteinFull.
    assert_eq!(report.unknown_atoms.len(), 1);
    assert_eq!(report.unknown_atoms[0].atom_name, "OXT");
    assert_eq!(report.unknown_atoms[0].residue, 75);
    assert!(report.skipped_residues.is_empty());

    let ca = pose.residue(0).rtype.atom_index("CA").unwrap();
    assert_eq!(pose.xyz(0, ca), Some([26.266, 25.413, 2.842]));
}

#[test]
fn las_aguas_se_reportan_y_no_se_pierden_en_silencio() {
    let types = common::types();
    let text = common::read("tests/integration/tests/FavorSequenceProfileMover/1ubq.pdb");
    let (pose, report) = Pose::from_pdb_str(&text, &types);
    assert_eq!(pose.sequence(), UBIQUITINA);
    assert_eq!(report.skipped_residues.len(), 58);
    assert!(report.skipped_residues.iter().all(|r| r.res_name == "HOH"));
}

/// Una salida de Rosetta con hidrógenos: si los nombres coinciden con los de los `.params`,
/// cada residuo interior tiene que llegar completo.
#[test]
fn salida_de_rosetta_con_hidrogenos() {
    let types = common::types();
    let text = common::read("tests/integration/expected_results/constraints_metric/1l2y_0001.pdb");
    let (pose, report) = Pose::from_pdb_str(&text, &types);
    assert_eq!(pose.sequence(), "NLYIQWLKDGGPSSGRPPPS");

    for i in 1..pose.len() {
        let missing: Vec<&str> = pose
            .missing_atoms(i)
            .map(|a| pose.residue(i).rtype.atoms[a].trimmed_name())
            .collect();
        assert!(missing.is_empty(), "residuo {i} incompleto: {missing:?}");
    }
    // En el N-terminal el parche cambia H por 1H/2H/3H; en el C-terminal añade OXT.
    let first: Vec<&str> = pose
        .missing_atoms(0)
        .map(|a| pose.residue(0).rtype.atoms[a].trimmed_name())
        .collect();
    assert_eq!(first, ["H"]);
    let unknown: Vec<(usize, &str)> = report
        .unknown_atoms
        .iter()
        .map(|a| (a.residue, a.atom_name.as_str()))
        .collect();
    assert_eq!(unknown, [(0, "1H"), (0, "2H"), (0, "3H"), (19, "OXT")]);
}

#[test]
fn escribir_y_releer_conserva_la_estructura() {
    let types = common::types();
    let text = common::read("tests/integration/expected_results/constraints_metric/1l2y_0001.pdb");
    let (pose, _) = Pose::from_pdb_str(&text, &types);
    let (again, report) = Pose::from_pdb_str(&pose.to_pdb_string(), &types);

    assert_eq!(again.sequence(), pose.sequence());
    assert!(report.unknown_atoms.is_empty());
    for i in 0..pose.len() {
        for a in 0..pose.residue(i).rtype.n_atoms() {
            assert_eq!(pose.xyz(i, a), again.xyz(i, a), "residuo {i}, átomo {a}");
        }
    }
}

#[test]
fn ubicaciones_alternativas_y_ocupacion_cero() {
    let types = common::types();
    let pdb = "\
ATOM      1  N   ALA A   1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  CA AALA A   1       1.000   0.000   0.000  0.40  0.00           C
ATOM      3  CA BALA A   1       2.000   0.000   0.000  0.60  0.00           C
ATOM      4  C   ALA A   1       3.000   0.000   0.000  0.00  0.00           C
ATOM      5  O   ALA A   1       4.000   0.000   0.000  1.00  0.00           O
ATOM      6  CB AALA A   1       5.000   0.000   0.000  0.50  0.00           C
ATOM      7  CB BALA A   1       6.000   0.000   0.000  0.50  0.00           C
";
    let (pose, report) = Pose::from_pdb_str(pdb, &types);
    let ala = &pose.residue(0).rtype;
    let at = |name: &str| pose.xyz(0, ala.atom_index(name).unwrap());

    assert_eq!(
        at("CA"),
        Some([2.0, 0.0, 0.0]),
        "gana la de mayor ocupación"
    );
    assert_eq!(at("CB"), Some([5.0, 0.0, 0.0]), "ante empate, la primera");
    assert_eq!(at("C"), None, "ocupación 0 cuenta como ausente");
    assert_eq!(report.alt_locs_dropped, 2);
    assert_eq!(report.zero_occupancy_atoms, 1);
}
