# SetSecStructEnergies
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetSecStructEnergies

Da una bonificación a las estructuras secundarias especificadas por el usuario. Por ejemplo, una topología de hoja de "1-4.A.99" especificaría una relación antiparalela entre la hebra 1 y la hebra 4; cuando esta está presente, se aplica al Pose una puntuación de bonificación (negativa).


```xml
<SetSecStructEnergies name="(&string)"
    scorefxn="(&string, required)"
    secstruct="(&string, '')"
    use_dssp="(&bool, true)"
    hh_pair="(&string, '')"
    ss_pair="(&string, '')"
    hss_triplets="(&string, '')"
    blueprint="(&string '')"
    ss_from_blueprint="(&string, true)"
    natbias_ss="(&float)"
/> 
```

-   **blueprint**: si se especifica, se usará un archivo blueprint para encontrar ss_pair, hh_pair y hss_triplets. Si use_blueprint_ss también es true, el blueprint se usará para especificar la estructura secundaria del Pose.
-   **use_blueprint_ss**: no tiene efecto si no se especifica un archivo blueprint. Si es true y se especifica un archivo blueprint, la estructura secundaria del blueprint se usará para definir los elementos de estructura secundaria. 
-   **secstruct**: la estructura secundaria dada se usará para determinar las hebras y las hélices dentro del Pose. Si no se especifica, el valor de use_dssp controlará cómo se obtiene la estructura secundaria.
-   **use_dssp**: si es true, se usará DSSP para calcular la estructura secundaria del Pose de entrada. Si es false, se usará la estructura secundaria almacenada en el Pose por un mover como DsspMover.
-   **ss_pairs**: los pares de hebras se indican con números (1-4 es hebra 1 / hebra 4) seguidos de un ".", seguido de A o P (antiparalela/paralela), seguido de un ".", seguido del desplazamiento de registro deseado, donde "99" indica cualquier desplazamiento de registro; p. ej., "1-6.A.99;2-5.A.99;" indica un par antiparalelo entre la hebra 1 y la hebra 6 con cualquier registro, y un par antiparalelo entre la hebra 2 y la hebra 5 con cualquier registro. En el orden de especificación de la estructura secundaria, los pares empiezan por el número de hebra más bajo. Así, un par hebra 1 / hebra 2 sería 1-2.A, no 2-1.A, etc.
-   **hh_pairs**: los pares hélice-hélice se indican como H1-H2.D, donde H1 es el número de hélice en el espacio de la secuencia primaria, H2 es el número de la hélice emparejada en el espacio de la secuencia primaria y D es la dirección del emparejamiento (P para paralelo y A para antiparalelo). Por ejemplo, "1-3.A;2-3.P" indica que las hélices 1 y 3 están emparejadas en configuración antiparalela y las hélices 2 y 3 están emparejadas en configuración paralela.
-   **hss_triplets**: los tripletes hélice-hebra-hebra se definen con una cadena [H,S1-S2;]*, donde H es el número de hélice, S1 es el número de hebra de la primera hebra y S2 es el número de hebra de la segunda hebra. Por ejemplo, "1,2-3;2,1-3" indica que la hélice 1 está emparejada con las hebras 2 y 3, y la hélice 2 está emparejada con las hebras 1 y 3.
-   natbias\_ss = bonificación de puntuación por un par correcto.


##Véase también

* [[BluePrintBDRMover]]: de uso habitual con SetSecStructEnergies
* [[DsspMover]]
* [[RemodelMover]]
* [[SetTemperatureFactorMover]]
* [[SetTorsionMover]]
* [[I want to do x]]: guía para elegir un mover

