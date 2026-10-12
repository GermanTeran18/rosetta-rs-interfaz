# Usar RosettaScripts con VSCode

Documentación añadida el 12 de diciembre de 2020 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).
Volver a [[RosettaScripts]].

## Usar RosettaScripts con VSCode

El editor [Visual Studio Code](https://code.visualstudio.com/) puede ser una herramienta cómoda para editar XML de RosettaScripts. Este documento muestra cómo activar el autocompletado y la ayuda al pasar el ratón en VSCode.

[[_TOC_]]

## Configuración

Sigue estos cinco pasos:

1.  Instala [VSCode](https://code.visualstudio.com/).

2.  Abre VSCode y, en el menú **View**, selecciona **Extensions**. Escribe "XSD" en el cuadro de búsqueda y selecciona **Xml Complete**. Haz clic en **Install**.

3.  Probablemente te convenga instalar también los paquetes XML y XML Tools. Estos permiten obtener más información de tu XSD, incluida la documentación de las secciones y de cada clase.

4.  Exporta desde RosettaScripts un archivo XSD de RosettaScripts (un archivo que define todos los comandos y la sintaxis permitidos en RosettaScripts). Para hacerlo, ejecuta en la línea de comandos:
```
<path to Rosetta>/Rosetta/main/source/bin/rosetta_scripts.default.linuxgccrelease -output_schema rosettascripts.xsd
```
Sustituye `<path to Rosetta>` por tu ruta de Rosetta y `.default.linuxgccrelease` por tu compilación, sistema operativo, compilador y modo (_p. ej._ `.cxx11thread.maxcosclangrelease` para la compilación con hilos en MacOS). Este comando ejecutará la aplicación RosettaScripts, que escribirá un archivo XSD y luego terminará. Coloca este archivo XSD en un lugar cómodo. (Ten en cuenta que Rosetta [[debe compilarse primero|Build-Documentation]].)

5.  Abre un archivo XML de RosettaScripts en VSCode. (Puedes crear un archivo XML de RosettaScripts nuevo y vacío ejecutando la aplicación RosettaScripts sin opciones y copiando y pegando la salida en VSCode.) Añade las siguientes líneas al principio de tu archivo XML:

```xml
<root
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="file://<path to file>/rosettascripts.xsd"
/>
```

En lo anterior, sustituye `<path to file>` por la ruta absoluta del archivo xml de RosettaScripts (p. ej. /home/user). Solo se admiten plenamente las rutas absolutas, pero cuando se proporciona un nombre de archivo simple, la extensión buscará el esquema junto al archivo local por comodidad.

¡Y eso es todo! Los pasos 1, 2 y 3 solo hay que hacerlos una vez. El paso 4 solo hay que hacerlo cuando compiles una versión nueva de Rosetta. El paso 5 hay que hacerlo para cada archivo XML con el que trabajes y, por desgracia, las líneas `<root ... />` añadidas deben comentarse (rodeadas por `<!--` y `-->`) antes de ejecutar el script. Es probable que esto se resuelva pronto, de modo que Rosetta simplemente ignore estas líneas adicionales. Mientras tanto, se pueden comentar y descomentar estas líneas fácilmente en VSCode seleccionándolas y pulsando `Ctrl + /` en un PC o `Command + /` en un Mac.

## Usar VSCode

Al usar VSCode:

* `Ctrl + space` abrirá el autocompletado. Por ejemplo, en el bloque `<MOVERS> ... </MOVERS>` de un script de RosettaScripts, verás una lista de todos los movers disponibles para scripting si pulsas `Ctrl + space`. Dentro de un tag, verás una lista de todas las opciones de ese tag. En algunos casos, incluso puedes obtener una lista de los valores permitidos para una opción. Por ejemplo, si escribes `<MinMover name="minimize" type="" />`, colocas el cursor entre las dos comillas y pulsas `Ctrl + space`, verás una lista de todos los tipos de minimización permitidos en Rosetta.
* Al pasar el ratón sobre un bloque de texto aparecerá la ayuda. Por ejemplo, pasar el ratón sobre el nombre de un mover muestra la descripción de ese mover. Pasarlo sobre una opción de un tag muestra una descripción de esa opción.

## Véase también
*  [[RosettaScripts]]
*  [[Compilar Rosetta|Build-Documentation]].
