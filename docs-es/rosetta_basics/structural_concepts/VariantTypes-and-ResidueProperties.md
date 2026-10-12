#Agrupación de ResidueTypes según rasgos químicamente significativos

En Rosetta hay dos clases que se usan para categorizar los [[ResidueTypes|ResidueType]] según propiedades químicas similares.
En ambos casos el objetivo es esencialmente el mismo: es importante tratar de la misma manera a todos los ResidueTypes que tienen un rasgo particular, y es muchísimo más importante determinar si ese ResidueType tiene el rasgo consultando ese dato en el archivo params en lugar de calcularlo sobre la marcha.
Por ejemplo, ¿qué ResidueTypes son alifáticos?
Se podrían contar los átomos de la cadena lateral y comprobar que todos son carbonos con hibridación sp<sup>3</sup>, lo cual sería una condición suficiente.
Pero en cambio, en particular para los casos generales, es mucho más eficiente simplemente mantener un vector de ResidueProperties en el archivo params: así, la serina es POLAR y PROTEIN y ALPHA_AA y por eso se puede distinguir de la leucina, de la beta-serina y de la glucosa.

Por lo tanto, las ResidueProperties describen lo que es intrínsecamente cierto de un residuo; rara vez se pueden alterar.
(Ocasionalmente, algunos parches eliminan o añaden una propiedad.)
En cambio, los VariantTypes codifican esencialmente la relación que un residuo parcheado tiene con su residuo padre. Por ejemplo, una CYS:disulfide tiene el tipo variante DISULFIDE porque, a diferencia de CYS, está desprotonada y forma un enlace disulfuro.
En general, si estás mutando un residuo manualmente, querrás mantener los tipos variantes del residuo original siempre que sea posible.

## Las palabras de un sabio erudito de Rosetta, el primero de su nombre, Anónimo (también conocido como Labonte): 

Propiedades:
-	Una propiedad debe usarse para los siguientes fines:
	- Para designar si el residuo en cuestión es un residuo polimérico real o un ligando, p. ej., POLYMER, LIGAND
	- Para designar a qué clasificación o familia química pertenece el residuo, p. ej., PROTEIN, RNA
	- Para designar una propiedad química global de la molécula o del residuo, p. ej., POLAR, CHARGED
	- Para designar que un residuo ha sido modificado en una posición concreta (pero NO cuál es esa modificación), p. ej., OG_MODIFIED, C1_MODIFIED
-	No combines propiedades que son distintas:  CHARGED y PROTEIN son propiedades preferibles; CHARGED_PROTEIN no lo sería.
-       SÍ combina propiedades si ESTÁN intrínsecamente relacionadas:  es preferible L_AA a L_STEREOCHEMISTRY y AMINO_ACID, porque la estereoquímica L solo se define como convención en el contexto de los aminoácidos (en contraposición a la nomenclatura R/S, que se puede aplicar de manera más universal, pero que hace que la cisteína se clasifique de manera distinta a los demás aminoácidos).
-	Las propiedades deben nombrarse como sustantivos si designan una familia, o como adjetivos si son una propiedad química, p. ej., PEPTOID frente a AROMATIC.

Variantes:
-	 Una variante debe usarse para designar una variación o modificación específica de un residuo base, especificando la ubicación si es necesario, p. ej., LOWER_TERMINUS, OG_PHOSPHORYLATED, C1_PHOSPHORYLATED
-	 Las variantes NO son directamente sinónimos de los parches:
	- Es posible que varios archivos de parche sean de la misma variante. Por ejemplo, la manera de hacer una variante LOWER_TERMINUS de un residuo AA es muy distinta de cómo se hace un LOWER_TERMINUS de un residuo NA.
	- ¡NO debería ser posible que un único residuo base tenga más de un archivo de parche que especifique el mismo tipo de variante!
-        Si buscas solucionar problemas relacionados con los tipos de extremos en tu Pose, considera:
	- Edición de tipos variantes (incluidos los extremos): [[ModifyVariantTypeMover|scripting_documentation/RosettaScripts/Movers/movers_pages/ModifyVariantTypeMover]]
	- Si quieres quitar extremos: [[MutateResidueMover|scripting_documentation/RosettaScripts/Movers/movers_pages/MutateResidueMover]] con "mutate_self"
	- Si quieres añadir extremos: [[DeclareBondMover|scripting_documentation/RosettaScripts/Movers/movers_pages/DeclareBond]] con "add_termini"