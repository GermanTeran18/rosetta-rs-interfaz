# RepackWithoutLigand
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## RepackWithoutLigand

Calcula la delta\_energy o el RMSD de los residuos de proteína en una interfaz proteína-ligando cuando se quita el ligando y se reempaqueta la interfaz. 

Se accede a la delta\_energy con la opción energy\_threshold.

Se accede al RMSD con las opciones rms\_threshold y target\_res.

```xml
<RepackWithoutLigand name="(&string)"  scorefxn="(&string, score12)" target_res="(&string)" target_cstids="(&string)" energy_threshold="(0.0 &float)" rms_threshold="(0.5 &float)"/>
```

-   target\_cstids: lista separada por comas que corresponde a cstids (véase EnzScore para el formato de cstid)
-   target\_res: lista separada por comas que corresponde a res\_nums/pdb\_nums (siguiendo la convención habitual: [[RosettaScripts#rosettascripts-conventions_specifying-residues]] ) O "all\_repacked", que incluirá todos los vecinos reempaquetados del ligando (la capa de reempaquetado).
-   rms\_threshold: RMS máximo permitido de la región reempaquetada; (es decir, el filtro pasa si RMSD\<rms\_threshold; si no, falla)
-   energy\_threshold: delta\_Energy permitida (es decir, si E(con\_ligando)-E(sin\_ligando) \< umbral, el filtro pasa; si no, falla)

Problemas conocidos:
Usa la opción de línea de comandos `-detect_design_interface` para acelerar el filtro. Este filtro es muy lento sin esa opción.

## Véase también:

* [[Docking de ligandos|ligand-dock]]
* [[DeltaFilter]]
* [[DSasaFilter]]
* [[DiffAtomBurialFilter]]
* [[LigInterfaceEnergyFilter]]
