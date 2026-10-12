# AtomTree
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AtomTree

Configura un árbol de átomos (atom tree) para usarlo con los movers posteriores. Conecta pdb\_num de host\_chain con el residuo más cercano de la cadena vecina. La conexión se hace a través de connect\_to en el residuo pdb\_num de host\_chain.

```xml
<AtomTree name="(&string)" docking_ft="(0 &bool)" pdb_num/resnum="(&string)" connect_to="(see below for defaults &string)" anchor_res="(pdb numbering)" connect_from="(see below)" host_chain="(2 &integer)" simple_ft="(0&bool)" two_parts_chain1="(0&bool)" fold_tree_file="(&string)"/>
```

-   fold_tree_file: si se establece con un nombre de archivo, el mover leerá un foldtree de un archivo y lo impondrá, y nada más. Este es un ejemplo de definición de un fold tree:

    ```
    FOLD_TREE EDGE 1 18 -1 EDGE 18 32 1 EDGE 18 21 -1 EDGE 32 22 -1 EDGE 32 50 -1 EDGE 50 79 -1 EDGE 50 163 2 EDGE 163 98 -1 EDGE 98 82 3 EDGE 98 96 -1 EDGE 82 95 -1 EDGE 82 80 -1 EDGE 163 208 -1
    ```

    Ten en cuenta que los archivos de foldtree no pueden contener comentarios ni nada que no sean las directivas `FOLD_TREE` y `EDGE` que se muestran arriba.

* ab_fold_tree: booleano (valor predeterminado 0). Si es true, configura un fold tree para scFv, en el que los nodos son las cisteínas de los disulfuros. Si hay un ligando (cadena 2), también crea una arista de salto (jump) entre el centro de masa del ligando y la cisteína más cercana al centro de masa del scFv (cadena 1). 
-   docking\_ft: ¿configurar un foldtree de docking? Si se establece, se ignoran todas las demás opciones.
-   simple\_ft: establece un ft simple que va de 1-\>chain1\_end; 1-\>chain2\_begin; chain2\_begin-\>chain2\_end; etc.
-   two\_parts\_chain1: si chain1 está formada por dos partes entrelazadas y quieres permitir movimientos entre ellas, ponlo en true. El mover encontrará los centros de masa de la primera parte de chain1, se conectará con la segunda parte y también conectará el centro de masa de toda la cadena con el centro de masa de chain2.
     Configuración detallada de un foldtree:
     Estas opciones especifican los átomos reales del salto. anchor\_res (este es el residuo) y connect\_from (el átomo en sí) forman un par y se usan para la primera cadena, mientras que pdb\_num (residuo) y connect\_to (átomo) forman un par en la cadena 2 (la que normalmente se mueve).
-   connect\_to: ¡solo puede usarse si se define pdb\_num! Por defecto usa el átomo de carbono más alejado de la cadena principal en cada residuo, p. ej., CB, Cdelta para Gln, etc.
-   connect\_from: el usuario puede especificar desde qué átomo debe comenzar el salto. Por ahora solo funciona la nomenclatura pdb. Si no se especifica, se elige la conexión atómica "óptima" para el residuo ancla (es decir, hacia sus grupos funcionales).
-   pdb\_num/resnum: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información


##Véase también

* [[AtomTree overview]]
* [[FoldTree overview]]
