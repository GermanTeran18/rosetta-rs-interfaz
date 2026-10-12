# InterfacePacking
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## InterfacePacking

Calcula la puntuación de holes de Will Sheffler para los átomos de las interfaces entre bloques de construcción. Funciona con ensamblajes simétricos con uno o más bloques de construcción. ¡Asegúrate de fijar la opción -holes:dalphaball!

    <InterfacePacking name="(&string)" sym_dof_names="('' &string)" contact_dist="(10.0 &Real)" distance_cutoff="(9.0 &Real)" lower_cutoff="(-5 &lower_cutoff)" upper_cutoff="(5 &upper_cutoff)"/>

-   sym\_dof\_names - Obligatorio. Nombre(s) del/de los sym\_dof(s) correspondientes al/a los bloque(s) de construcción para los que se calculan las puntuaciones de holes.
-   contact\_dist - Distancia máxima entre los átomos CA o CB de la(s) subunidad(es) primaria(s) y las demás subunidades para incluirlos en el subpose que se usa en los cálculos de holes. (¿Habría que cambiar esto a átomos pesados y darle el mismo valor que distance\_cutoff?)
-   distance\_cutoff - Distancia máxima entre los átomos pesados de la(s) subunidad(es) primaria(s) y las subunidades vecinas para que la puntuación de holes se incluya en el cálculo.
-   lower\_cutoff - Puntuación de holes mínima para pasar.
-   upper\_cutoff - Puntuación de holes máxima para pasar.

## Véase también

* [[InterfaceHolesFilter]]
* [[ClashCheckFilter]]
* [[GetRBDOFValuesFilter]]
* [[MutationsFilter]]
* [[OligomericAverageDegreeFilter]]
* [[SymUnsatHbondsFilter]]
