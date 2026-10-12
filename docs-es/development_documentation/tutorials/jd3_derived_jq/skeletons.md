#Paso 1: Esqueletos para crear el archivo

Autor: Jack Maguire

[[Volver al recorrido|jd3_derived_jq_home]]

[[Paso 2: Crear el DAG de trabajos|creating_the_job_dag]]

[[_TOC_]]

##Plan

¡El primer paso para escribir un archivo es crearlo!
Pongamos nuestra job queen en `src/protocols/tutorial`.
A continuación he pegado algunos esqueletos que puedes copiar y pegar.

Añadamos también lo siguiente a uno de los archivos protocols.*.src.settings.

```
        "protocols/tutorial" : [
                "TutorialQueen",
                "TutorialJob",
        ],
```


##TutorialQueen.fwd.hh

```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialQueen.fwd.hh
/// @author Jack Maguire, jackmaguire1444@gmail.com


#ifndef INCLUDED_protocols_tutorial_TutorialQueen_FWD_HH
#define INCLUDED_protocols_tutorial_TutorialQueen_FWD_HH

#include <utility/pointer/owning_ptr.hh>

namespace protocols {
namespace tutorial {

class TutorialQueen;
typedef utility::pointer::shared_ptr< TutorialQueen > TutorialQueenOP;
typedef utility::pointer::shared_ptr< TutorialQueen const > TutorialQueenCOP;

} //tutorial
} //protocols

#endif
```

##TutorialQueen.hh

```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialQueen.hh
/// @author Jack Maguire, jackmaguire1444@gmail.com


#ifndef INCLUDED_protocols_tutorial_TutorialQueen_HH
#define INCLUDED_protocols_tutorial_TutorialQueen_HH

#include <protocols/tutorial/TutorialQueen.fwd.hh>
#include <protocols/jd3/standard/StandardJobQueen.hh>

namespace protocols {
namespace tutorial {

class TutorialQueen: public jd3::standard::StandardJobQueen {

public:

	//constructor
	TutorialQueen();

	//destructor
	~TutorialQueen() override;

};

} //tutorial
} //protocols

#endif
```

##TutorialQueen.cc

```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialQueen.cc
/// @author Jack Maguire, jackmaguire1444@gmail.com

#include <protocols/tutorial/TutorialQueen.hh>
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

} //tutorial
} //protocols
```

##TutorialJob.fwd.hh
```c++
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington CoMotion, email: license@uw.edu.

/// @file protocols/tutorial/TutorialJob.fwd.hh
/// @author Jack Maguire, jackmaguire1444@gmail.com

#ifndef INCLUDED_protocols_tutorial_TutorialJob_FWD_HH
#define INCLUDED_protocols_tutorial_TutorialJob_FWD_HH

#include <utility/pointer/owning_ptr.hh>

namespace protocols {
namespace tutorial {

class TutorialJob;
typedef utility::pointer::shared_ptr< TutorialJob > TutorialJobOP;
typedef utility::pointer::shared_ptr< TutorialJob const > TutorialJobCOP;

} //tutorial
} //protocols

#endif
```

##TutorialJob.hh
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

#include <protocols/tutorial/TutorialJob.fwd.hh>

#include <protocols/jd3/CompletedJobOutput.hh>
#include <protocols/jd3/Job.hh>

namespace protocols {
namespace tutorial {

class TutorialJob : public jd3::Job {

public:

        //constructor
        TutorialJob();

        //destructor
        ~TutorialJob();

        jd3::CompletedJobOutput run() override;

};

} //tutorial
} //protocols

#endif        
```

##TutorialJob.cc
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
        jd3::CompletedJobOutput output;
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
