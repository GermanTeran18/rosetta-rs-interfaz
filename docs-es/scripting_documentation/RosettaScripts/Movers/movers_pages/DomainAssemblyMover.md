# DomainAssembly
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DomainAssembly (no probado a fondo)

Realiza muestreo de ensamblaje de dominios mediante inserción de fragmentos en una región conectora (linker). frag3 y frag9 especifican los nombres de los archivos de fragmentos de 9 residuos y de 3 residuos.

```xml
<DomainAssembly name="(&string)" linker_start_(pdb_num/res_num, see below) linker_end_(pdb_num/res_num, see below) frag3="(&string)" frag9="(&string)"/>
```

-   pdb\_num/res\_num: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.
