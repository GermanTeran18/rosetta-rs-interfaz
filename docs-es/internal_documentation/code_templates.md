#Plantillas de código de Rosetta

#Autor
Jared Adolf-Bryfogle (jadolfbr@gmail.com); noviembre de 2015

#Resumen
Estos scripts ayudan a los desarrolladores a reducir el tiempo de programación creando archivos de cabecera, de fuente y de cabecera fwd preconfigurados (plantillas) 
a partir de un esqueleto para clases y tipos de archivo comunes de Rosetta, con la magia de Python. 


Funciona para movers, task ops, clases generales, archivos de utilidades, aplicaciones y clases de pruebas unitarias (por nombrar algunos). 
Se están agregando más, así que esta no es una lista completa.  

Las plantillas de código se encuentran en ```main/source/code_templates```

Aquí encontrarás tres scripts.  Se pueden ejecutar desde cualquier directorio.

- __generate_templates.py__
 - Genera archivos hh, fwd.hh y cc preconfigurados (plantillas) que irán en src

- __generate_app_template_JD2.py__
 - Genera plantillas para aplicaciones piloto o públicas

- __generate_unit_test_template.py__
 - Genera plantillas para clases de pruebas unitarias
 
Para ver un resumen rápido (y obtener una lista de los tipos de clase implementados), usa la opción ```--help``` en una aplicación concreta: 
 - ```./generate_templates.py --help```
 
El código rellenará los campos de autor y de correo electrónico a partir de git. 
El archivo se creará y se colocará en el mismo directorio que el espacio de nombres indicado 
(o en el directorio que se pase con la opción ```dir_override```)


Los esqueletos se encuentran en los directorios src, application y unit_test. 

Este es un ejemplo de cómo crear un nuevo mover para carbohidratos:
```
./generate_templates.py --type mover --class_name TestMover --brief "A simple testing Mover" --namespace protocols carbohydrates

```
   
   
#Más información

El README del directorio te ayudará a empezar.  Esta página también tiene información sobre cómo agregar nuevas plantillas de src para nuevas clases de Rosetta.

https://github.com/RosettaCommons/rosetta/blob/main/source/code_templates/README.md

#Etc

Si te resulta útil, búscame en RosettaCon y avísame.  ¡Tomemos una cerveza!  
Pero en serio, piensa en apoyar el proyecto agregando nuevos tipos de plantillas.  Tener una plantilla puede ser enormemente beneficioso para la colaboración y la adaptación de tipos de clase específicos.  ¡Además hace que programar sea mucho más divertido!


¡Saludos!
