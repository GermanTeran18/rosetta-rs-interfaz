<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
La instrucción IMPORT está pensada para usarse junto con el MultiplePoseMover. Permite a los usuarios que han definido Movers, Filters y TaskOperations en un nivel superior del protocolo evitar tener que redefinirlos para usarlos dentro del MultiplePoseMover. Las clases importadas se vuelven a analizar dentro del contexto interno. Este análisis ocurre antes de que se cargue ninguno de los subelementos del bloque ROSETTASCRIPTS, sea cual sea el orden en que aparezca la instrucción IMPORT. Pueden hacer falta varias instrucciones IMPORT; por ejemplo, si ciertas TaskOperations deben cargarse antes de analizar otros Movers que las requieren.

```xml
<IMPORT taskoperations="(&task_operation_comma_separated_list;)"
        movers="(&string;)" filters="(&string;)" />
```

-   **taskoperations**: Una lista, separada por comas, de TaskOperations definidas en un nivel superior al del MultiplePoseMover dentro del cual está esta instrucción IMPORT
-   **movers**: Una lista, separada por comas, de Movers definidos en un nivel superior al del MultiplePoseMover dentro del cual está esta instrucción IMPORT
-   **filters**: Una lista, separada por comas, de Filters definidos en un nivel superior al del MultiplePoseMover dentro del cual está esta instrucción IMPORT

---
