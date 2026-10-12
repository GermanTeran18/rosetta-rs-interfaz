Gráficos OpenGL
=====
Los gráficos, o «visor», son un visor gráfico nativo de Rosetta que te permite ver un Pose determinado en tiempo real. Se usa a menudo para depurar protocolos en rosetta_scripts. Son los mismos gráficos que usa el salvapantallas BOINC de Rosetta@home. 

La ventaja de usar el visor gráfico nativo de Rosetta frente al mover de PyMol es que es MUY ligero y permite renderizar gráficos casi EN VIVO y sin retraso, ¡incluso a través de una conexión SSH!

## Control de los gráficos
Para controlar lo que se ve, usa los atajos de teclado:
* C = color (colorear por cadena, arcoíris, tipo de átomo, etc.)
* B = cadena principal (cinta, cartoon, etc.)
* S = cadena lateral activada/desactivada
* H = hidrógeno activado/desactivado
* clic derecho = rotar
* alt + clic derecho = desplazar
* shift + clic derecho = zoom
* ctrl + clic derecho = cambiar el contorno de densidad (para densidad de rayos X o crio-EM)

## ¡Ejecutar RosettaScripts con gráficos!
Solo tienes que incluir una única opción:
```bash
rosetta_scripts.graphics.linuxgccrelease -parser:view
```

Nota: algunos movers asignan automáticamente la estructura secundaria al Pose de trabajo; para los que no lo hacen, primero debes ejecutar el mover Dssp.

## Compatibilidad con densidad:
```bash
-edensity:render_density
-edensity:mapfile input.map
```
Nota: el mapa debe definirse en la línea de comandos, incluso si se usa el mover LoadDensityMap

## Compilación con modo gráfico

#### En Linux
Antes de compilar, tienes que copiar el archivo libglut.so en el directorio externo de bibliotecas:
```bash 
~/rosetta/main/source/external/lib/libglut.so
```

Después, con scons, especifica graphics como extras:
```bash
./scons.py mode=release extras=graphics -j2 rosetta_scripts
```

#### En Mac OS X
Especifica graphics como extras.
```bash
./scons.py mode=release extras=graphics -j2 rosetta_scripts
```
