<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Inicializa el entorno de ejecución del solucionador de Poisson-Boltzmann. Permite hacer seguimiento de las mutaciones de la proteína para minimizar el número de evaluaciones PB.

```xml
<SetupPoissonBoltzmannPotential name="(&string;)" scorefxn="(&string;)"
        jump="(1 &non_negative_integer;)" per_residue_ddg="(false &bool;)"
        repack_unbound="(false &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" repack_bound="(true &bool;)"
        relax_bound="(false &bool;)" relax_unbound="(true &bool;)"
        translate_by="(1000.0 &real;)" relax_mover="(&string;)"
        filter="(&string;)" chain_num="(&string;)" chain_name="(&string;)"
        solvate="(false &bool;)" solvate_unbound="(false &bool;)"
        solvate_rbmin="(false &bool;)" min_water_jump="(true &bool;)"
        compute_rmsd="(false &bool;)" dump_pdbs="(false &bool;)"
        apbs_path="(&string;)" charged_chains="(&string;)"
        revamp_near_chain="(&string;)" potential_cap="(&real;)"
        sidechain_only="(&bool;)" epsilon="(&real;)" calcenergy="(&bool;)"
        apbs_debug="(2 &integer;)" />
```

-   **scorefxn**: Nombre de la función de puntuación a usar
-   **jump**: XSD XRW POR HACER
-   **per_residue_ddg**: XSD XRW POR HACER
-   **repack_unbound**: XSD XRW POR HACER
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **repack_bound**: XSD XRW POR HACER
-   **relax_bound**: ¿Se debe hacer relax del estado unido, si se especifica un mover de relax? Por defecto es false.
-   **relax_unbound**: ¿Se debe hacer relax del estado no unido, si se especifica un mover de relax? Por defecto es true.
-   **translate_by**: Distancia en Å con la que se separan los componentes del estado unido
-   **relax_mover**: XSD XRW POR HACER
-   **filter**: XSD XRW POR HACER
-   **chain_num**: XSD XRW POR HACER
-   **chain_name**: XSD XRW POR HACER
-   **solvate**: Solvata la Pose unida (con el mover ExplicitWater)
-   **solvate_unbound**: Solvata la Pose no unida (con el mover ExplicitWater)
-   **solvate_rbmin**: Usa minimización de cuerpo rígido tras la solvatación
-   **min_water_jump**: Incluye las aguas en la minimización de cuerpo rígido posterior a la solvatación y al empaquetado
-   **compute_rmsd**: Calcula el RMSD con y sin superposición; requiere que se indique in:file:native
-   **dump_pdbs**: Vuelca PDB de depuración. Vuelca 6 PDB por instancia: BOUND_before_repack, BOUND_after_repack, BOUND_after_relax, UNBOUND_before_repack, UNBOUND_after_repack y UNBOUND_after_relax.
-   **apbs_path**: XRW POR HACER
-   **charged_chains**: Lista, delimitada por comas, de números de las cadenas cargadas (mayores o iguales que 1). Por ejemplo, charged_chains=1,2,3 para las cadenas 1, 2 y 3. No se permiten espacios adicionales
-   **revamp_near_chain**: Lista, delimitada por comas, de números de cadena. Reduce las interacciones PB cerca de las cadenas indicadas. Por defecto, ninguna
-   **potential_cap**: Límite superior de la entrada del potencial PB. Por defecto es 20.0
-   **sidechain_only**: Pon "true" para limitar el cálculo de las interacciones a la cadena lateral. Por defecto es "false"
-   **epsilon**: tolerancia de mutación en Å. El potencial solo se recalcula cuando | Ca1 - Ca2 | es mayor que epsilon, para todo Ca1 (carbono alfa de la Pose anterior) y todo Ca2 (carbono alfa de la Pose actual). Por defecto es 2.0 Å
-   **calcenergy**: Pon "true" para calcular la energía. Aún no está implementado. Por defecto es false
-   **apbs_debug**: Nivel de depuración de APBS [0-6]. Por defecto es 2

---
