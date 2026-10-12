# Aplicación de RosettaMP: docking simétrico proteína-proteína de membrana (MPSymDock)

## Código y demo
La aplicación de docking simétrico de membrana está implementada como un ejecutable de C++ y se encuentra en `apps/public/membrane/mp_symdock.cc` 

Una demo se encuentra en `Rosetta/demos/protocol_captures/mp_symdock`

Revisión de Rosetta n.º 58096

## Antecedentes
Las proteínas de membrana suelen ensamblarse en complejos simétricos en el entorno de la membrana. Aunque aún se debate la razón exacta de la simetría interna, se ha sugerido que la simetría aumenta la estabilidad de las proteínas y evita trampas en el paisaje energético durante los cambios conformacionales necesarios para la función. La aplicación de docking simétrico proteína-proteína de membrana combina la maquinaria de simetría, el marco de membrana y la aplicación de docking simétrico para ensamblar complejos simétricos en la membrana. 

## Algoritmo
La aplicación primero construye una conformación simétrica de proteína de membrana a partir de una unidad asimétrica, colocando un virtual de membrana en el origen del marco de coordenadas y disponiendo las subunidades alrededor del eje normal de la membrana (simetría cíclica). Después se usa la aplicación de docking simétrico para aplicar movimientos simétricos, operaciones de empaquetado e iteraciones de puntuación con la función de energía de todos los átomos de membrana, con el fin de muestrear las conformaciones posibles. El ensamble de modelos de salida describe las posibles conformaciones de este complejo en el entorno de la membrana. 

Por ahora, esta aplicación solo admite el modelado de simetrías cíclicas. 

## Líneas de comando de ejemplo
El docking simétrico proteína-proteína de membrana es una aplicación de C++ de la suite de software Rosetta 3. 

```
./mp_symdock.<exe> -database /path/to/my/rosettadb @flags  
```

## Generación de los archivos de entrada
La aplicación de docking simétrico proteína-proteína de membrana necesita dos archivos de entrada: 

1. Generar un spanfile, como se describe en la página de generación de entradas.
2. Generar un archivo de definición de simetría: 
Los archivos de definición de simetría describen la simetría del sistema y sirven de instrucciones para que Rosetta construya el complejo de partida completo a partir de una unidad asimétrica. Este archivo se puede generar con el script `make_symmdef_file.pl` de `src/apps/public/symmetry/`. Puedes encontrar información detallada sobre la generación de archivos de definición de simetría en la página [[make-symmdef-file]]. En general, este script requiere un archivo PDB, el modo de simetría (solo NCS o PSEUDO para membranas), la especificación de la unidad asimétrica y el n.º de grupo de simetría, si se conoce. 

El archivo de definición de simetría de este ejemplo se generó con la siguiente línea de comando, que se explica con más detalle en el material suplementario de la referencia que aparece más abajo. 

```
./make_symmdef_file.pl -m NCS -p 1afo.pdb -r 10.0 -a A -b B:2 
```

Las simetrías también se pueden generar con un protocolo de novo. Si el usuario conoce el grupo de simetría (p. ej., C3), 
puede generar una definición para ese grupo de simetría con independencia de la estructura. Este script 
se encuentra en `src/apps/public/symmetry/make_symmdef_denovo.py`. Puedes encontrar más información sobre el uso de este script 
[[aquí|make-symmdef-file-denovo]].

## Opciones

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-mp:setup:spanfiles|Spanfile que describe la topología transmembrana de la estructura de partida|Cadena de texto|
|-mp:scoring:hbond|Activa el término de enlaces de hidrógeno dependiente de la profundidad al usar la función de energía de alta resolución de membrana|Booleano|
|--symmetry:symmetry_definition|Archivo de definición de simetría|Ruta|
|-symmetry:initialize_rigid_body_dofs|Inicializa la configuración de cuerpo rígido (simétrica)|Booleano|


## Referencias
1. Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

2. DiMaio F, Leaver-Fay A, Bradley P, Baker D, André I (2011) Modeling Symmetric Macromolecular Structures in Rosetta3. PLoS ONE 6: e20450. 

3. Barth P, Schonbrun J, Baker D (2007) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci 104: 15682–15687. 

## Contacto 
Preguntas y comentarios a: 

 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

