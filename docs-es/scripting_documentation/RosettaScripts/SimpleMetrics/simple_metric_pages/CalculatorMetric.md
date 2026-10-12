# CalculatorMetric
*Volver a la página de [[SimpleMetrics]].*
## CalculatorMetric

[[include:simple_metric_CalculatorMetric_type]]

Combina una o más RealMetrics en una ecuación semiarbitraria. La ecuación es una expresión matemática estándar que usa los operadores +-\*/\^ (el acento circunflejo es la exponenciación) con la precedencia de operadores habitual (ante la duda, usa paréntesis).

Se pueden definir variables, que distinguen mayúsculas de minúsculas, mediante subetiquetas, ya sea con una simple metric, como una constante o como un valor almacenado en el Pose. El valor de la variable se determina una sola vez, y se usa el mismo valor en todas las apariciones de la variable en la ecuación. Las variables también se pueden definir dentro de la propia ecuación, con la sintaxis "name = expression ;", con el punto y coma final. La última entrada debe ser la expresión sin asignación que el filtro evaluará.

Por comodidad, también se definen varias funciones:

ABS(), EXP(), LN(), LOG()/LOG10(), LOG2(), LOG(a,b), SQRT(), SIN() COS(), TAN(), R2D(), D2R(), MIN(...), MAX(...), MEAN(...), MEDIAN(...)

Los nombres de las funciones no distinguen mayúsculas de minúsculas. LOG(a,b) es el logaritmo en base b de a, las funciones trigonométricas trabajan en radianes, R2D() y D2R() son funciones para convertir radianes en grados y viceversa, y MIN/MAX/MEAN/MEDIAN pueden tomar cualquier número de valores separados por comas.

Ejemplo:

    <CalculatorMetric name="test" equation="t1 = exp(-E1/kT); t2 = exp(-E2/kT); t1/( t1 + t2 )" >
          <Var name="E1" metric="bound" />
          <Var name="E2" metric="altbind" />
          <Value name="kT" value="0.6" />
    </CalculatorMetric>

ADVERTENCIA: El análisis de la ecuación es un poco delicado y opaco por ahora. Los mensajes de error de diagnóstico son, como mucho, pobres. Recomiendo empezar con una ecuación sencilla e ir añadiendo complejidad (las ecuaciones incorrectas deberían detectarse en el momento del análisis).

## Véase también

* [[CalculatorFilter]]


