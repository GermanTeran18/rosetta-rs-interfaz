(Esta aplicación no se ha publicado)
<!--- BEGIN_INTERNAL -->

Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Investigador principal: Roland Dunbrack

Última actualización de la documentación: 15/2/2014

# Descripción general:
Esta aplicación busca relajar los CDR usando restricciones armónicas circulares para cada clúster identificado.  Las definiciones de CDR son North/Dunbrack.

# Requisitos:
Los anticuerpos deben estar renumerados con algún esquema de numeración.  Consulta más abajo las opciones aceptables.  Para renumerar a AHO, como se usó en el artículo original, usa este sitio: http://dunbrack2.fccc.edu/PyIgClassify/

# Algoritmo:
La aplicación primero identifica cada CDR de tu anticuerpo con uno de los clústeres canónicos de CDR de North/Dunbrack.  Luego se añaden a los CDR restricciones de diedros basadas en un conjunto de datos reciente de alta resolución de anticuerpos del PDB, y se relajan todos los CDR.  Esto se ampliará para dar mayor flexibilidad.

# Aplicación: relax_cdrs

# Opciones:
Sigue las opciones habituales de Rosetta, incluidas las opciones de relax y de minimización.  Asegúrate de pasar -numbering_scheme si usas un esquema distinto de Chothia.  Las opciones son: Chothia_Scheme, Enhanced_Chothia_Scheme, AHO_Scheme, IMGT_Scheme. Kabat_Scheme también se acepta, pero no es totalmente compatible por las convenciones de numeración de H1.  Usa Kabat_Scheme con precaución.
<!--- END_INTERNAL -->
##Véase también

* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Antibody protocol]]: la aplicación principal de modelado de anticuerpos
    * [[Antibody Python script]]: script de configuración de esta aplicación
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.
    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta