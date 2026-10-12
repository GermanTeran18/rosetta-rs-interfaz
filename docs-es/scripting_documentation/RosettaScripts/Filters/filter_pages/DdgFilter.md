# Ddg
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Ddg

[[include:filter_Ddg_type]]



Este filtro admite el método de energía de Poisson-Boltzmann: fija el entorno de ejecución para indicar el estado que se está alterando, unido o no unido. Cuando se usa correctamente junto con SetupPoissonBoltzmannPotential (mover), el método de energía (véase: core/scoring/methods/PoissonBoltzmannEnergy) resuelve la EDP solo cuando la conformación en el estado correspondiente ha cambiado lo suficiente. Como Ddg usa los centroides de todos los átomos para determinar el vector de separación cuando se usa jump, se recomienda encarecidamente usar en su lugar la opción chain\_num para especificar las cadenas móviles, con el fin de no invalidar la caché del estado no unido cuando hay pequeños cambios en las posiciones de los átomos.

Ejemplo:

El siguiente script muestra cómo habilitar PB con el filtro ddg. Tengo APBS (Adaptive Poisson-Boltzmann Solver) instalado en /home/honda/apbs-1.4/ y el ejecutable "apbs" está en el subdirectorio bin/. En este caso la cadena 1 está cargada. Puedes enumerar más de una cadena separándolas con comas (sin espacios adicionales, p. ej., "1,2,3"). Uso la scorefxn completa como base y añado el término PB.

```xml
    <SCOREFXNS>
        <ScoreFunction name="sc12_w_pb" weights="score12_full" patch="pb_elec"/>  patch PB term
    </SCOREFXNS>
    <MOVERS>
        <SetupPoissonBoltzmannPotential name="setup_pb" scorefxn="sc12_w_pb" charged_chains="1" apbs_path="/home/honda/apbs-1.4/bin/apbs"/>
        ...
    </MOVERS>
    <FILTERS>
        <Ddg name="ddg" scorefxn="sc12_w_pb" chain_num="2"/>
        ...
    </FILTERS>
    <PROTOCOLS>
        <Add mover_name="setup_pb"/>  Initialize PB
        <Add mover_name="..."/>  some mover
        <Add filter_name="ddg"/> use PB-enabled ddg 
        <Add filter_name="..."/>  more filtering
    </PROTOCOLS>
```

## Problemas conocidos
**ERROR**: deja siempre `repack="1"` y controla el reempaquetado con `repack_bound` y `repack_unbound`. Si no, ddG puede devolver 0 y no se escriben los pdb de depuración. Si `repack=="0"`, se usa una ruta de código distinta que no usa el mover de ddG, puede que no gestione bien la simetría (y tampoco genera debug_pdbs).

Si hay un disulfuro a través de la interfaz en cuestión, el filtro falla en silencio y la columna ddG no se añade al archivo de puntuación. Una solución provisional (que ignora la contribución energética del disulfuro) es darle al filtro ddG una función de puntuación con dslf_fa13 reponderado a cero.

## Véase también

* [[Aplicaciones de docking|docking-applications]]
* [[AlaScanFilter]]
* [[ddGMover]]
* [[DdGScanFilter]]
* [[FilterScanFilter]]


