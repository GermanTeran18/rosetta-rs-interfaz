## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Investigador principal correspondiente: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 1/31/18

## Descripción del algoritmo

Este algoritmo realiza una búsqueda de docking global en la bicapa de la membrana. Primero superpone el compañero 1 con el nativo y luego configura el foldtree para que el residuo de membrana esté en la raíz (es decir, la membrana queda fija). Crea una posición inicial aleatoria de los dos compañeros separándolos. El primer compañero queda fijo, pero el segundo se moverá aleatoriamente en la membrana, muestreando una gran variedad de interfaces. Realiza 10 iteraciones de los siguientes movers, cada Mover con un DockingSlideIntoContact al final: SpinMover, SpinAroundPartnerMover, TiltMover, FlipMover, SpinAroundPartnerMover.

- SpinMover: hace girar el segundo compañero alrededor de su eje normal (cercano al eje z) en la membrana, usando un ángulo de giro aleatorio entre 0 y 360 grados.

- SpinAroundPartnerMover: hace girar el compañero 2 alrededor del compañero 1 fijo. Hace una traslación aleatoria dentro de una caja (por defecto 100A) y luego DockingSlideIntoContact

- TiltMover: inclina el compañero 2 hacia (o lejos de) el compañero 1. El ángulo es aleatorio, entre +/-45 grados.

- FlipMover: voltea el compañero 1 en la membrana alrededor del eje que conecta los compañeros. El ángulo es aleatorio, entre +/-45 grados de desviación respecto a un volteo de 180. Este mover se puede desactivar con la opción `-mp:dock:allow_flips 0`

La aplicación es de grano muy grueso, es decir, no hace una minimización local alrededor de las interfaces. En su lugar, muestrea una amplia gama de conformaciones, de las cuales las de menor puntuación (o, mejor, las de menor puntuación de interfaz) se pueden refinar localmente después. Los tiempos de ejecución son muy rápidos: se genera un decoy cada ~2 segundos para una proteína de 80 residuos y cada ~70 segundos para una proteína de 1000 residuos.

## Código y demo
La aplicación se encuentra en apps/pilot/jkleman/mp_find_interface.cc. El mover subyacente se encuentra en protocols/docking/membrane/MPFindInterfaceMover.

## Ejecutar la aplicación
El archivo de entrada es un único archivo PDB y un único spanfile, que se puede generar con la aplicación mp_docking_setup. Opciones de ejemplo para encontrar la interfaz:

```
Rosetta/main/source/bin/mp_find_interface.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \
-in:file:native 1AFO_tr.pdb \            # superimposes the model onto the native, using CA atoms
-mp:setup:spanfiles 1AFO__tr.span \      # required, spanfile
-mp:no_interpolate_Mpair 1 \             # optional, for better scoring
-mp:scoring:hbond 1 \                    # optional, for better scoring
-mp:dock:lowres 1 \                      # use lowres score function for scoring, EITHER this flag or ...
-mp:dock:highres 1 \                     # ... this flag must be given
-mp:dock:allow_flips 0 \                 # optional, allow (1) or disallow (0) flipping partner 2 in the membrane; default: allow flips 
-docking:partners A_B \                  # use chain A as docking partner 1 and chain B as docking partner 2
-score::docking_interface_score 1 \      # optional, add the interface score to the score file
-packing:pack_missing_sidechains false \ # don't pack sidechains until the membrane residue is added, sometimes needed
```

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::dock::lowres <bool>` | Usa la función de puntuación de centroides para encontrar la interfaz.|
|`-mp::dock::allow_flips <bool>` | Permite que el compañero 2 se voltee en la membrana durante la búsqueda global. Por defecto: false.|
|`-mp::dock::flexible_bb <bool>` | Hace un docking con cadena principal flexible; ejecuta relax antes y después del docking.|
|`-mp::dock::flexible_sc <bool>` | Hace un docking con cadenas laterales flexibles; reempaqueta antes y después del docking.|

## Referencia
Este protocolo aún no se ha publicado. El marco y el protocolo anterior se publicaron en:

Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (under revision)
