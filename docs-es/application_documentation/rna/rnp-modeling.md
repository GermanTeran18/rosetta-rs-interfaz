# Modelado de estructuras de complejos RNA-proteína

##Metadatos

Autora: Kalli Kappel (kappel at stanford dot edu)  
Última actualización: abril de 2018

##Propósito de la aplicación
Modelar estructuras 3D de complejos RNA-proteína mediante un método de plegamiento y docking.

##Código y demo
El código está disponible en `rna_denovo`. Hay una demo en `demos/public/rnp_structure_prediction`.


##Entradas requeridas
1. Estructuras completas de todas las proteínas que forman parte del complejo RNA-proteína que quieres modelar. (Si no hay una estructura experimental disponible, puedes usar otros protocolos de Rosetta para construir un modelo.)
2. Un archivo fasta con la secuencia completa del complejo RNA-proteína que estás modelando.
3. Un archivo de estructura secundaria para tu complejo RNA-proteína. La estructura secundaria de la proteína debe especificarse con puntos. La estructura secundaria debe tener la misma longitud que la secuencia del archivo fasta.

##Entradas opcionales
1. Archivos PDB adicionales que especifiquen partes de la estructura del RNA, por ejemplo hélices de RNA de forma A ideales. **Nota**: si quieres imponer una orientación de cuerpo rígido específica entre tu proteína y una estructura de RNA, ¡ambas deben estar especificadas en el mismo archivo PDB!
2. Un archivo de restricciones, que se puede usar para incorporar datos experimentales (como contactos específicos, restricciones de distancia, etc.) al modelado.
3. Un mapa de densidad: consulta el flujo de trabajo [[DRRAFTER]] para más información sobre cómo construir modelos dentro de mapas de densidad.

##Ejecución del código
Los modelos se construyen con el método de plegamiento y docking de Rosetta para complejos RNA-proteína, que combina el plegamiento de RNA de FARNA con el docking RNA-proteína. A continuación hay una línea de comando de ejemplo:

```
rna_denovo –f fasta.txt –secstruct_file secstruct.txt –s protein_structure.pdb –minimize_rna false –nstruct 100 
```

##Opciones para modelar complejos RNA-proteína
**`-ramp_rnp_vdw`**: Activa gradualmente la puntuación rnp_vdw durante la ejecución.  
**`-convert_protein_CEN`**: Convierte los residuos de la proteína a modo centroide durante el ensamblaje de fragmentos de baja resolución.  
**`-rna_protein_docking`**: Realiza docking RNA-proteína. Se activa por defecto si en el archivo fasta se especifican residuos de RNA y de proteína y la orientación de cuerpo rígido no está predeterminada por una de las estructuras de entrada.  
**`-docking_move_size`**: Un número entre 0.0 y 1.0 que controla la magnitud de los movimientos de docking de cuerpo rígido. 0.0 corresponde a los movimientos de docking más pequeños y 1.0 a los más grandes. El valor por defecto es 1.0.  
**`-rnp_high_res_relax`**: Realiza un refinamiento adicional de todos los átomos para complejos RNA-proteína (empaquetado de cadenas laterales, movimientos de docking pequeños, inserciones de fragmentos de un solo residuo). Por defecto: true.  
**`-rnp_high_res_cycles`**: El número de ciclos de refinamiento de todos los átomos que se realizan (arriba).   
**`-rnp_pack_first`**: Empaqueta primero las cadenas laterales de la proteína en el refinamiento de todos los átomos (arriba). Recomendado: true.  
**`-rnp_min_first`**: Minimiza la estructura RNA-proteína (con la función de energía de todos los átomos) antes de hacer cualquier otro refinamiento de alta resolución (arriba). Recomendado: true.  
**`-FA_low_res_rnp_scoring`**: Puntuación RNA-proteína de baja resolución usando residuos de proteína de todos los átomos.  


##Véase también
* [[DRRAFTER]]: Construye coordenadas de RNA dentro de mapas de crio-EM de ensamblajes RNA-proteína
* [[rnp ddg]]: Calcula afinidades de unión relativas de complejos RNA-proteína con el método ΔΔG de Rosetta-Vienna
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Tools]]: Herramientas basadas en Python para usar en Rosetta
* [RiboKit](http://ribokit.github.io/): Paquetes de modelado y análisis de RNA mantenidos por el laboratorio Das
