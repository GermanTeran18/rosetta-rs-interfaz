# SSPrediction
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SSPrediction



Usa la secuencia del Pose para generar predicciones de estructura secundaria para cada posición. Luego las predicciones de estructura secundaria se comparan con la estructura secundaria deseada para determinar una puntuación. Si use\_probability es true, la puntuación devuelta es un valor entre 0 y 1, donde 0 es acuerdo completo de estructura secundaria y 1 es ningún acuerdo. Para determinar la puntuación se usa la siguiente ecuación:
sum(i=1;N;e^(-p[i]/T)), donde N es el número de residuos, p[i] es la probabilidad de estructura secundaria correcta en la posición i, y T es un factor de temperatura fijado por defecto en 0.6.
Si use\_probability es false, el filtro devuelve la fracción de residuos que coinciden con la estructura secundaria deseada como un número entre 0 y 1.
Si use\_probability es true Y mismatch\_probability es true, la puntuación es el promedio geométrico de la probabilidad de elegir el tipo de estructura secundaria INCORRECTO en todas las posiciones de residuo.  Minimizar este número maximizará el promedio geométrico de la probabilidad de elegir el tipo de estructura secundaria CORRECTO en todas las posiciones de residuo.  Esta opción debería ser el método más correcto para comparar dos secuencias y determinar la calidad esperada de sus fragmentos según sus probabilidades de estructura secundaria predichas en cada residuo.

```xml
<SSPrediction name="(&string)" threshold="(&real)" use_probability="( false &bool)" mismatch_probability="( false &bool)" cmd="(&string)" blueprint="( '' &string)" use_svm="( true &bool )" />
```

-   threshold - Si se fija threshold y use_probability es true, el filtro devuelve true solo si el valor calculado es menor que este número. Si use_probability es false, el filtro devuelve true si el valor calculado es mayor que este número.
-   use\_probability - Si es true, se usará la información de probabilidad que calcula psipred para determinar la puntuación. Si es false, el filtro devolverá el porcentaje de residuos que coinciden.
-   mismatch\_probability - Si es true Y use\_probability es true, la puntuación se determina como el promedio geométrico de la probabilidad de obtener un tipo de estructura secundaria INCORRECTO en cada posición.  Igual que con use_probability normal, quieres minimizar esta puntuación.
-   cmd - Ruta completa del ejecutable runpsipred\_single o runpsipred. Debe especificarse si use\_svm=false
-   blueprint - Si se especifica, el filtro tomará la estructura secundaria deseada de un archivo blueprint, en lugar de usar DSSP sobre el Pose.
-   use\_svm - Si se fija, se usará un SVM para hacer las predicciones de estructura secundaria en lugar de psipred. Esto requiere descargar algunos archivos de bases de datos. Si es false, se usará el ejecutable de psipred especificado por cmd.

[[include:filter_SSPrediction_type]]
