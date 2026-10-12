# rosetta-rs

Port de Rosetta a Rust, con la meta de una aplicación de escritorio unificada: visor 3D,
tabla de variantes y herramientas en paneles, en vez de ejecutables y archivos sueltos.

Vive dentro del fork de Rosetta para tener el código C++ y la carpeta `database/` al lado:
el port lee esa base de datos tal cual y los tests se validan contra archivos del repo.

## Licencia

Es una obra derivada de Rosetta, así que hereda su licencia **no comercial**
(`../LICENSE.md`). Usarlo en una empresa requiere una licencia de UW CoMotion.

## Estado

| Pieza | Estado |
|---|---|
| Tipos de residuo: lector de `.params` (`ATOM`, alias, enlaces, chi, `ICOOR_INTERNAL`…) | ✅ aminoácidos canónicos de `fa_standard` |
| PDB: lectura y escritura de `ATOM`/`HETATM` | ✅ primer modelo, ubicaciones alternativas, ocupación 0 |
| `Pose`: residuos y coordenadas en un arreglo contiguo | ✅ |
| Parches (terminales, variantes) | pendiente: hoy `OXT` y `1H/2H/3H` se reportan como átomos desconocidos |
| Construir átomos ausentes desde las coordenadas internas | pendiente |
| Función de energía, minimizador, packer | pendiente |
| Interfaz de escritorio | pendiente |

Diferencias deliberadas con Rosetta hasta ahora:

- Los residuos sin tipo cargado (agua, ligandos) se omiten y se reportan; Rosetta, por defecto, se detiene.
- Solo se lee el primer modelo de un PDB.
- Los índices son base 0.

## Uso

```sh
cargo test
cargo run --bin rosetta-rs -- info ../tests/integration/tests/zinc_heterodimer/1UBQ.pdb
cargo run --bin rosetta-rs -- normalize entrada.pdb salida.pdb
```

La CLI busca `database/` subiendo desde el directorio actual; también acepta
`--database <carpeta>` o la variable `ROSETTA_DATABASE`.
