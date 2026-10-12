# AddJobPairData
*Volver a la página de [[Movers|Movers-RosettaScripts]].*

## AddJobPairData

Añade un dato arbitrario al trabajo (Job) actual, que se escribirá en el silent file, en la base de datos, etc. Es útil para añadir metadatos que permitan llevar el seguimiento de datos generados en varias condiciones experimentales.

El dato que se añade al Job consta de una clave y un valor. La clave es una cadena de texto y el valor puede ser un número real o una cadena de texto. El mover se usa así:

```xml
<AddJobPairData name="(&string)" value_type="(&string)" key="(&string)" value="(&string, 'real' or 'string')" value_from_ligand_chain="(%string)"/>
```

El contenido de "value\_type" debe ser "string" o "real". "value" se interpretará como cadena de texto o como número real según el contenido de "value\_type. Si se indican "value\_from\_ligand\_chain" y una cadena PDB de ligando, el valor (cadena de texto o número real) se extraerá de los datos guardados en caché en el ResidueType con la clave dada. Pueden añadirse datos a un tipo de residuo agregando líneas al archivo params del ligando con el siguiente formato:

```
STRING_PROPERTY key value
NUMERIC_PROPERTY key 1.5
```


##Véase también

* [[JD2]]: información sobre el distribuidor de trabajos
* [[ResourceManager]]: otra herramienta para almacenar información
* [[I want to do x]]: guía para elegir un mover
