#Aplicación RosettaDNA

Metadatos
========

Autores:
Justin Ashworth (ashwortj@uw.edu) , James Havranek (havranek@genetics.wustl.edu) , Phil Bradley (pbradley@fhcrc.org) , Carlos Duarte, David Baker (dabaker@uw.edu)

Última actualización: 2011-02-18. Los autores de correspondencia son Justin Ashworth y David Baker.

Código y demostración
=====================

-   Código fuente de la aplicación: `        src/apps/public/RosettaDNA/RosettaDNA.cc       `
-   Clases principales del protocolo: `        src/protocols/dna/       `
-   Pruebas rápidas y demos: `        test/integration/tests/dna_interface_design/       `
-   Pruebas científicas: `        test/scientific/cluster/dna_interface_design/       `

Para ejecutar las demos (pruebas de integración), obtén el paquete de código fuente, entra en el directorio main/tests/integration y ejecuta la línea de comandos:

```
./integration.py dna_interface_design
```

(nota: ejecuta ./integration.py -h para establecer opciones y rutas adicionales que pueden ser necesarias según tu sistema)

Referencias
===========

-   Ashworth J, Taylor GK, Havranek JJ, Quadri SA, Stoddard BL, Baker D. Computational reprogramming of homing endonuclease specificity at multiple adjacent base pairs. Nucleic Acids Res. 2010 Sep;38(16):5601-8. PMID:20435674
-   Thyme SB, Jarjour J, Takeuchi R, Havranek JJ, Ashworth J, Scharenberg AM, Stoddard BL, Baker D. Exploitation of binding energy for catalysis and design. Nature. 2009 Oct 29;461(7268):1300-4. PMID:19865174
-   Ashworth J, Baker D. Assessment of the optimization of affinity and specificity at protein-DNA interfaces. Nucleic Acids Res. 2009 Jun;37(10):e73. PMID:19389725
-   Ashworth J, Havranek JJ, Duarte CM, Sussman D, Monnat RJ Jr, Stoddard BL, Baker D. Computational redesign of endonuclease DNA binding and cleavage specificity. Nature. 2006 Jun 1;441(7093):656-9. PMID:16738662

Propósito
===========================================

Esta aplicación ofrece soporte para el modelado biofísico de interacciones proteína-ADN. Proporciona muestreo y estimaciones energéticas de los grados de libertad estructurales y mutacionales en la interfaz proteína-ADN.

Algoritmo
=========

Esta aplicación permite acceder a los protocolos de todos los átomos, principalmente de cadena principal fija, del directorio protocols/dna a través de los esquemas de RosettaScripts y del distribuidor de trabajos. Este esquema es muy extensible: la aplicación también da acceso a cualquier otra clase o procedimiento implementado bajo el esquema de RosettaScripts. Actualmente, la principal diferencia entre esta aplicación y la aplicación RosettaScripts es que esta usa una clase JobOutputter personalizada para anteponer información específica de proteína-ADN a los archivos PDB de salida.

Limitaciones
============

Esta aplicación no cuenta con soporte oficial para nada que no esté descrito en las citas bibliográficas mencionadas.

Modos
=====

Consulta las demos (pruebas de integración) para ver tres modos de ejemplo de esta aplicación. Se ofrecen tres modos: diseño automatizado específico de pares de bases, diseño dirigido por resfile y predicción de especificidad de pares de bases.

Archivos de entrada
===================

Archivos obligatorios
---------------------

-   Una estructura PDB de una interfaz proteína-ADN. Nota: muchas estructuras contienen aminoácidos y nucleótidos no canónicos. Tendrás que sustituirlos por tipos normales con el método que prefieras.
-   Un archivo de protocolo de RosettaScripts de tipo XML. En las demos (pruebas de integración) se incluyen ejemplos. Consulta la documentación de RosettaScripts para más detalles.

Archivos adicionales opcionales:
--------------------------------

-   Un resfile. Es un archivo que especifica explícitamente comportamientos a nivel de residuo. Solo se aplica si se emplea el TaskOperation ResfileReader correspondiente en el RosettaScript. Se proporciona un ejemplo (consulta las rutas en la sección Archivos).

Opciones
========

Opciones básicas del protocolo
------------------------------

La mayor parte del comportamiento específico del protocolo se especifica a través de la interfaz de RosettaScripts. Estos son ejemplos de las opciones de las clases principales:

