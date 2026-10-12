# Disulfidize
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Disulfidize

Explora una proteína y construye disulfuros que unen residuos de un conjunto de residuos con residuos de otro conjunto. Por defecto, se ignoran los residuos que no son de proteína, GLY y PRO (o DPRO). Los residuos que se van a unir deben estar separados por al menos min_loop residuos en la secuencia primaria. Los posibles disulfuros se identifican primero por la distancia CB-CB y luego mutando el par a CYS, formando un disulfuro y realizando una minimización de energía. Si la energía es menor que el umbral especificado por el usuario, se compara con un conjunto de rotaciones y traslaciones de todos los disulfuros conocidos. Si la "distancia" resultante de esa rotación y traslación es menor que el match_rt_limit especificado por el usuario, el emparejamiento se considera un enlace disulfuro válido.

Una vez encontrados los disulfuros válidos, se añaden de forma combinatoria. Por ejemplo, si se identifican disulfuros entre los residuos 3 y 16 y también entre los residuos 23 y 50, se encontrarán las siguientes configuraciones:
1. [3,16]
2. [23,50]
3. [3,16],[23,50]

Ahora el mover puede colocar disulfuros de D-cisteína, disulfuros de beta-3-cisteína y disulfuros mixtos D/L/beta-3.

NOTAS:
- Este es un mover de múltiples Poses. Si se llama a movers no compatibles con múltiples Poses DESPUÉS de este mover, solo se devolverá la primera configuración de disulfuros.
- <b>Por defecto, este mover ignora las posiciones de glicina y de D/L-prolina.</b> Este comportamiento puede anularse con las opciones ```mutate_gly=true``` o ```mutate_pro=true``` (véase más abajo).


```xml
<Disulfidize name="(&string)" scorefxn="(&string)" set1="(&selector)" set2="(&selector)" match_rt_limit="(&float 2.0)" score_or_matchrt="(&bool false)" max_disulf_score="(&float 1.5)" min_loop="(&int 8)" use_l_cys="(&bool true)" keep_current_disulfides="(&bool false)" include_current_disulfides="(&bool false)" use_d_cys="(&bool false)" use_beta_cys=(&bool false)  mutate_gly="(&bool false)" mutate_pro="(&bool false)" />
```

- scorefxn:  nombre de la función de puntuación que se usa para el reempaquetado y la minimización al reconstruir los disulfuros. Si no se especifica, se usa la función de puntuación predeterminada. Ten en cuenta que, para Poses simétricas, debe proporcionarse una función de puntuación simétrica.
- set1: nombre de un selector de residuos que identifica un conjunto de residuos que pueden conectarse con residuos de set2.  (Valor predeterminado: todos los residuos)
- set2: nombre de un selector de residuos que identifica un conjunto de residuos que pueden conectarse con residuos de set1.  (Valor predeterminado: todos los residuos)
- match_rt_limit: "distancia" en el espacio 6D (rotación/traslación) que se permite respecto de los disulfuros nativos. Los valores más bajos aumentan el rigor del requisito de que los disulfuros sean similares a los nativos. (Valor predeterminado: 2.0).
- score_or_matchrt: si es true, los disulfuros se aceptan si superan el criterio match_rt (transformación de cuerpo rígido) O el criterio de puntuación del disulfuro con todos los átomos. Si es false, los disulfuros deben superar AMBOS criterios. Por defecto es false (deben superarse ambos criterios).
- max_disulf_score: puntuación dslf_fa13 máxima permitida por disulfuro. Reducirla exige que la geometría del disulfuro sea más ideal.  (Valor predeterminado: 1.5)
- min_loop: distancia mínima entre los residuos del disulfuro en el espacio de la secuencia primaria.  (Valor predeterminado: 8).
- min_disulfides: menor número permitido de disulfuros.
- max_disulfides: mayor número permitido de disulfuros.
- keep_current_disulfides:  si es true, se conservan todos los disulfuros actuales. Si es false, los disulfuros existentes que contengan un residuo CYS dentro de set1 o set2 se mutan a alanina. Los disulfuros cuyos dos residuos CYS están fuera de la unión de los conjuntos de residuos seleccionados no se verán afectados. Por defecto es false.
- include_current_disulfides:  si es true, los disulfuros actuales se incluyen en las posibles combinaciones de disulfuros que se probarán. Por defecto es false (solo se prueban combinaciones nuevas de disulfuros).
- use_l_cys: ¿debe el mover considerar colocar L-cisteína? Por defecto es true. (Ten en cuenta que al menos una de las opciones use_l_cys, use_d_cys y use_beta_cys debe ser "true".)
- use_d_cys: ¿debe el mover considerar colocar D-cisteína? Por defecto es false. (Ten en cuenta que al menos una de las opciones use_l_cys, use_d_cys y use_beta_cys debe ser "true".)
- use_beta_cys: ¿debe el mover considerar colocar beta-3-cisteína en posiciones de beta-3-aminoácidos? Por defecto es false. (Ten en cuenta que al menos una de las opciones use_l_cys, use_d_cys y use_beta_cys debe ser "true".) Si también se permite la alfa-cisteína, el mover considerará disulfuros beta-beta, alfa-alfa y alfa-beta.
- mutate_gly: ¿debe el mover ignorar las posiciones de glicina (false) o permitir mutaciones a cisteína en esas posiciones (true)? Por defecto es false (se ignoran las posiciones de gly).
- mutate_pro: ¿debe el mover ignorar las posiciones de D/L-prolina (false) o permitir mutaciones a cisteína en esas posiciones (true)? Por defecto es false (se ignoran las posiciones de pro/dpr).

**EJEMPLO**  El siguiente ejemplo busca de 1 a 3 disulfuros. Todas las configuraciones de disulfuros encontradas se diseñan después con FastDesign.

```xml
<Disulfidize name="disulf" min_disulfides="1" max_disulfides="3" max_disulf_score="0.3" min_loop="6" />
<MultiplePoseMover name="multi_fastdes" >
	<ROSETTASCRIPTS>
		<MOVERS>
			<FastDesign name="fastdes" />
		</MOVERS>
		<PROTOCOLS>
			<Add mover="fastdes" />
		</PROTOCOLS>
	</ROSETTASCRIPTS>
</MultiplePoseMover>
```

##Disulfidize con simetría
Desde el 29 de septiembre de 2015, el mover Disulfidize funciona con Poses simétricas, lo que permite construir disulfuros a través de interfaces simétricas. En este caso, las opciones min_disulfides y max_disulfides representan el número mínimo y máximo de pares de disulfuros *únicos*. Ten en cuenta que, por ahora, es una función experimental que puede tener errores.

##Véase también

* [[DisulfideMover]]
* [[ForceDisulfidesMover]]
* [[RemodelMover]]
* [[I want to do x]]: guía para elegir un mover
