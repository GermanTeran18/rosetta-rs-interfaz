<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Dado un archivo de definición de simetría que describe la configuración y la puntuación de un sistema simétrico, este mover «simetriza» una Pose asimétrica.

Referencias e información de autoría del mover SetupForSymmetry:

Cita(s) de SetupForSymmetry (Mover):
DiMaio F, Leaver-Fay A, Bradley P, Baker D, and André I.  (2011).  Modeling symmetric macromolecular structures in Rosetta3.  PLoS One 6(6):e20450.  doi: 10.1371/journal.pone.0020450.

```xml
<SetupForSymmetry name="(&string;)" definition="(&string;)"
        preserve_datacache="(0 &bool;)" keep_pdb_info_labels="(0 &bool;)"
        symmetry_resource="(&string;)"
        set_global_symmetry_at_parsetime="(true &bool;)" />
```

-   **definition**: La ruta y el nombre del archivo de definición de simetría. Es opcional porque también puedes especificar -symmetry:symmetry_definition {ruta/nombre_del_archivo_de_definición_de_simetría} en la línea de comandos.
-   **preserve_datacache**: Si es true, la caché de datos de la Pose asimétrica de entrada se copia en la nueva Pose simétrica. Si es false, se borra la caché de datos de la Pose. Por defecto es false por razones históricas.
-   **keep_pdb_info_labels**: Si es true, conserva las etiquetas de PDB Info de la Pose de entrada.
-   **symmetry_resource**: El nombre del objeto de definición de simetría creado por el ResourceManager; este recurso debe declararse en el bloque RESOURCES al principio del archivo XML del protocolo
-   **set_global_symmetry_at_parsetime**: Si este mover debe establecer globalmente la opción -symmetry_definition al analizar el XML. El valor por defecto (true) mantiene la compatibilidad con todos los protocolos, pero puede dar problemas si la simetría se establece o se cambia a mitad de un protocolo.

---
