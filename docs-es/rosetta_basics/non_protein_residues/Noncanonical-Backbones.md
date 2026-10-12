# Cómo trabajar con cadenas principales no canónicas en Rosetta
Documentación añadida por Andrew Watkins (XRW3), adaptada en parte de una captura de protocolo de Renfrew et al. (2012).

Resumen
==================
Con movers y protocolos especializados, Rosetta puede muestrear las conformaciones de polímeros peptidomiméticos con una geometría lo bastante parecida a la de los péptidos como para poder tratarlos con el mismo tipo de movers.
Estos protocolos no son ampliamente compatibles entre sí, y los protocolos de docking y diseño dependen en gran medida de partir de una buena conformación, por lo que puede resultar útil contar con conocimiento externo.

Peptoides
==================
Las estructuras de peptoides que se usan en Rosetta suelen estar ciclizadas (y este enlace puede mantenerse con el CyclizationMover), pero la geometría de la cadena principal solo se muestrea de forma rigurosa para peptoides lineales, que de por sí son más difíciles de resolver estructuralmente (el RandomTorsionMover y el RandomOmegaFlipMover son buenas opciones).
Los peptoides se pueden reempaquetar, acoplar (docking) y diseñar con la aplicación peptoid_design y con protocolos de docking independientes, o mediante RosettaScripts.

Oligooxopiperazinas
==================
Las secuencias ordinarias de aminoácidos se pueden transformar en oligooxopiperazinas añadiendo los parches correspondientes con el OopCreatorMover (o la aplicación oop_creator).
En particular, con la aplicación o con el mover puedes especificar qué anillos OOP deben tener el confórmero de anillo «más» y cuáles el «menos».
Después, se pueden diseñar en un contexto fijo con la aplicación oop_design, o en un protocolo de docking, diseño y minimización con la aplicación oop_dock_design o el mover OopDockDesignProtocol.

Hélices con sustituto de enlace de hidrógeno
==================
Las secuencias ordinarias de aminoácidos se pueden transformar en hélices con sustituto de enlace de hidrógeno (HBS) añadiendo los parches correspondientes en el primer residuo N-terminal y en el tercer residuo con el HbsCreatorMover (o la aplicación hbs_creator).
Después, se pueden diseñar en un contexto fijo con la aplicación hbs_design, o en un protocolo de docking, diseño y minimización con la aplicación hbs_dock_design o el mover NcbbDockDesignProtocol.
En principio, el NcbbDockDesignProtocol se puede usar para hacer simulaciones de docking y diseño de combinaciones arbitrarias de oligooxopiperazinas, beta-aminoácidos, peptoides, alfa-aminoácidos e incluso restricciones HBS.
Los niveles concretos de muestreo necesarios, dado que nunca se ha sintetizado un peptidomimético compuesto de este tipo, y mucho menos cristalizado, no pueden determinarse con precisión, pero es una apuesta segura aumentar sustancialmente el número de ciclos de docking y diseño y de perturbaciones individuales para peptidomiméticos grandes y complejos.

Beta-péptidos
==================
Los beta-aminoácidos tienen un átomo de carbono extra en la cadena principal.
Los beta-3 aminoácidos tienen la cadena lateral saliendo del carbono beta, mientras que los beta-2 aminoácidos tienen la cadena lateral saliendo del carbono alfa.
Estos últimos son considerablemente más difíciles de sintetizar y por eso aún no están integrados en Rosetta, mientras que los beta-3 aminoácidos están bien estudiados. 
La aplicación beta_peptide_modeling puede modelar complejos totalmente beta con funciones de puntuación especializadas, y en principio pueden usarse con cualquier aplicación de Rosetta siempre que los movimientos explícitos de la cadena principal tengan en cuenta la torsión extra de la cadena principal (por eso el RandomTorsionMover es superior al SmallMover en este aspecto).
