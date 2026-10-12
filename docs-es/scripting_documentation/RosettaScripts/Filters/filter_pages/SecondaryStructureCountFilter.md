# SecondaryStructureCount
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SecondaryStructureCount

Cuenta el número total de elementos de estructura secundaria, definidos por DSSP, de uno o más tipos dados.

**ADVERTENCIA**: el report_sm de este filtro (que aparece en el archivo de puntuación) es siempre un valor ficticio "0", sin importar el recuento de estructura secundaria. Los recuentos totales de EE de cada tipo de EE se enumeran en la salida del tracer. Véase la opción 'return_total'.

```xml
<SecondaryStructureCount name="(&string)"
    filter_helix_sheet="(1 &bool)" filter_helix="(0 &bool)" filter_sheet="(0 &bool)" filter_loop="(0 &bool)"
    num_helix_sheet="(0 &int)" num_helix="(0 &int)" num_sheet="(0 &int)" num_loop="(0 &int)"
    min_helix_length="(4 &int)" max_helix_length="(9999 &)"
    min_sheet_length="(3 &int)" max_sheet_length="(9999 &)"
    min_loop_length="(1 &int) " max_loop_length="(9999 &)"
    return_total="(false &bool)"
    residue_selector="("" &string)" min_element_resis="(1 &int)" />
```

- **filter_helix**: si es true, filtra por hélices. Esto también determina el número que devuelve la opción 'return_total'.
- **filter_sheet**: ""
- **filter_loop**: ""
- **filter_helix_sheet**: si es true, filtra por la suma de hélice + lámina.

- **num_helix**: número de hélices por el que filtra el filtro.
- **num_sheet**: ""
- **num_loop**: ""
- **num_helix_sheet**: ""

- **min_helix_length**: número mínimo de aminoácidos para que una hélice se considere hélice. Por defecto: 4
- **max_helix_length**: número máximo de aminoácidos para que una hélice se considere hélice. Por defecto: 9999
- **min_sheet_length**: número mínimo de aminoácidos para que una lámina se considere hélice. Por defecto: 3
- **max_sheet_length**: número máximo de aminoácidos para que una lámina se considere hélice. Por defecto: 9999
- **min_loop_length**: número mínimo de aminoácidos para que un loop se considere hélice. Por defecto: 1
- **max_loop_length**: número máximo de aminoácidos para que un loop se considere hélice. Por defecto: 9999

- **return_total**: si es true, devuelve al archivo de puntuación el número total de elementos de EE por los que se filtró. Por defecto el filtro siempre devuelve "0" al archivo de puntuación.
- **residue_selector**: pasa un único residue_selector para contar solo los elementos de EE de un subconjunto de residuos.
- **min_element_resis**: número mínimo de residuos de un elemento de EE para que se cuente (para usar con residue_selector). Por defecto: 1

## Véase también

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[HelixKinkFilter]]
* [[HelixPairingFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureHasResidueFilter]]
