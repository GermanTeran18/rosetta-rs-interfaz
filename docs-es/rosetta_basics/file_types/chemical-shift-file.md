#Archivo de desplazamientos químicos

Nombre
====

```
*.chsft, *.chsft_in 
```

Formato
======

Los datos de desplazamientos químicos se almacenan en registros, uno por línea. Los registros están orientados por columnas. Los campos de cada registro son los siguientes:

Campos de los registros de desplazamientos químicos

```
Description      Data type                  Columns     
Amino acid code  1- or 3- letter string     1-3
Residue number   decimal                    5-8
C shift          float                      10-15
CA shift         float                      17-22
CB shift         float                      24-29
HA shift         float                      31-36
N shift          float                      38-43
```

**Notas:**

-   Los códigos de aminoácidos son los especificados por la IUPAC.
-   Los ID de residuo son las posiciones indicadas en el archivo PDB.
-   Los tipos de átomo son los indicados en el archivo PDB.
-   Un valor de desplazamiento químico desconocido se representa con el valor 9999.00.
-   Para quienes conocen printf, cada línea se codifica de la siguiente manera: 

    ```
    "       0   0.00   0.00   0.00   0.00   0.00\n"
    ```

Ejemplo
=======

Entrada de desplazamientos químicos :

```
  M    1  170.54   54.45   33.27    4.23 9999.00
  Q    2  175.92   55.08   30.76    5.25  123.22
  I    3  172.45   59.57   42.21    4.21  115.34
  F    4  175.32   55.21   41.48    5.63  118.11
  V    5  174.87   60.62   34.23    4.72  121.00
```

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Página de la wiki de CS-Rosetta|CS-Rosetta]]
* [[Información adicional sobre CS-Rosetta (enlace externo)|http://spin.niddk.nih.gov/bax/software/CSROSETTA/]]
* [[CS Rosetta RNA]]: Aplicación de modelado de ARN que usa datos de desplazamientos químicos
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
