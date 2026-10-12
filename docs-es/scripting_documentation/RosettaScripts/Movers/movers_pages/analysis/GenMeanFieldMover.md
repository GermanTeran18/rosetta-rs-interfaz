# GenMeanFieldMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GenMeanFieldMover

## Descripción

Este [[Mover]] informa una distribución de probabilidad de aminoácidos para un conjunto dado de posiciones, según tus TaskOperations y tus archivos de entrada.  Los valores se escriben en el archivo de registro y se vuelcan como un conjunto de transfacs.

```xml
<GenMeanFieldMover name="&string" threshold="(10.0 &float)" lambda_memory="(0.5 &float)" tolerance="(0.0001 &float)" temperature="(0.8 &float)" task_operations="(&string,&string,&string)" />
```

- threshold: El umbral que se usa para truncar las energías en el esquema de ponderación de Boltzmann.  El truncamiento es necesario para no acabar con valores nan.  Un valor de 5 es el que mejor resultado ha dado hasta ahora en las pruebas.

- lambda_memory: Evita la oscilación de la iteración de campo medio y acelera la convergencia. Un valor de 0.5 es el que mejor resultado ha dado hasta ahora en las pruebas.

- tolerance: Punto en el que se considera alcanzada la convergencia.

- temperature: kT para la ponderación de Boltzmann.  Un valor de 0.8 es el que mejor resultado ha dado hasta ahora en las pruebas.

- task_operations: Lista de task operations separadas por comas.  Se generan distribuciones de probabilidad de aminoácidos para todas las posiciones diseñadas.

##Opciones accesibles desde la línea de comandos

- bb_list: archivo que contiene la lista de pdbs sobre los que ejecutar MF, en el caso de cadena principal flexible.
- dump_transfac: ruta donde se volcarán los archivos de distribución de probabilidad transfac.


##Véase también

* [[I want to do x]]: Guía para elegir un mover
