# Filtro Geometry
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Filtro Geometry

```xml
<Geometry name="(&string)"
  omega="(165&Real)"
  cart_bonded="(20 &Real)"
  cstfile="('none' &string)"
  cst_cutoff="(10000.0 &Real)"
  start="(1 &residue number)"
  end="(100000 &residue number)"
  residue_selector="( '' &string )"
  count_bad_residues="( false &bool )" />
```

-   omega: umbral del ángulo omega del plano peptídico; también se considera la cis-prolina. Funciona con varias cadenas
-   cart\_bonded: puntuación de penalización de ángulos y longitudes de enlace
-   cstfile: si se especifica, el archivo de restricciones dado se usará para introducir restricciones en el Pose. Solo se usarán restricciones de pares de átomos. Se comprobará si las puntuaciones de restricción son menores que cst_cutoff.  Si la puntuación de restricción es > cst_cutoff, el Pose falla.
-   cst_cutoff: umbral para usar con la opción cstfile
-   start: número del residuo inicial desde el que se recorre
-   end: número del residuo final
-   residue_selector: si se especifica, solo se recorrerán los residuos seleccionados por el selector de residuos indicado por el usuario. Por defecto, se seleccionan todos los residuos.  Si también se fijan start y/o end, solo se recorrerán los residuos seleccionados por residue_selector Y dentro del rango [start, end].
-   count_bad_residues: si es true, el número de residuos que no pasan el filtro se calculará y se devolverá como puntuación del filtro mediante report_sm(). Si es false, la puntuación del filtro será 1.0 (es decir, todos los residuos pasan) o 0.0 (es decir, un residuo no pasó el filtro).  Por defecto: false

## Véase también:

* [[AngleToVectorFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureHasResidueFilter]]
* [[TorsionFilter]]
