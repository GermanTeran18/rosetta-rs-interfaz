DetailedBalanceScientificBenchmark
==================================

# **ESTA PÁGINA CONTIENE INFORMACIÓN HEREDADA SOBRE LAS PRUEBAS CIENTÍFICAS ANTERIORES A SU REIMPLEMENTACIÓN EN 2018**

Un proceso de Markov preserva el [balance detallado](http://en.wikipedia.org/wiki/Detailed_balance) si el cociente
de las probabilidades de transición entre dos estados cualesquiera es igual al
cociente de las probabilidades de los propios estados. Si se puede demostrar
que lo hace, entonces el proceso de Markov es reversible y, al evolucionar el
sistema, este se equilibrará hasta la distribución estacionaria.

El benchmark científico **detailed\_balance** comprueba si
*BackrubMover*, *SidechainMover* y *SmallMover* satisfacen el balance
detallado.

Balance detallado de BackrubMover
---------------------------------

La primera prueba define un proceso de Markov en el que los estados son las
conformaciones de un péptido de polialanina de 8 residuos y las transiciones
son las definidas por
*[[BackrubMover]]* con
peso 0.99 y por *SmallMover* con peso 0.01. El proceso se
hace evolucionar durante 5,000,000 de pasos.

*BackrubMover* satisface el balance detallado si la
distribución observada sobre todos los grados de libertad es uniforme según
el jacobiano de coordenadas esféricas (es decir, uniforme para los ángulos de acimut y
sinusoidal para los ángulos cenitales). Para comprobarlo, se usa *DOFHistogramRecorder*
para construir un histograma de los ángulos de torsión (*PHI*) y de los
ángulos de enlace (*THETA*) de la cadena principal. El benchmark científico detailed\_balance
registra el error cuadrático medio (*MSE*) respecto de la distribución
uniforme esperada. Dada la cantidad de muestreo usada en la prueba, el
MSE promedio esperado debe ser inferior a 1e-5. Este es un ejemplo de una
ejecución correcta:

        BackrubMover average PHI MSE : 6.10506e-06
        BackrubMover average THETA MSE : 1.98768e-07

Balance detallado de SmallMover
-------------------------------

Este es un ejemplo de una ejecución correcta:

        SmallMover average MSE : 3.01119e-06

Balance detallado de SidechainMover
-----------------------------------

La segunda prueba mide el balance detallado de
*[[SidechainMover]]*, que muestrea conformaciones de cadenas laterales fuera de los rotámeros. Por defecto,
*SidechainMover* muestrea conformaciones de cadenas laterales según la
distribución de Boltzmann asociada a la energía de rotámeros de Dunbrack. Al
probar el balance detallado, *SidechainMover* muestrea las conformaciones de
las cadenas laterales de manera uniforme sobre los grados de libertad de los ángulos de torsión.

Para cada uno de los 20 aminoácidos canónicos se construye un Pose de un solo residuo
y se muestrean conformaciones de la cadena lateral con un peso dentro del
rotámero de 0.45 durante 200000 pasos. El benchmark científico detailed\_balance
registra el error cuadrático medio (MSE) respecto de la
distribución uniforme esperada, promediado sobre todos los tipos de aminoácido. Dada
la cantidad de muestreo usada en la prueba, el MSE promedio esperado debe
ser inferior a 1e-5. Este es un ejemplo de una ejecución correcta:

        SidechainMover average MSE : 9.23451e-06

##Véase también

* [[Scientific Benchmarks]]: Página principal de las pruebas científicas
    - [[Pruebas científicas de docking|DockingScientificBenchmark]]
* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]