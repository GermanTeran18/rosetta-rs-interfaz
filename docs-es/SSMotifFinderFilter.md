# SSMotifFinder
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SSMotifFinder

Filtra loops según la similitud de la geometría de la cadena principal de sus tallos (stems) con los tallos de un loop plantilla. El filtro busca pares de aminoácidos separados por un cierto número de aminoácidos en la secuencia primaria que, además, superpongan los átomos de la cadena principal de los tallos del loop plantilla dentro de un cierto corte de RMSD. El cálculo del RMSD se realiza sobre los átomos pesados de la cadena principal (N, Cα, C, O) de los residuos de los tallos y de los residuos anterior y posterior (6 residuos en total en cada loop). La salida es un archivo que contiene una lista de todos los pares de tallos que superpusieron los tallos de la plantilla dentro de un corte de RMSD especificado, junto con el RMSD calculado.

Consulta la implementación en: Netzer R, Fleishman SJ _et al_. **Ultrahigh specificity in a network of computationally designed protein-interaction pairs.** _Nature Communications_ (2018).  

```xml
<SSMotifFinder name="(&string)" template_pose="(&string)" template_stem1="(0 &string)" template_stem2="(0 &string)" from_res="(0 &non_negative_integer)" to_res="(0 &non_negative_integer)" rmsd="(0.0 &real)" filename="(&string)" pdbname="(&string)"/>
```

-   template_pose: el Pose que contiene el loop de interés ("loop plantilla")
-   template_stem1: el tallo N-terminal del loop plantilla (numeración pdb, por ejemplo 22A) 
-   template_stem2: el tallo N-terminal del loop plantilla (numeración pdb, por ejemplo 36A)
-   from_res: la separación mínima en la secuencia entre los tallos del loop evaluado (que corresponde a la longitud del loop)  
-   to_res: la separación máxima en la secuencia entre los tallos del loop evaluado (que corresponde a la longitud del loop) 
-   rmsd: la desviación cuadrática media entre los tallos del loop evaluado y los del loop plantilla. 
-   filename: el nombre del archivo de salida que contiene la lista de conformaciones de loops coincidentes
-   pdbname: el nombre del pdb en el que se encontraron las conformaciones coincidentes (la estructura de entrada de Rosetta en -s)