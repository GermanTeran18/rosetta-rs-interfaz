#Paso 5: Escribir una clase Job

Autor: Jack Maguire

[[Volver al recorrido|jd3_derived_jq_home]]

[[Paso 4: Crear larval jobs|larval_jobs]]

[[Paso 6: Madurar larval jobs|maturing_larval_jobs]]

[[_TOC_]]

##Lecturas

[[Job::run()|https://wiki.rosettacommons.org/index.php/JD3FAQ#Job::run.28.29]]

##Plan

Ahora vamos a crear las clases en las que madurarán los larval jobs.
Llamemos a esta clase `TutorialJob` ([[consulta aquí el esqueleto|skeletons]]).

El trabajo de este tutorial es relativamente simple.
Tendremos como miembros de datos un `MoverOP`, un `ScoreFunctionCOP` y un `PoseOP`.
Dentro de la función virtual `run` (que es la única función, además del constructor, a la que llamará el distribuidor de trabajos),
aplicaremos el mover al Pose y puntuaremos el Pose con la función de puntuación.

##Adiciones al código

###Adiciones al archivo de cabecera

Necesitamos estos miembros de datos privados. También deberíamos crear getters y setters para ellos (véase más abajo en el código actualizado).
```c++
core::pose::PoseOP pose_;
core::scoring::ScoreFunctionCOP sfxn_;
moves::MoverOP mover_;
```

### Nuevas inclusiones en el archivo .hh
```c++
#include <core/pose/Pose.fwd.hh>
#include <core/scoring/ScoreFunction.fwd.hh>
#include <protocols/moves/Mover.fwd.hh>
```

### Nuevas inclusiones en el archivo .cc
```c++
#include <core/pose/Pose.hh>
#include <core/scoring/ScoreFunction.hh>
#include <protocols/moves/Mover.hh>

#include <protocols/jd3/JobResult.hh>
#include <protocols/jd3/JobSummary.hh>
#include <protocols/jd3/standard/MoverAndPoseJob.hh>

#include <utility/pointer/memory.hh>
```

###run()

Este método es algo parecido a Mover::apply().
Toda clase Job lo necesita, y es el único método al que llama el distribuidor de trabajos.

En nuestro caso, queremos que nuestro trabajo aplique el mover al Pose y puntúe el resultado.
La puntuación se informará como un `jd3::standard::EnergyJobSummary` y el Pose se informará como un `jd3::standard::PoseJobResult`.

Puedes crear tus propias clases derivadas de `JobSummary` y `JobResult`.
Si lo haces, asegúrate de que sean
[[serializables|https://wiki.rosettacommons.org/index.php/SerializationFAQ]].

```c++
jd3::CompletedJobOutput TutorialJob::run() {
        runtime_assert( pose_ );
        runtime_assert( sfxn_ );
        runtime_assert( mover_ );

        jd3::CompletedJobOutput output;
        mover_->apply( *pose_ );
        core::Real const score = sfxn_->score( *pose_ );

        jd3::JobSummaryOP summary( utility::pointer::make_shared< jd3::standard::EnergyJobSummary >( score ) );
        jd3::JobResultOP result( utility::pointer::make_shared< jd3::standard::PoseJobResult >( pose_ ) );
        output.job_results.push_back( std::make_pair( summary, result ) );

        output.status = jd3::jd3_job_status_success;
        return output;
}
```

##Código actualizado

###TutorialJob.hh
```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialJob.hh
/// @author Jack Maguire, jackmaguire1444@gmail.com


#ifndef INCLUDED_protocols_tutorial_TutorialJob_HH
#define INCLUDED_protocols_tutorial_TutorialJob_HH

#include <utility/pointer/ReferenceCount.hh>
#include <protocols/tutorial/TutorialJob.fwd.hh>

#include <protocols/jd3/CompletedJobOutput.hh>
#include <protocols/jd3/Job.hh>
#include <protocols/jd3/LarvalJob.fwd.hh>

#include <core/pose/Pose.fwd.hh>
#include <core/scoring/ScoreFunction.fwd.hh>
#include <protocols/moves/Mover.fwd.hh>

namespace protocols {
namespace tutorial {

class TutorialJob : public jd3::Job {

public:

        //constructor
        TutorialJob();

        //destructor
        ~TutorialJob();

        jd3::CompletedJobOutput run() override;

public:

        inline void set_pose( core::pose::PoseOP pose ) {
                pose_ = pose;
        }

        inline core::pose::PoseCOP pose() const {
                return pose_;
        }

        inline void set_sfxn( core::scoring::ScoreFunctionCOP sfxn ) {
                sfxn_ = sfxn;
        }

        inline core::scoring::ScoreFunctionCOP sfxn() const {
                return sfxn_;
        }

        inline void set_mover( moves::MoverOP mover ) {
                mover_ = mover;
        }

        inline moves::MoverCOP mover() const {
                return mover_;
        }

private:
        core::pose::PoseOP pose_;
        core::scoring::ScoreFunctionCOP sfxn_;
        moves::MoverOP mover_;
};

} //tutorial
} //protocols

#endif        
```

###TutorialJob.cc
```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialJob.cc
/// @brief
/// @detailed
/// @author Jack Maguire, jackmaguire1444@gmail.com

#include <protocols/tutorial/TutorialJob.hh>

#include <basic/Tracer.hh>

#include <core/scoring/ScoreFunction.hh>
#include <core/pose/Pose.hh>
#include <protocols/moves/Mover.hh>

#include <protocols/jd3/JobResult.hh>
#include <protocols/jd3/JobSummary.hh>
#include <protocols/jd3/standard/MoverAndPoseJob.hh>

#include <utility/pointer/memory.hh>

static basic::Tracer TR( "protocols.tutorial.TutorialJob" );

namespace protocols {
namespace tutorial {

//Constructor
TutorialJob::TutorialJob()
{}

//Destructor
TutorialJob::~TutorialJob()
{}

jd3::CompletedJobOutput TutorialJob::run() {
        runtime_assert( pose_ );
        runtime_assert( sfxn_ );
        runtime_assert( mover_ );

        jd3::CompletedJobOutput output;
        mover_->apply( *pose_ );
        core::Real const score = sfxn_->score( *pose_ );

        jd3::JobSummaryOP summary( utility::pointer::make_shared< jd3::standard::EnergyJobSummary >( score ) );
        jd3::JobResultOP result( utility::pointer::make_shared< jd3::standard::PoseJobResult >( pose_ ) );
        output.job_results.push_back( std::make_pair( summary, result ) );

        output.status = jd3::jd3_job_status_success;
        return output;
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