-   `        <RestrictDesignToProteinDNAInterface name="DnaInt" base_only="1" z_cutoff="3.0" dna_defs="C.-10.GUA/">       ` Esta clase detecta automáticamente los aminoácidos relevantes que se van a mover y mutar (los cercanos al ADN). base\_only: indica si se deben considerar los contactos con la cadena principal; z\_cutoff: umbral de distancia para el contacto con un par de bases determinado, medido a lo largo del eje helicoidal del ADN; dna\_defs: qué pares de bases considerar (usa el identificador de cadena y la numeración del PDB).
-   `        <DNA weights="dna/">       ` establece el archivo de pesos de la función de puntuación interna.
-   `        <DnaInterfaceMultiStateDesign name="msd" scorefxn="DNA" task_operations="IFC,IC,AUTOprot,DnaInt" pop_size="20" num_packs="1" numresults="0" boltz_temp="2" anchor_offset="15" mutate_rate="0.8" generations="5/">       ` Esta clase realiza diseño multiestado de aminoácidos para discriminar mejor entre secuencias. Esta funcionalidad no cuenta con soporte oficial. pop\_size: número de secuencias de proteína distintas; num\_packs: número de pruebas de empaquetado por secuencia; numresults: número de resultados que se devuelven; boltz\_temp: el factor de temperatura de Boltzmann que se usa al comparar efectivamente las aptitudes energéticas; anchor\_offset: número aproximado de unidades de energía que se pueden ceder para ganar especificidad; mutate\_rate: tasa de mutación de una secuencia individual; generations: número de veces que se "evoluciona" el conjunto de secuencias.
-   `        <DesignProteinBackboneAroundDNA name="bb" scorefxn="DNA" task_operations="IFC,IC,AUTOprot,DnaInt" type="ccd" gapspan="4" spread="3" cycles_outer="3" cycles_inner="1" temp_initial="2" temp_final="0.6/">       ` Esta clase intenta introducir pequeños cambios locales en la estructura de la cadena principal. gapspan y spread determinan qué parte de la cadena principal se vuelve flexible (spread se refiere al número de residuos de la cadena principal a cada lado de cada residuo que contacta con el ADN, y gapspan fija el número de aminoácidos entre extensiones que hace que estas se concatenen). cycles\_outer y cycles\_inner establecen el número de veces que se muestrean las posibles conformaciones de la cadena principal. temp\_initial y temp\_final afectan las tasas de aceptación inicial y final de los cambios de cadena principal que aumentan la energía libre (números más altos: mayores tasas de aceptación y, por tanto, cambios más agresivos y potencialmente desestabilizadores).
-   `        <DnaInterfacePacker name="DnaPack" scorefxn="DNA" task_operations="IFC,IC,AUTOprot,ProtNoDes,DnaInt" binding="1" probe_specificity="1/">       ` Esta clase controla la etapa de empaquetado de cadena principal fija del protocolo. task\_operations: especifica todas las TaskOperations definidas en RosettaScripts que determinan el comportamiento del packer (consulta el script completo en las demos (pruebas de integración) para ver ejemplos). binding: esta opción establece si se calculan las energías de unión (0: no, 1: sí). probe\_specificity: establece si se calcula la especificidad de pares de bases de la proteína después de que el packer termine de alterar la interfaz. Consulta las demos y la documentación de RosettaScripts para más detalles.

Opciones generales
------------------

Las siguientes opciones generales de línea de comandos de Rosetta se usan actualmente en las demos:

-   `        -adducts dna_major_groove_water       ` activa los nucleótidos hidratados
-   `        -sparse_pdb_output       ` escribe líneas PDB solo para los residuos que difieren de la estructura de entrada (para reducir el espacio en disco y el tamaño en memoria)
-   `        -file:s [your.pdb]       ` especifica el archivo de la estructura de entrada
-   `        -in:ignore_unrecognized_res       ` esta opción activa o desactiva el fallo al encontrar un residuo desconocido en el archivo de entrada
-   `        -score:weights dna       ` establece los pesos de la función de puntuación para la estructura de salida (distintos de los pesos especificados en el archivo de RosettaScripts, aunque preferiblemente iguales).
-   `        -use_input_sc       ` activa la inclusión de las orientaciones originales de las cadenas laterales en el muestreo conformacional.
-   `        -run:output_hbond_info       ` agrega información de enlaces de hidrógeno al archivo de salida
-   `        -score:output_residue_energies       ` agrega las energías por residuo al archivo de salida
-   `        -jd2:dd_parser       ` opción obligatoria para RosettaScripts
-   `        -parser:protocol design.script       ` especifica el archivo de protocolo de RosettaScripts
-   `        -overwrite       ` sobrescribe los archivos de salida anteriores al volver a ejecutar
-   `        -out:prefix design_       ` prefijo de los archivos de salida

Consejos
========

Las demos (pruebas de integración) están diseñadas para ejecutarse rápido. Para obtener resultados de mayor calidad, se puede activar un muestreo adicional de rotámeros con las opciones de línea de comandos -ex1 y -ex2. Además, consulta las pruebas científicas (mencionadas antes en esta documentación, en Código y demostración) para ver parámetros más útiles.

El rendimiento óptimo depende de algunas modificaciones menores del código y de los archivos de la base de datos. Por este motivo, se proporcionan archivos de base de datos alternativos en test/scientific/cluster/dna\_interface\_design/rosetta\_database\_sparse/. Las modificaciones se resumen a continuación:

-   aumentar el umbral de probabilidad de rotámeros en SingleResidueDunbrackLibrary::probability\_to\_accumulate\_while\_building\_rotamers (opciones -dunbrack\_prob\_buried y -dunbrack\_prob\_nonburied)
-   eliminar la atenuación de la fuerza de los enlaces de hidrógeno proteína-ADN según el número de vecinos (usa la opción NO\_ENV\_HB\_DEP\_DNA en los archivos de pesos)
-   reducir los radios del hidrógeno en rosetta\_database\_sparse/chemical/atom\_type\_sets/fa\_standard/atom\_properties.txt a 0.1/0.7 (polar/no polar). Aún requiere cambiar o personalizar manualmente los archivos de la base de datos.

Salidas esperadas
=================

Estos protocolos generan archivos a través del esquema JobDistributor. Normalmente, el resultado es un archivo PDB. A menudo, este archivo PDB contiene información de encabezado que describe los resultados del análisis.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
