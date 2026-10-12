#Uso y descripción general de la aplicación minirosetta de Boinc

Metadatos
========

El código relevante de Mini-Rosetta está en minirosetta.cc. Este documento fue escrito el 22 de enero de 2008 por David E. Kim y actualizado por última vez el 24 de octubre de 2015 por Vikram K. Mulligan (vmullig@uw.edu).

Información general
===================

Este documento contiene una descripción general de la aplicación «minirosetta» y de su uso. Igual que la aplicación «todo en uno» de rosetta++, «minirosetta» ejecuta distintos modos o protocolos según los argumentos de la línea de comando. «minirosetta» se desarrolla para ejecutar tareas distribuidas a gran escala en [Rosetta@home](http://boinc.bakerlab.org/rosetta) con [Boinc](http://boinc.berkeley.edu) .

Compilación
===========

Aplicación de línea de comando
------------------------------

Para compilar «minirosetta» como una aplicación de línea de comando que se pueda ejecutar en clústeres locales (no depende de Boinc), usa como ejemplo los siguientes comandos de scons. Se aplican las opciones generales de compilación de Rosetta con scons. Usa «scons -h» para ver la información de uso del sistema de compilación.

-   Compilación de depuración

    ```
    scons bin/minirosetta.gcclinuxdebug
    ```

-   Compilación de lanzamiento (release)

    ```
    scons mode=release bin/minirosetta.gcclinuxrelease
    ```

Aplicación de Boinc
-------------------

Para compilar «minirosetta» como una aplicación de Boinc, usa como ejemplo los siguientes comandos de scons. Nota: hay que usar extras=boinc,static para crear una aplicación estática que se pueda ejecutar en Boinc.

- Compilación de depuración

   ```
   scons extras=boinc, static bin/minirosetta.gcclinuxdebug
   ```

- Compilación de lanzamiento (release)

   ```
   scons extras=boinc, static mode=release bin/minirosetta.gcclinuxrelease
   ```

Argumentos opcionales de Boinc
==============================

```
[-in::file::zip <zipped archive>]
```

Un archivo comprimido en zip. Descomprime su contenido en el directorio de ejecución con la biblioteca boinc\_zip de BOINC antes de ejecutar el protocolo de Rosetta. Es útil para archivos y directorios de entrada, como la base de datos de minirosetta. Por ejemplo, todos los archivos de entrada se pueden comprimir en un único archivo.

Protocolos
==========

Se pueden ejecutar los siguientes protocolos.

Abinitio clásico y relax ( -protocol abrelax )
----------------------------------------------

Este protocolo ejecuta el abinitio clásico y relax para la predicción de plegamiento de proteínas de novo. El código relevante está en classic_abinitio_relax_impl.cc

### Uso básico

```
minirosetta [-protocol abrelax] [-fasta <fasta file> or -native <native pdb>] [-frag3 <3mer frag file>] [-frag9 <9mer frag file>] [options..]
```

### Argumentos opcionales

También se aplican los argumentos estándar adicionales de minirosetta y los específicos del protocolo.

```
[-nstruct <int>]
```

número de decoys (predeterminado 1).

```
[-increase_cycles <float>]
```

Aumenta el número de ciclos de cada etapa por este factor.

```
[-abinitio::relax]
```

Hace relax después del abinitio.

```
[-out::file::silent <silent file name>]
```

Nombre del silent file de salida. El valor predeterminado es «default.out».

```
[-out::silent_gz]
```

Comprime con gzip el silent file de salida.

```
[-checkpoint]
```

Activa los puntos de control (checkpointing) con el intervalo de tiempo predeterminado (5 minutos).

```
[-checkpoint_interval <int>]
```

Activa los puntos de control con el intervalo de tiempo dado en segundos.

Predicción simple de péptidos cíclicos ( -protocol simple_cycpep_predict )
------------------------------------------------

La documentación completa de esta aplicación está disponible en la página de la [[Aplicación de predicción simple de péptidos cíclicos|simple_cycpep_predict]].  (Eso sí, los gráficos de BOINC de simple_cycpep_predict son especialmente buenos, si me permiten decirlo.)

Ligand Dock ( -protocol ligand\_dock )
--------------------------------------

En construcción......


##Véase también

* [[Minirosetta comparative modeling]]: uso de la aplicación minirosetta para el modelado comparativo
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[RosettaScripts]]: la página principal de RosettaScripts