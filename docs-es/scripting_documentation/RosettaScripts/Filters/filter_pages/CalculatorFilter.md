# CalculatorFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## CalculatorFilter

OBSOLETO: consulta [[CalculatorMetric]], que lo reemplaza.

    <CalculatorFilter name="(&string)" equation="(&string)" threshold="(&real 0)" >
          <Var name="(&string)" filter="(&string)" value="(&Real)"/>
        ... 
    </CalculatorFilter>

Combina uno o más filtros en una ecuación semiarbitraria. La ecuación es una expresión matemática estándar que usa los operadores +-\*/\^ (el acento circunflejo es la exponenciación) con la precedencia de operadores habitual (ante la duda, usa paréntesis).

Se pueden definir variables, que distinguen mayúsculas y minúsculas, con subetiquetas, ya sea con un filtro o como constante. El valor del filtro se determina una sola vez, y se usa el mismo valor en todas las apariciones de la variable en la ecuación. Las variables también se pueden definir dentro de la propia ecuación, con la sintaxis "nombre = expresión ;", con el punto y coma final. La última entrada debe ser la expresión que no es una asignación y a la que se evaluará el filtro.

Por comodidad, también se definen varias funciones:

ABS(), EXP(), LN(), LOG()/LOG10(), LOG2(), LOG(a,b), SQRT(), SIN() COS(), TAN(), R2D(), D2R(), MIN(...), MAX(...), MEAN(...), MEDIAN(...)

Los nombres de las funciones no distinguen mayúsculas y minúsculas. LOG(a,b) es el logaritmo de a en base b, las funciones trigonométricas usan radianes, R2D() y D2R() son funciones para convertir de radianes a grados y viceversa, y MIN/MAX/MEAN/MEDIAN pueden recibir cualquier número de valores separados por comas.

En contextos de valor de verdad, el filtro se evalúa como verdadero si el valor resultante es menor que el umbral dado.

Ejemplo:

    <CalculatorFilter name="test" threshold="0" equation="t1 = exp(-E1/kT); t2 = exp(-E2/kT); t1/( t1 + t2 )" >
          <Var name="E1" filter="bound" />
          <Var name="E2" filter="altbind" />
          <Value name="kT" value="0.6" />
    </CalculatorFilter>

ADVERTENCIA: por ahora, el análisis de la ecuación es algo delicado y opaco. Los mensajes de error de diagnóstico son, en el mejor de los casos, pobres. Te recomiendo empezar con una ecuación simple e ir aumentando la complejidad poco a poco (las ecuaciones incorrectas deberían detectarse al analizar el script).

## Véase también

* [[CalculatorMetric]]
* [[BoltzmannFilter]]
* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[IfThenFilter]]
* [[ReplicateFilter]]
* [[SigmoidFilter]]


