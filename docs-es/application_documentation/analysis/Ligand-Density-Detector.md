# Detector de densidad de ligandos 
# Descripción general
La herramienta de detección de densidad de ligandos encuentra regiones sin modelar en un mapa de densidad de crio-EM que probablemente pertenezcan a ligandos. Se calcula una máscara del modelo PDB proporcionado y se resta del mapa de EM para revelar las regiones sin modelar. Las regiones se evalúan según la intensidad de la densidad y se puntúan por su tamaño y su cercanía a la macromolécula.

# Comando de ejemplo
El detector de densidad de ligandos se usa con la aplicación `density_tools` en `src/apps/public/electron_density/density_tools.cc`. Un comando de ejemplo sería:
```
Rosetta/bin/density_tools \
-s mypdbfile.pdb \
-ligand_finder \
-mapfile myEMmap.mrc \
-edensity::mapreso map_resolution
```

### Opciones
```
Required options:
-s # Input PDB to be used as a mask. Macromolecule should be built into the map as much as possible

-ligand_finder # Required to search for unassigned density

-mapfile #Input cryoEM map in CCP4/MRC format

-edensity::mapreso # Resolution of the EM data

```

# Salidas
La aplicación entrega una lista de las regiones de densidad detectadas en un archivo PDB llamado `ligand.pdb`. Cada línea del archivo contiene, en las columnas de coordenadas xyz, las coordenadas del centro de masa de un blob. Además, se indican una puntuación de contacto con el receptor y el volumen del blob en las columnas 56-60 y 61-66, respectivamente. La puntuación de contacto con el receptor es la fracción de vóxeles de superficie del blob que están a menos de 4 Å del receptor. El volumen del blob es simplemente el número de vóxeles del blob.

# Filtrado de blobs
La puntuación de contacto con el receptor y el volumen en vóxeles sirven para determinar qué regiones pertenecen con mayor probabilidad a un ligando. Las moléculas pequeñas suelen tener un volumen mayor que 50 vóxeles, y la mayoría está entre 70 y 120 vóxeles. La puntuación de contacto con el receptor varía según el modo de unión de un ligando, pero un valor de 0.70 o más suele ser un buen filtro. El buscador de blobs puede detectar por error regiones de densidad que corresponden a macromolécula sin modelar. Esto ocurre a menudo cerca de los extremos o de cortes en la proteína, en regiones desordenadas. Ten precaución si encuentras un blob en estas zonas.
