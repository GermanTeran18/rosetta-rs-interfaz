#FullModelInfo
`FullModelInfo` es un objeto guardado en caché dentro del Pose y es necesario para llevar el registro de toda la información sobre cómo un Pose 'encaja' en el problema global de modelado stepwise.

El código de `FullModelInfo` está en `src/core/pose/full_model_info/FullModelInfo.cc`.

En `stepwise/modeler/util.hh` hay varias funciones potentes para manejar Poses con objetos `full_model_info`, entre ellas `merge_two_poses_using_full_model_info`, `slice`, `split_pose`, `fix_up_residue_type_variants` y `figure_out_moving_chain_breaks`.

# Cómo usarlo
-------------
`FullModelInfo` debe estar configurado para hacer operaciones como añadir y eliminar. Contiene información sobre todo lo que hay en el problema de modelado completo. Ejemplo (**lo siento, esto no se ha probado**): 

```

// imagine pose has four residues with PDBInfo numbering a22,a23,u27,u28
pose::full_model_info::make_sure_full_model_info_is_setup( pose );  // will infer as much as possible from PDBInfo

std::cout << const_full_model_info( pose ).full_sequence() << std::endl;  // aannnuu  (note fill-in with n's)
std::cout << const_full_model_info( pose ).res_list() << std::endl; // [1, 2, 5, 6] 
std::cout << const_full_model_info( pose ).conventional_numbering() << std::endl; // [22, 23, 27, 28]
std::cout << const_full_model_info( pose ).other_pose_list() << std::endl; // [] (empty)

```

Hay ejemplos más detallados de cómo configurar `full_model_info` en `src/protocols/stepwise/full_model_info/FullModelInfoSetupFromCommandLine`.

# Nota sobre los esquemas de numeración
---------------------------
En el modelado stepwise hay que llevar el registro de tres tipos de esquemas de numeración:

• La numeración de Pose de Rosetta. En el Pose de cuatro residuos anterior sería [1, 2, 3, 4]. Esta numeración también se llama numeración `working` en todo el código de stepwise.

• La numeración del modelo completo. Es una numeración como 1, 2, ... que aumenta con cada residuo del **modelo completo**. En el problema anterior, estos números podrían ir de 1 a 6. Para el Pose de interés, su `res_list` guarda números con este esquema, [1, 2, 5, 6].

• La numeración convencional (y las cadenas). Lo que podrías ver en la información del PDB: [22, 23, 27, 28] en el caso anterior.

# Qué hay en FullModelInfo
---------------------------
FullModelInfo contiene tres cosas:

### res_list
------------
Es un `utility::vector1< Size >` que guarda los números de cada residuo del Pose actual, en la numeración del modelo completo.

### full_model_parameters
----------------------------------------------------------
Es un objeto FullModelParameters y almacena toda la información relacionada con el modelo final de longitud completa. 
Esto incluye:

• full_sequence
• esquema de numeración/cadenas 'convencional',
• non_standard_residue_map (cualquier nombre no estándar que elabore los códigos de secuencia de una letra, por ejemplo 'Z[Mg]')
• cutpoint_open_in_full_model,  
• fixed_domain (los residuos que forman parte de PDB de entrada y no deben moverse),
etc.  
• pares de disulfuro

Consulta FullModelParameterType para ver la lista completa de variables, almacenadas en parameter_as_res_list.

-Ten en cuenta que aquí no hay información sobre qué subconjunto de
 residuos contiene un Pose concreto (eso está en res_list).

-Las variables de aquí deberían ser realmente **'permanentes'**: parámetros que no
  cambian durante una ejecución.

- Ten en cuenta que las listas de enteros se almacenan de dos maneras, por comodidad:
  parameter_values_at_res
   `[ 0, 0, 1, 1, 0, 0, 2, 2 ] (has same size as full_sequence)`

  parameter_values_as_res_lists -- la misma información que arriba, en otro formato.
    `{ 0:[1, 2, 5, 6],  1:[3, 4], 2:[7, 8] }`

- *Avanzado* La única excepción a que FullModelParameters sea constante
  podría ser si hacemos diseño permitiendo que varíen las longitudes de los loops. La solución
  de código más concisa aquí consiste en actualizar FullModelParameters durante la ejecución, 
  a partir de recortar loops de distinta longitud de un `FullModelParameters` 'padre'.
  Este modo sigue siendo experimental; por eso ahora tenemos `parent_full_model_parameters` y
  `slice_res_list` como variables (opcionales).

### other_pose_list
----------------------------------------------------------
Es un vector de PoseOPs.  

Supón que estás construyendo un modelo grande y que has construido un Pose para los residuos 22-28 y otros dos Poses para los residuos 90-100 y para los residuos 120-130. En el marco stepwise conservarías el primer Pose, y contendría referencias a los otros Poses en su `other_pose_list`.  En este ejemplo, los otros Poses tendrían, a su vez, other_pose_lists vacías.  

Hay funciones auxiliares útiles en `stepwise/modeler/util.hh` para `switch_focus_to_other_pose`.

[Originalmente había un esquema en el que cada Pose guardaba referencias a los Poses vecinos inmediatos para crear un 'árbol de Poses', lo que podría haber facilitado el cálculo de algunas energías de cierre de loops, pero se descartó.]

### submotif_info_list
Un submotivo es, por ejemplo, un par de bases C-G o un giro en U de tres nucleótidos, definido en la base de datos de Rosetta y que se puede añadir al Pose durante el modelado stepwise si los movimientos de submotivos (tipo de movimiento `ADD_SUBMOTIF`) están activados. El modelado stepwise exige que todo movimiento tenga un inverso; cualquier movimiento que divida un submotivo no es reversible y debe evitarse. Para llevar el registro de qué partes de un Pose tienen submotivos, guardamos la información aquí, en un `vector1` de objetos `SubMotifInfo` sencillos, cada uno con el nombre del submotivo y los residuos (en la numeración del modelo completo) donde se instanció. [gracias, Caleb Geniesse.]


---
Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
