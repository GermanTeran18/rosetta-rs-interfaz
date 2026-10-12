<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace minimización sobre las cadenas laterales y/o la cadena principal. 
 NOTA: Este Mover se ofrece por compatibilidad histórica. El MinMover normal puede manejar la simetría de forma transparente y es preferible.

```xml
<SymMinMover name="(&string;)" jump="(&string;)"
        abs_score_convergence_threshold="(&real;)"
        max_iter="(200 &non_negative_integer;)"
        type="(lbfgs_armijo_nonmonotone &minimizer_type;)"
        tolerance="(0.01 &real;)" cartesian="(false &bool;)"
        bondangle="(0 &bool;)" bondlength="(0 &bool;)" chi="(&bool;)"
        bb="(&bool;)" omega="(true &bool;)"
        bb_task_operations="(&task_operation_comma_separated_list;)"
        chi_task_operations="(&task_operation_comma_separated_list;)"
        bondangle_task_operations="(&task_operation_comma_separated_list;)"
        bondlength_task_operations="(&task_operation_comma_separated_list;)"
        movemap_factory="(&string;)" scorefxn="(&string;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</SymMinMover>
```

-   **jump**: Lista de saltos, separados por comas, sobre los que minimizar (asegúrate de que ese salto existe). Si se pone "ALL", todos los saltos se configuran para minimizarse. Si se pone "0", los saltos se configuran para no minimizarse
-   **abs_score_convergence_threshold**: Sigue minimizando hasta que la diferencia antes de la minimización sea menor que este umbral
-   **max_iter**: número máximo de iteraciones permitidas. Este valor por defecto también es muy laxo. Este valor y la tolerancia afectan a si se alcanza la convergencia
-   **type**: Tipo de minimizador. linmin, dfpmin, dfpmin_armijo, dfpmin_armijo_nonmonotone. Los minimizadores dfpmin también se pueden usar con tolerancia absoluta (añade "atol" al tipo de minimizador).
-   **tolerance**: Criterio de convergencia de la minimización. El valor por defecto es muy laxo; se recomienda especificar un valor menor que 0.01. max_iter también afecta a la convergencia
-   **cartesian**: ¿Hacer minimización cartesiana?
-   **bondangle**: ¿Minimizar los ángulos de enlace?
-   **bondlength**: ¿Minimizar las longitudes de enlace?
-   **chi**: ¿Minimizar los ángulos chi?
-   **bb**: ¿Minimizar los ángulos de torsión de la cadena principal?
-   **omega**: ¿Minimizar las torsiones omega?
-   **bb_task_operations**: Operaciones de tarea que especifican los residuos para la minimización de la cadena principal
-   **chi_task_operations**: Operaciones de tarea que especifican los residuos para la minimización de cadenas laterales
-   **bondangle_task_operations**: Operaciones de tarea que especifican los residuos para la minimización de ángulos de enlace
-   **bondlength_task_operations**: Operación de tarea que especifica los residuos para la minimización de longitudes de enlace
-   **movemap_factory**: El nombre del MoveMapFactory ya definido que se usa para alterar el comportamiento por defecto del MoveMap. Por defecto, se permite cambiar todos los DOF de cadena principal, chi y salto. Se puede usar un MoveMapFactory para cambiar cuáles de esos DOF están realmente habilitados. Ten en cuenta que combinar un MoveMapFactory con un MoveMap puede producir un comportamiento inesperado.
-   **scorefxn**: Nombre de la función de puntuación a usar


Subetiqueta **MoveMap**:   especificación del MoveMap

-   **bb**: ¿Mover los ángulos de torsión de la cadena principal?
-   **chi**: ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **jump**: ¿Mover todos los saltos?


Subetiqueta **Jump**:   los saltos son las conexiones de coordenadas internas, no químicas, entre partes separadas de tu Pose

-   **number**: (OBLIGATORIO) Qué número de salto (en el FoldTree)
-   **setting**: (OBLIGATORIO) true para mover, false para no mover

Subetiqueta **Chain**:   controla una cadena cinemáticamente contigua (piensa en las cadenas de proteínas)

-   **number**: (OBLIGATORIO) ¿Qué cadena?
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?

Subetiqueta **Span**:   XRW POR HACER, probablemente una región de la Pose definida por el usuario

-   **begin**: (OBLIGATORIO) inicio del tramo
-   **end**: (OBLIGATORIO) fin del tramo
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?
-   **bondangle**: ¿Mover los ángulos de tres cuerpos?
-   **bondlength**: ¿Mover las longitudes de dos cuerpos?

Subetiqueta **ResidueSelector**:   Región de la Pose definida por un selector de residuos.

-   **selector**: (OBLIGATORIO) Selector de residuos
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?
-   **bondangle**: ¿Mover los ángulos de tres cuerpos?
-   **bondlength**: ¿Mover las longitudes de dos cuerpos?

---
