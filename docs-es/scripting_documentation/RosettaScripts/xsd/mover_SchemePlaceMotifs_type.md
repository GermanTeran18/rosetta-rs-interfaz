<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este mover usará solo los pares de motivos encontrados en los motif_sets de entrada o en los conjuntos de motivos por defecto para diseñar los residuos de la interfaz.

```xml
<SchemePlaceMotifs name="(&string;)" dumpfile="(XRW TO DO &string;)"
        mode="(basic &string;)" allowed_aas="(motifs &string;)"
        halt_on_error="(false &bool;)" motif_sets="(XRW TO DO &string;)"
        scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **dumpfile**: Opción para generar un PDB adicional que vuelca los motivos usados en el empaquetado; sirve para resolver problemas.
-   **mode**: La opción 'standard' simplemente omite la configuración del modo. 'standard' es el uso recomendado: requiere taskops y busca motivos en los residuos diseñables. 'basic' usa la lógica de scheme de Will para decidir dónde se colocan los motivos (y, por tanto, qué residuos son diseñables).
-   **allowed_aas**: Significa que usará los motivos de los archivos de motivos. No lo cambies: por ahora no hay otra opción.
-   **halt_on_error**: XRW POR HACER: ¿no está claro?
-   **motif_sets**: Ruta al archivo de conjuntos de motivos que se usa.
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
