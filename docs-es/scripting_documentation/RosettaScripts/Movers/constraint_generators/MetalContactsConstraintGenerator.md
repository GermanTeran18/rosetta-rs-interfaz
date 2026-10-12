#MetalContactsConstraintGenerator

###Resumen
Genera restricciones de distancia, ángulo y diedro para el átomo metálico indicado en el residuo ligando seleccionado. De forma predeterminada, todos los valores se restringen al valor de la medida en la Pose en el momento en que se crea el generador de restricciones. Los usuarios también pueden indicar átomos base alternativos (y bases de esos átomos base) para personalizar cómo se miden los ángulos y diedros.

El usuario debe especificar un solo átomo metálico por generador de restricciones, indicando un número de residuo o un selector de residuos y un nombre de átomo. Este átomo puede ser un ion metálico independiente o formar parte de un complejo mayor.

Un átomo se considera un contacto metálico si:
1) Se identifica en el archivo params del residuo como un átomo de unión a metales
Y
2) La distancia entre el átomo y el átomo metálico es menor o igual que la suma de sus radios de van der Waals multiplicada por dist_cutoff_multiplier.
Los residuos en los que se restringen los contactos pueden limitarse indicando contact_resnums o un contact_residue_selector; los contactos no internos fuera de ese conjunto no se configurarán.

###Glosario

Ten en cuenta que pueden indicarse varios valores ideales para todos los ángulos y diedros. Si constrain_to_closest es true, cada valor se restringirá al valor ideal indicado que esté más cerca de la medida encontrada en la Pose en el momento de crear las restricciones.

Términos:
* Contact: átomo en contacto directo con el ion metálico.
* Metal: el átomo metálico que el usuario ha especificado en el generador de restricciones.
* Base: el átomo base del contacto. Salvo que se indique otra cosa, es el base_atom definido por el ResidueType.
* Base_base: el átomo base de la base.
* Other_contact: otro átomo en contacto directo con el ion metálico. Puede ser un átomo de otro residuo coordinante o, si score_against_internal_contacts es true, otro átomo del residuo ligando que está en contacto con el átomo metálico.
* Other_base: el átomo base de other_contact.

Los ángulos especificados en este generador de restricciones se definen como sigue:
* Distance: contact-metal
* Angle_about_contact: base-contact-metal
* Dihedral_about_contact: base_base-base-contact-metal
* Angle_about_metal: contact-metal-other_contact
* Dihedral_about_metal: base-contact-metal-other_contact
* Dihedral_3: contact-metal-other_contact-other_base

###Uso

```xml
<MetalContactsConstraintGenerator name="(&string;)"
        dist_cutoff_multiplier="(1.0 &real;)" ligand_atom_name="(&string;)"
        ligand_selector="(&string;)" contact_selector="(&string;)"
        ligand_resnum="(&positive_integer;)"
        contact_resnums="(&refpose_enabled_residue_number_cslist;)"
        base_atom_name="(&string;)" base_base_atom_name="(&string;)"
        ideal_distance="(&real;)" ideal_angle_about_contact="(&real_cslist;)"
        ideal_dihedral_about_contact="(&real_cslist;)"
        ideal_angle_about_metal="(&real_cslist;)"
        ideal_dihedral_about_metal="(&real_cslist;)"
        ideal_dihedral_3="(&real_cslist;)"
        score_against_internal_contacts="(false &bool;)"
        constrain_to_closest="(true &bool;)"
 />
```

* dist_cutoff_multiplier: multiplica los radios de van der Waals del metal y del átomo de contacto por este valor durante la detección de contactos.
* ligand_atom_name: (OBLIGATORIO) nombre del átomo metálico del ligando que quieres restringir.
* ligand_selector: selector de residuos que indica qué ligando con metal se restringe.
* contact_selector: selector de residuos que limita qué residuos se consideran posibles contactos del ligando.
* ligand_resnum: número de residuo del ligando que se restringe.
* contact_resnums: números de los residuos que pueden considerarse contactos. Si no se especifica ni esta opción ni un selector de residuos, se consideran todos los residuos.
* base_atom_name: nombre del átomo que se usa como base de los átomos de contacto para ángulos y diedros. De forma predeterminada es el átomo base del residuo para el átomo de contacto.
* base_base_atom_name: nombre del átomo que se usa como base de la base de los átomos de contacto para ángulos y diedros. De forma predeterminada es el átomo base del residuo.
* ideal_distance: distancia ideal entre el metal restringido y el átomo de contacto. De forma predeterminada es la distancia actual.
* ideal_angle_about_contact: lista, separada por comas, de posibles ángulos óptimos, base-contact-metal. De forma predeterminada es el ángulo actual.
* ideal_dihedral_about_contact: lista, separada por comas, de posibles diedros óptimos, base_base-base-contact-metal. De forma predeterminada es el diedro actual.
* ideal_angle_about_metal: lista, separada por comas, de posibles ángulos óptimos, contact-metal-other_contact. De forma predeterminada es el ángulo actual.
* ideal_dihedral_about_metal: lista, separada por comas, de posibles diedros óptimos, base-contact-metal-other_contact. De forma predeterminada es el diedro actual.
* ideal_dihedral_3: lista, separada por comas, de posibles diedros óptimos, contact-metal-other_contact-other_base. De forma predeterminada es el diedro actual.
* score_against_internal_contacts: ¿debemos puntuar ángulos y diedros respecto de otros átomos del ligando?
constrain_to_closest: si se indican varios valores ideales de ángulo o diedro, restringe cada medida al valor ideal más cercano al valor de esa medida en el momento de configurar las restricciones. Si es false, se usará en su lugar una AmbiguousConstraint con todos los valores indicados. El valor predeterminado es true.

##Véase también
* [[ConstraintGenerators]]
* [[AddConstraints]]
* [[RemoveConstraints]]
* [[SetupMetalsMover]]
* [[Metals]]
