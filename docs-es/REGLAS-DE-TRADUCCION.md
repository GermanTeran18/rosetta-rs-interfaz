# Reglas de traducción

Traducción al español de la documentación de Rosetta
([RosettaCommons/documentation](https://github.com/RosettaCommons/documentation), commit `2d05ebc`).
Cada archivo de `docs-es/` es la traducción del archivo con la misma ruta en el original.

## Voz

- Español neutro, de **tú**: «ejecuta», «revisa», «tu estructura». Nunca voseo («ejecutá», «tenés») ni «usted».
- Claro antes que literal. Si una frase en inglés es enrevesada, reescríbela para que se entienda; el
  significado técnico no cambia.
- Sin notas del traductor ni texto añadido.

## Qué NO se traduce

Todo lo que una máquina lee o lo que el usuario copia y pega queda **idéntico al original**:

- Bloques de código (entre ```` ``` ```` o con sangría de 4 espacios) y código en línea (`` `así` ``).
- Líneas de comando, opciones (`-in:file:s`, `-nstruct`) y sus valores.
- XML de RosettaScripts: etiquetas, atributos y valores.
- Nombres de clases, movers, filtros, métricas, selectores, operaciones y aplicaciones:
  `FastRelax`, `PackRotamersMover`, `ScoreFunction`, `Pose`, `FoldTree`, `MoveMap`, `TaskOperation`,
  `ResidueSelector`, `SimpleMetric`, `rosetta_scripts`, `relax`…
- Nombres de archivos, rutas, URLs y destinos de enlaces.
- En `[[texto|Destino]]` se traduce `texto` y `Destino` queda igual. Un enlace sin texto (`[[Destino]]`)
  queda tal cual.
- En `[texto](url)` se traduce `texto`; la URL queda igual.
- Etiquetas y atributos HTML (`<dt>`, `<b>`, `href`…), bloques `<<RawHtml(...)>>` salvo el texto `alt`,
  y marcadores como `[[_TOC_]]`.
- Los números se escriben como en el original (punto decimal), porque a menudo son valores de código.

## Qué SÍ se traduce

Prosa, títulos, texto de enlaces, texto de tablas, texto alternativo de imágenes y descripciones dentro
de HTML (por ejemplo, el contenido de `<dd>` en la lista de opciones, sin tocar `Default: …`).

## Estructura

La traducción conserva la estructura exacta: los mismos títulos, listas, tablas, bloques de código y
enlaces, en el mismo orden. El verificador (`verificar_traduccion.py`) compara bloques de código,
destinos de enlaces y número de títulos contra el original.

Los títulos traducidos cambian las anclas que genera el wiki (`Pagina#mi-titulo`). Los enlaces conservan
su destino original, así que algunos saltos a una sección pueden no funcionar: es una limitación conocida.

## Glosario

| Inglés | Español |
|---|---|
| score, scoring | puntuación |
| score function | función de puntuación (`ScoreFunction` en código) |
| score term, energy term | término de energía |
| energy | energía |
| sampling | muestreo |
| decoy | decoy |
| pose | Pose |
| backbone | cadena principal |
| side chain | cadena lateral |
| rotamer | rotámero |
| packing / packer | empaquetado / packer |
| design | diseño |
| docking | docking |
| loop | loop |
| protocol | protocolo |
| mover / filter | mover / filtro (en nombres de clase, sin traducir) |
| flag, option | opción |
| input / output | entrada / salida |
| job distributor | distribuidor de trabajos (`JobDistributor`) |
| relax (protocolo) / to relax | relax / relajar |
| minimization | minimización |
| Monte Carlo | Monte Carlo |
| residue / atom / chain | residuo / átomo / cadena |
| ligand | ligando |
| constraint, restraint | restricción |
| binding / binder | unión / proteína de unión |
| interface | interfaz |
| homology modeling | modelado por homología |
| ab initio, de novo | ab initio, de novo |
| wild type | tipo silvestre |
| benchmark | benchmark |
| build (compilar) | compilar, compilación |
| cluster (computación) / clustering (estructuras) | clúster / agrupamiento |
| developer | desarrollador |
| silent file | silent file |
| params file | archivo `.params` |
| resfile | resfile |
| database | base de datos |
