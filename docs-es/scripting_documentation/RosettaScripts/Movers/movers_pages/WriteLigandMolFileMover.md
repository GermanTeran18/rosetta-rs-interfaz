# WriteLigandMolFile
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## WriteLigandMolFile

```xml
<WriteLigandMolFile name="(&string)" chain="(&string)" directory="(&string)" prefix="(&string)"/>
```

WriteLigandMolFile escribirá un registro de archivo mol V2000 con todos los átomos de la cadena de ligando especificada y todos los datos almacenados en el Job actual para cada Pose procesado. Las siguientes opciones son obligatorias:

-   chain: El ID de cadena PDB del ligando que se va a escribir
-   directory: El directorio donde se escribirán todos los registros mol. Se creará si no existe.
-   prefix: el prefijo de archivo de los archivos de salida. Si Rosetta se ejecuta sin MPI, la ruta de salida será directory/prefix.sdf. Si Rosetta se ha compilado con soporte MPI, la ruta de salida será directory/prefix\_nn.sdf, donde nn es el ID de rango MPI que procesó el Pose. Cada proceso de Rosetta o trabajo controlado por MPI debe tener un prefijo único o escribir en un directorio distinto para evitar que se sobrescriban archivos.


##Véase también

* [[Preparing ligands]]: Información sobre cómo preparar ligandos para usarlos en Rosetta
* [[Non-protein residues]]: Página principal sobre el uso de moléculas que no son proteínas en Rosetta
* [[I want to do x]]: Guía para elegir un mover
