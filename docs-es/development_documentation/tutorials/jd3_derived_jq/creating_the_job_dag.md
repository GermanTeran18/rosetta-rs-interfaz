#Paso 2: Crear el DAG de trabajos

Autor: Jack Maguire

[[Volver al recorrido|jd3_derived_jq_home]]

[[Paso 1: Esqueletos de código|skeletons]]

[[Paso 3: Node Managers|node_managers]]

[[_TOC_]]

##Lecturas

[[The_Role_of_the_JobDigraph|https://wiki.rosettacommons.org/index.php/JD3FAQ#The_Role_of_the_JobDigraph]]

[[Más sobre el dígrafo|https://wiki.rosettacommons.org/index.php/JD3FAQ#Communication_between_the_JobDistributor_and_the_JobQueen_via_the_JobDigraph]]

##Plan

Intenté idear una queen que requiriera un [[DAG de trabajos|https://wiki.rosettacommons.org/index.php/JD3FAQ#The_Role_of_the_JobDigraph]] no lineal.
Hay varias formas de crear un DAG que se ajuste a nuestras necesidades; usemos algo como esto:

Nodo 1 del DAG: ejecutar el mover A. El número de trabajos es proporcional al número de residuos de la cadena 1 (solo para hacerlo interesante).

Nodo 2 del DAG: ejecutar el mover B. El número de trabajos es proporcional al número de residuos de la cadena 2.

Nodo 3 del DAG: combinar los resultados de 1 y 2 y ejecutar el mover C.

```
1------> 3
    /
2--/
```

Así, cada posición de residuo de la cadena 1 recibe su propio trabajo en el nodo 1 y cada posición de la cadena 2 recibe su propio trabajo en el nodo 2.
En la realidad, casi con seguridad harías de esto un DAG de 2 nodos `1->2` en el que el primer nodo se ocupe de ambas cadenas.
Esperaba que este tutorial tuviera un DAG ramificado y no fui lo bastante creativo como para encontrar un caso de diseño lo bastante simple para usarlo en un tutorial.
Sigamos con esto.

##initial_job_dag()

Para crear el DAG de trabajos, necesitamos sobrescribir `initial_job_dag()`, como se muestra a continuación.
Esta función es un lobo con piel de cordero: parece un simple getter, pero
es el primer método que llama el distribuidor de trabajos después de la construcción y se encarga de casi toda la inicialización de la job queen.

La standard job queen se inicializa cuando llamas a `determine_preliminary_job_list()` (que recomiendo que sea la primera línea de `initial_job_dag()`).
`determine_preliminary_job_list()` llamará a la función virtual `parse_job_definition_tags()`.
Trataremos este método con más detalle en el [[Apéndice A|appendixA]],
pero por ahora podemos usarlo simplemente para contar el número de etiquetas `<Job>` del archivo de definición de trabajos.

##Código

Omití parte de la información al principio y al final de las páginas.

###TutorialQueen.hh

```c++
#include <protocols/tutorial/TutorialQueen.fwd.hh>
#include <protocols/jd3/standard/StandardJobQueen.hh>
#include <protocols/jd3/JobDigraph.fwd.hh>

#include <utility/tag/Tag.fwd.hh>

namespace protocols {
namespace tutorial {

class TutorialQueen: public jd3::standard::StandardJobQueen {

public:

	//constructor
	TutorialQueen();

	//destructor
	~TutorialQueen() override;

        jd3::JobDigraphOP
        initial_job_dag()
        override;

	void
        parse_job_definition_tags(
                utility::tag::TagCOP common_block_tags,
                utility::vector1< jd3::standard::PreliminaryLarvalJob > const &
        ) override;

private:
        core::Size num_input_structs_;
};

} //tutorial
} //protocols
```

###TutorialQueen.cc

```c++
#include <protocols/tutorial/TutorialQueen.hh>
#include <protocols/jd3/JobDigraph.hh>

#include <utility/pointer/memory.hh>
#include <basic/Tracer.hh>

static basic::Tracer TR( "protocols.tutorial.TutorialQueen" );

using namespace protocols::jd3;

namespace protocols {
namespace tutorial {

//Constructor
TutorialQueen::TutorialQueen() :
    StandardJobQueen()
{}

//Destructor
TutorialQueen::~TutorialQueen()
{}

JobDigraphOP
TutorialQueen::initial_job_dag() {
        //you need to call this for the standard job queen to initialize
        determine_preliminary_job_list();

	//the lone argument ( 3 ) is the number of nodes in the dag
        JobDigraphOP dag = utility::pointer::make_shared< JobDigraph >( 3 );
        dag->add_edge( 1, 3 ); //results of node 1 will be fed directly to node 3
        dag->add_edge( 2, 3 ); //results of node 2 will be fed directly to node 3
        return dag;
}

void
TutorialQueen::parse_job_definition_tags(
        utility::tag::TagCOP common_block_tags,
        utility::vector1< standard::PreliminaryLarvalJob > const & prelim_larval_jobs
){
        num_input_structs_ = prelim_larval_jobs.size();
}

} //tutorial
} //protocols
```


##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Rosetta tests]]: enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta
