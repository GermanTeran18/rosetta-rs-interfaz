Plataformas compatibles
===================

Rosetta debería poder compilarse en la mayoría de los sistemas Linux y Mac modernos con un compilador compatible con C++11.
(Consulta [[Cxx11Support]] para más detalles.)
El desarrollo de Rosetta lo realizan muchas personas distintas en una gran variedad de sistemas;
por tanto, los desarrolladores han probado muchas de las configuraciones actualizadas.
Somos conscientes de que la capacidad de los usuarios para actualizar los compiladores en los clústeres es limitada, por lo que
nos esforzamos por mantener Rosetta compatible con la mayoría de los sistemas de uso común.

Por ahora no tenemos una lista de plataformas oficialmente compatibles. 
En su lugar, a continuación se enumeran algunas de las configuraciones que usa la comunidad de desarrolladores de Rosetta.
Que una plataforma no figure en esta lista no significa que Rosetta no vaya a funcionar en ella,
sino simplemente que es una configuración que no se prueba de forma activa. 

Configuración de los servidores de pruebas
------------------------------

La siguiente es la configuración de los servidores de pruebas internos.
Se ha validado que todas las versiones se ejecutan en estos sistemas.

(A enero de 2016)

- CentOS 7.0 y 7.1
  - gcc 4.8.2 y 4.8.3
  - clang 3.4.2

- Ubuntu 14.04 "Trusty Tahr"
  - gcc 4.8

- MacOS 10.10.5 "Yosemite" (Darwin 14.5)
  - clang 7.0 (numeración de versiones de Apple) 

Configuraciones de las máquinas de los desarrolladores
--------------------------------

Los siguientes sistemas los usa la comunidad de desarrollo de Rosetta,  
ya sea durante el desarrollo de Rosetta o para ejecuciones en clústeres.

(A enero de 2016)

- MacOS X.9 ("Mavericks") y X.10 ("Yosemite")
    - clang 6.1 (llvm 3.6)

- CentOS 4.7 a 7.0
    - gcc 4.8
    - clang 3.3 a 3.4
    - icc 14 a 16

- Redhat Enterprise Linux 6.4
    - gcc 4.8
    - icc 14 a 15

- Scientific Linux 
    - clang 3.4

- Ubuntu 12.04, 14.04 y 15.04
    - gcc 4.8 a 4.9
    - clang 3.3 a 3.6

- Debian
    - gcc 4.8 a 4.9
    - clang 3.5  

Configuraciones conocidas como no compatibles
--------------------------------

Se sabe que los siguientes sistemas no funcionan con Rosetta
y es improbable que se consiga que lo hagan en un futuro previsible.

En casos extremos puede haber soluciones alternativas, pero probablemente sea más fácil
actualizar a una plataforma o sistema con mejor soporte.

- Windows
    - No se admite la compilación de Rosetta en ninguna versión de Windows.

- Compiladores con compatibilidad insuficiente con C++11
    - GCC versión 4.7 y anteriores
    - Clang versión 3.2 y anteriores
    - Compilador de Intel (ICC) versión 13 y anteriores
    - (La lista no es exhaustiva)

Nota: el número de versión del compilador no basta para determinar su compatibilidad,
ya que los compiladores compatibles con C++11 pueden estar usando una biblioteca estándar de C++ más antigua.
Para ayudar a comprobar la compatibilidad, hemos preparado un pequeño script de prueba en Python,
que se puede descargar de <https://raw.githubusercontent.com/RosettaCommons/rosetta_clone_tools/master/rosetta_compiler_test.py>

Nota: incluso si el compilador por defecto es una versión sin compatibilidad, a menudo habrá un compilador actualizado disponible en el sistema.
Habla con tu administrador de sistemas para más detalles y consulta [la documentación de compilación](Build-Documentation#setting-up-rosetta-3_alternative-setup-for-individual-workstations_scons-mac-linux) 
para compilar con un compilador que no sea el predeterminado.
En el peor de los casos, las versiones semanales de Rosetta 2015.39 y anteriores pueden ser compatibles con compiladores más antiguos.

##Véase también

* [[Getting Started]]: una página para quienes son nuevos en Rosetta
* [[Build Documentation]]: instrucciones para compilar Rosetta
* [[Scons Overview and Specifics]]: detalles avanzados sobre el sistema de compilación Scons
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
