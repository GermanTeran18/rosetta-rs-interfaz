#Convenciones de código Python para Rosetta

A medida que se escribe más y más código en Python &mdash; tanto protocolos de [[PyRosetta]] como [[otros scripts auxiliares|Tools]] &mdash; conviene que nuestro código tenga coherencia y calidad. Esta página presenta una lista de pautas y convenciones para escribir código Python en la comunidad de Rosetta.

Esta página está basada en las convenciones de código de C++; para la lista de esas convenciones, consulta: [[Coding Conventions]].

Salvo que se indique otra cosa, se deben seguir las pautas de estilo de Python presentadas en [[PEP 8|http://www.python.org/dev/peps/pep-0008/]].


[[_TOC_]]


##Convenciones
###Estructura de los archivos
Todo el código Python debe tener la siguiente estructura general de archivo:
* Encabezado
* Importaciones
* Definiciones de constantes
* Definiciones de clases y métodos
* Cuerpo principal

####Encabezado
#####Shebang
Si el código Python es un script, incluye la siguiente línea, con la ruta de Python:
```
#!/usr/bin/env python
```
Ten en cuenta que, si está presente, esta línea debe ser la primera línea del archivo, antes del encabezado de copyright, el docstring o cualquier comentario adicional.

#####Aviso de copyright
El encabezado de copyright de Rosetta Commons es obligatorio en todos los *archivos* de código fuente de Rosetta. No lo modifiques. El encabezado que debes usar en todos los archivos `.py` es:
<pre>
# (c) Copyright Rosetta Commons Member Institutions. 
# (c) This file is part of the Rosetta software suite and is made available under license. 
# (c) The Rosetta software is developed by the contributing members of the Rosetta Commons. 
# (c) For more information, see http://www.rosettacommons.org. Questions about this can be 
# (c) addressed to University of Washington CoMotion, email: license@uw.edu. 
</pre>

#####Docstring principal
Inmediatamente debajo del bloque de comentarios del aviso de copyright debe ir el "docstring" del archivo <code>.py</code>. (Consulta más sobre la [[documentación|Python-coding-conventions-for-Rosetta#documentation]] más abajo, incluido cómo [[Doxygen|http://www.stack.nl/~dimitri/doxygen/]] lee los comentarios de Python.) Este texto debe abrirse y cerrarse con un triplete de comillas dobles (<code>"""</code>). 

Incluye encabezados como "Brief:", "Params:", "Output:", "Example:", "Remarks:", "Author:", ''etc''. 

**Ejemplo:**
<pre>
"""Brief:   This PyRosetta script does blah.

Params:  ./blah.py <input_filename>.pdb <#_of_decoys>

Example: ./blah.py foo.pdb 1000

Remarks: Blah blah blah, blah, blah.

Author:  Jason W. Labonte

"""
</pre>

####Importaciones
Las instrucciones <code>import</code> van después del encabezado y antes de las constantes.

* **Importa un solo módulo por línea**:
<code>import rosetta</code>
<code>import rosetta.protocols.rigid</code>
y no
<code>import rosetta, rosetta.protocols.rigid</code>

  *  Está bien importar varias clases y/o métodos del mismo módulo en la misma línea:
<code>from rosetta import Pose, ScoreFunction</code>

* Para los espacios de nombres de Rosetta realmente largos, **usa alias de espacios de nombres**, *p. ej.*:
<code>import rosetta.protocols.loops.loop_closure.kinematic_closure as KIC_protocols</code>

* **Evita importar <code>*</code> de cualquier módulo**. Con bibliotecas grandes, como Rosetta, esto es una pérdida de tiempo y de memoria.

* **Agrupa las instrucciones <code>import</code> en el siguiente orden**, con encabezados de comentario (*p. ej.*, <code># Python standard library</code>) y una línea en blanco entre cada grupo:
  1. Módulos de la biblioteca estándar de Python
  2. Otros módulos de terceros que no son de Rosetta
  3. Módulos de Rosetta (por espacio de nombres)
  4. Tus propios módulos de Python

* **<code>rosetta.init()</code> pertenece al cuerpo principal de tu script,** no a la sección de importaciones. (Consulta [Cuerpo principal](#main-body) más abajo.)

####Constantes y variables de todo el módulo
Las constantes y variables de todo el módulo deben definirse a continuación, después de las importaciones.

* **Las constantes deben nombrarse en <code>ALL_CAPS_WITH_UNDERSCORES</code>.** (Consulta [Convenciones de nombres](#naming-conventions) más abajo.)

* **Evita usar la instrucción <code>global</code> en cualquier parte de tu código.** Todas las constantes deben tratarse como de solo lectura.

* **No definas tus propias constantes matemáticas.** Usa las que se encuentran en el módulo <code>math</code> de Python.

####Definiciones de clases y métodos
Las clases y los métodos expuestos deben ir a continuación en el código.

* **Añade dos líneas en blanco entre cada clase y método expuesto.**

* **Añade una línea en blanco entre cada método de una clase.**

* **Los docstrings de clases y métodos se indentan _debajo_ de la declaración de la clase o el método, como parte de la definición.**

* **Agrupa juntos los métodos no públicos, seguidos de los métodos compartidos.** Los métodos no públicos también deben llevar como prefijo (al menos) un guion bajo. (Consulta [Convenciones de nombres](#naming-conventions) más abajo.)

* En los métodos, **si hay demasiados argumentos en la declaración para que quepan en una sola línea, alinea los argumentos que continúan en la línea siguiente con el primer carácter del primer argumento**:
<code>def take_pose_and_apply_foo_to_its_bar_residue_n_times(pose, foo,</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bar, n):</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;"""Apply foo to the bar residue of pose n times."""</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;pass</code>

####Cuerpo principal
* Si tu código Python está pensado para usarse tanto como script como como módulo, pon
<code>if __name__ == "__main__":</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;rosetta.init()</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;my_main_subroutine(my_arg1, my_arg2)</code>
al final del archivo.

* Si tu código Python está pensado para ser solo un módulo, no incluyas <code>rosetta.init()</code>. Debe estar en el cuerpo principal del script que lo llama.

* Si tu código Python está pensado para ser solo un script, no incluyas la comprobación <code>if __name__ == "__main__":</code>.
  * (Aunque probablemente sea más inteligente escribir tu código de modo que otros scripts puedan llamar a sus métodos. Nunca se sabe cuándo querrás reutilizar una función genial.)

----

###Convenciones de nombres
Como en el código C++ de Rosetta 3, usa las siguientes convenciones de nombres:
* **Usa <code>CamelCase</code> para los nombres de clases** (y, por lo tanto, de excepciones).
  * Las clases derivadas deben indicar en su nombre el tipo de clase que son:
     * Las excepciones deben terminar en <code>Exception</code>, <code>Error</code> o <code>Warning</code>, según corresponda.
     * Los movers deben terminar en <code>Mover</code> o <code>Protocol</code>.
     * Los métodos de energía deben terminar en <code>EnergyMethod</code>.
* **Usa <code>box_car</code>, con guiones bajos que separan las palabras, para los nombres de variables y métodos.**
  * Las funciones getter/de acceso y setter por separado deben llevar el prefijo <code>get_</code> (o <code>is_</code> para las funciones que devuelven un booleano).
  * Las funciones sobrecargadas que hacen tanto get como set no necesitan prefijos. (Sin embargo, en Python, si simplemente accedes a una propiedad pública de una clase, no necesitas escribir un getter ni un setter; puedes acceder &mdash; y asignar &mdash; la propiedad directamente, *p. ej.*, <code>PyJobDistributor.native_pose = pose</code>.)

* **Usa <code>box_car</code> con guiones bajos para los espacios de nombres y directorios**, *es decir*, módulos y paquetes.
  * Para los archivos de Python, usa <code>box_car</code> con guiones bajos **incluso en módulos que contienen una sola clase**. (Esto difiere de la convención de C++ (*p. ej.*, <code>Pose.cc</code>) y se debe a que en Python los propios nombres de archivo se convierten en el espacio de nombres.)

* Está bien usar letras mayúsculas dentro de los nombres de variables y métodos para palabras que son siglas o abreviaturas, *p. ej.*, <code>HTML_parser()</code>.
  * Sin embargo, si el nombre de la variable consiste exclusivamente en una sigla o abreviatura, *no* la escribas en mayúsculas, *p. ej.*, <code>url = "http://www.rosettacommons.org"</code>, y no <code>URL = "http://www.rosettacommons.org"</code>.

* Del mismo modo, está bien usar un guion bajo para separar una sigla o abreviatura de otras palabras en los nombres de clases, *p. ej.*, <code>PyMOL_Mover</code>.

Además, las siguientes convenciones son exclusivas del código Python:
* **Usa <code>ALL_CAPS</code> con guiones bajos para las constantes.**

* **Usa <code>_box_car</code> con un guion bajo inicial para los métodos no públicos y <code>_CamelCase</code> con un guion bajo inicial para las clases no públicas.**
  * Estos no se importarán si se invoca <code>from module import *</code>.
  * Ten en cuenta que esto es lo opuesto a la convención de nombres de C++.
  * Usa un *doble* guion bajo inicial en un atributo de una clase padre para evitar conflictos de nombres con cualquier subclase.

* **Usa <code>box_car_</code> con un guion bajo final solo para evitar conflictos con palabras clave de Python**, *p. ej.*, <code>class_</code>.

* **Nunca uses <code>__box_car__</code> con guiones bajos dobles al inicio y al final;** eso está reservado para palabras clave especiales de Python, *p. ej.*, <code>__init__</code>.

* **Evita los nombres de variables de una sola letra.** Casi siempre es mejor un nombre descriptivo.
  * Las variables de una sola letra están bien para variables matemáticas o índices, *p. ej.*, <code>x, y, z, i, j, k</code>.
  * Nunca uses los caracteres l, O o I como nombres de variables de una sola letra, porque se confunden fácilmente con 1 y 0.

* **Usa <code>self</code> como nombre del primer argumento de los métodos de clase...**
  * ...a menos que sea un método de clase estático &mdash; en cuyo caso usa <code>cls</code>.

----

###Pautas de programación
####Métodos
* Python pasa automáticamente los objetos a los métodos por referencia y no por valor. Por lo tanto, **normalmente no hace falta devolver un objeto que se pasó y luego fue modificado** por el método.
  * Python pasa automáticamente los tipos primitivos a los métodos por valor.

* Como en C++, **las comprobaciones condicionales deben ocurrir dentro del método _llamado_ y no en el método que llama**, cuando sea posible. Esto ayuda a mantener las cosas un poco más modulares y además garantiza que tu método no tenga efectos secundarios malos si alguien lo llama pero olvida comprobar la condición esencial. Por ejemplo: 
En vez de
<code>if condition_exists:</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;my_method()</code>
usa
<code>my_method()</code>
donde <code>my_method()</code> comienza con
<code>if not condition_exists:</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;return</code>

####Clases y objetos
* **Evita la herencia múltiple.**

* Todas las excepciones personalizadas deben heredar de <code>Exception</code>. **No uses excepciones de tipo cadena.** (Se eliminaron en Python 2.6. Consulta [Manejo de excepciones](#exception-handling) más abajo.)
  * Como en cualquier clase, incluye un docstring. (Consulta [[Documentación|Python-coding-conventions-for-Rosetta#documentation]] más abajo.)

* **Comprueba el tipo de los argumentos que se pasan a un método de una clase de Python si es posible que ese método se llame tanto desde Python como desde C++.**
<!--TODO Check if this is still true -->
  * Cuando el código de Rosetta 3 llama a un método de Python (como un mover personalizado llamado desde un contenedor de movers de Rosetta 3), los argumentos se pasan como punteros de acceso (AP), que deben convertirse en punteros sin procesar (con el método <code>get()</code>) para que Python pueda usarlos.
  * Cuando Python llama a un método de Python, los argumentos se pasan por referencia.
  * Para evitar este problema, comprueba el tipo de cualquier argumento de tipo objeto que se pase; si son AP, llama a <code>get()</code>. Por ejemplo:
<code>class MyMover(rosetta.protocols.moves.Mover):</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;def apply(self, pose):</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if isinstance(pose, rosetta.core.pose.PoseAP):</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pose = pose.get()</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pass</code>

  * (Por comodidad, se añadió un método <code>get()</code> "ficticio" a <code>Pose</code> que devuelve la instancia del <code>Pose</code>, de modo que se pueda usar <code>pose = pose.get()</code> sin comprobar antes su tipo. Sin embargo, sería poco práctico añadir un método <code>get()</code> a cada clase de Rosetta que se quisiera usar en PyRosetta, así que ¡comprueba el tipo!)

* **Ten cuidado de no escribir <code>pose = native_pose</code> cuando en realidad quieres decir <code>pose.assign(native_pose)</code>.** Lo primero crea una copia superficial; lo segundo, una copia profunda.

####Comparaciones
* **Para comparar con singletons (<code>True</code>, <code>False</code>, <code>None</code>, una clase estática) usa <code>is</code> y no <code>==</code>**.
  * &hellip; Excepto que nunca debería hacerte falta escribir <code>if is_option_on is True:</code>; escribe <code>if is_option_on:</code> en su lugar.
  * Del mismo modo, usa <code>if not is_option_on:</code>.
  * **¡Cuidado!** Usa <code>if variable:</code> solo para booleanos; <code>if variable is not None:</code> es más seguro. (Algunos tipos de contenedor, *p. ej.*, pueden ser falsos en sentido booleano.)
     * &hellip;Así que usa <code>if not list:</code> en lugar de <code>if len(list) == 0:</code>.

* No escribas <code>if x < 10 and x > 5:</code>; **simplifícalo a <code>if 5 < x < 10:</code>.**

* **Usa <code>!=</code> en lugar de <code><></code>** por coherencia.

* **Usa <code>if my_string.startswith("foo"):</code> y <code>if my_string.endswith("bar"):</code> en lugar de <code>if my_string[:3] == "foo":</code> y <code>if my_string[-3:] == "bar"</code>. Además de que lo primero es *mucho* más fácil de leer, es más seguro.

* **Usa <code>if isinstance(object, rosetta.core.pose.Pose):</code>;** no uses <code>if type(object) is rosetta.core.pose.Pose:</code>.

####Opciones de línea de comandos
* **Usa el módulo [[argparse|http://docs.python.org/library/argparse.html#module-argparse]], no [[optparse|http://docs.python.org/library/optparse.html?highlight=optparse#optparse]].** <code>optparse</code> quedó obsoleto y fue reemplazado en Python 2.7, y <code>argparse</code> hace todo lo mismo.

####Manejo de excepciones
* **Usa bloques <code>if</code> y <code>try/except</code> para comprobar los errores que podrían ocurrir durante el funcionamiento normal del programa.** Los errores deben generar informes útiles que incluyan los valores de las variables relevantes.
  * Tus errores deben ser clases que hereden de <code>Exception</code>. (Consulta [Clases](#classes) más arriba.)

* **Usa <code>raise HugeF_ingError("Oh, crap!")</code>, en lugar de <code>raise HugeF_ingError, "Oh, crap!"</code>.** (Esto facilita dividir los mensajes de error largos en varias líneas. Además, desaparecerá en Python 3.0.)
  * Nunca escribas <code>raise "Oh, crap!"</code>; eso ya desapareció en Python 2.6.

* **Mantén al mínimo el número de líneas que se prueban en un bloque <code>try</code>.** Esto facilita aislar el problema real.
  * (Recuerda que después puedes añadir un <code>else</code> o un <code>finally</code>.)

* **Evita las cláusulas <code>except</code> sin especificar.** Dificultan aislar el problema real.
  * Si tienes una buena razón, al menos usa <code>except Exception:</code>, que es mejor que <code>except:</code> porque solo capturará excepciones de errores reales del programa; los <code>except</code> sin especificar también capturan errores de teclado y del sistema.
  * También puedes capturar varias excepciones con la misma cláusula <code>except</code>, *p. ej.*, <code>except HugeF_ingError, SneakyError:</code>.

####Métodos exclusivos de PyRosetta
* Si necesitas instanciar un contenedor <code>vector1_<of_type></code> concreto de Rosetta para usarlo en una función de Rosetta, siempre que sea posible, **usa la función constructora <code>Vector1()</code> de PyRosetta,** que toma una lista como entrada y determina qué <code>vector1_<of_type></code> hace falta.
Por ejemplo, en vez de:
<code>list_of_filenames = utility.vector1_string()</code>
<code>list_of_filenames.extend(["file1.fasta", "file2.fasta", "file3.fasta"])</code>
usa:
<code>list_of_filenames = Vector1(["file1.fasta", "file2.fasta", "file3.fasta"])</code>

* **Usa <code>pose_from_sequence()</code>** en lugar de <code>make_pose_from_sequence()</code>. (La primera asigna automáticamente a los ángulos &omega; el valor de 180&deg;.)

####Varios
* **Escribe <code>a += n</code>, no <code>a = a + n</code>.**
  * Del mismo modo, usa <code>a -= n</code>, <code>a *= n</code> y <code>a /= n</code>.

* **Usa comprensiones de listas.** Son hermosas.
  * Por ejemplo, en vez de:
<code>cubes = []</code>
<code>for x in range(10):</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;cubes.append(x**3)</code>
o:
<code>cubes = map(lambda x: x**3, range(10))</code>
usa:
<code>cubes = [x**3 for x in range(10)]</code>
(Las funciones lambda son geniales, pero el segundo ejemplo es mucho menos legible que el tercero; si tienes un <code>lambda</code> dentro de un <code>map</code>, deberías usar una comprensión de listas.)

  * También puedes usar <code>if</code> para limitar los elementos de tu lista:
<code>even_cubes = [x**3 for x in range(10) if x**3 % 2 == 0]</code>

* **Usa <code>with</code> al abrir archivos.** La gestión de contexto es más segura, porque el archivo se cierra automáticamente, incluso si ocurre un error.
Por ejemplo, en vez de:
<code>file = open("NOEs.cst")</code>
<code>constraints = file.readlines()</code>
<code>file.close()</code>
usa:
<code>with open("NOEs.cst") as file:</code>
<code>&nbsp;&nbsp;&nbsp;&nbsp;constraints = file.readlines()</code>

----

###Documentación

####Docstrings
[[Doxygen|http://www.stack.nl/~dimitri/doxygen/]] puede documentar automáticamente código Python además de código C++, pero en el caso de Python simplemente lee el atributo <code>__doc__</code> de cada módulo, clase y método. Por eso es crucial poner todos los docstrings de clases y métodos indentados *debajo* de la línea de declaración. De lo contrario, no se guardarán en la variable <code>__doc__</code> correcta. (En Python,...
<pre>
class MyClass():
    """This is my class.
    It is great.
    
    """
</pre>
...equivale a...
<pre>
class MyClass():
    __doc__ = "This is my class.\nIt is great.\n\n"
</pre>

* **Usa siempre comillas dobles en los docstrings.** Aunque Python reconoce tanto <code>"""</code> como <code>'''</code>, algunos editores de texto solo reconocen la primera.

* **Todas las clases y métodos deben contener un docstring con al menos un enunciado breve** de lo que la clase o el método es o debería hacer, respectivamente.
  * La primera oración del docstring contiene este "brief".
     * Debe caber en una línea.
     * Debe estar en la misma línea que el <code>"""</code> de apertura.
     * Si es la única línea de tu docstring, pon el <code>"""</code> de cierre en la misma línea.
     * Para las clases, debe ser una oración descriptiva/indicativa, *p. ej.*, <code>"""This class contains terpene-specific ligand data."""</code>
     * Para los métodos, debe ser una oración imperativa, *p. ej.*, <code>"""Return True if this ligand is a sesquiterpene."""</code>
  * Separados por una línea en blanco, deben seguir más detalles de la implementación de la clase o del método, que describan sobre todo los métodos clave (en las clases) y los argumentos clave y lo que se devuelve (en los métodos).
  * Aunque no es obligatorio, se recomienda incluir un ejemplo.
     * Si quieres ejemplos realmente buenos, hazlos compatibles con el módulo [[doctest|http://docs.python.org/library/doctest.html?highlight=doctest#doctest]] de Python.
  * También es útil incluir una lista de "Véase también".
  * Termina el docstring con una línea en blanco y luego el <code>"""</code> de cierre.

* Los docstrings de los scripts deben escribirse de modo que sirvan también como mensaje de ayuda/uso del script.
  * &hellip;a menos que uses el módulo [[argparse|http://docs.python.org/library/argparse.html#module-argparse]], en cuyo caso úsalo para generar los mensajes de ayuda/uso.

* Los docstrings de los módulos deben listar todas las clases y métodos públicos que exporta el módulo.

* Documenta el constructor de una clase en el docstring del método <code>__init__()</code>, no en el docstring de la clase.

####Comentarios

* **Los comentarios normalmente deben ser oraciones completas.**
  * Usa gramática, mayúsculas y puntuación correctas.
  * Usa dos espacios entre oraciones.
  * Nunca cambies entre mayúsculas y minúsculas una variable mencionada en un comentario, aunque sea la primera palabra de una oración.

* **Usa comentarios de bloque para hablar del código que sigue inmediatamente a los comentarios.**
  * No uses docstrings como sustituto de los comentarios de bloque.

* **Usa comentarios en línea (con moderación) para aclarar líneas confusas.**

----

###Estilo de programación
Como se mencionó al principio de esta página, en caso de duda, sigue [[PEP 8|http://www.python.org/dev/peps/pep-0008/]].

####Indentación
* **Usa 4 espacios para indentar,** no tabuladores.
  * (El código C++ debe usar tabuladores.)

* **Indenta 4 espacios por cada nivel de anidamiento.**

* **Indenta 4 espacios adicionales cuando los argumentos de un método deban continuar más allá de la primera línea.**
  * ...O usa espacios para alinear los argumentos.
  * Ejemplo 1:
<pre>
def take_pose_and_apply_foo_to_its_bar_residue_n_times(
        pose,
        foo,
        bar,
        n):
    """Applies foo to the bar residue of pose n times."""
    pass
</pre>
Ejemplo 2:
<pre>
def take_pose_and_apply_foo_to_its_bar_residue_n_times(pose, foo,
                                                       bar, n):
    """Applies foo to the bar residue of pose n times."""
    pass
</pre>

####Espacios en expresiones e instrucciones
Aunque en C++ hay numerosos estilos distintos para usar espacios en listas de argumentos y expresiones, [[PEP 8|http://www.python.org/dev/peps/pep-0008/]] recomienda lo siguiente (y ofrece muchos ejemplos):

* **No pongas espacios alrededor de paréntesis, corchetes ni llaves.**

* **No pongas espacios antes de comas, dos puntos ni puntos y coma.**

* **Pon un espacio alrededor de los operadores.**
  * Excepción: no pongas espacios alrededor de <code>=</code> si se usa como parte de un argumento con nombre o de la asignación de un valor por defecto en una llamada o declaración de un método, respectivamente.
  * No uses más de un espacio, por ejemplo para alinear valores cuando los nombres de las variables tienen longitudes distintas.
  * En las fórmulas matemáticas, está bien no usar espacios con los operadores de mayor prioridad, *p. ej.*, <code>y = a*x**2 + b*x + c</code>.

####Varios
* **Limita las líneas a un máximo de 79 caracteres.**
  * Python sabe continuar las líneas que aún no han cerrado sus paréntesis, corchetes o llaves. Aprovéchalo.
  * Si debes usar <code>\</code> para dividir líneas, hazlo después de cualquier operador.

* **No pongas punto y coma al final de las líneas.**

* **No uses punto y coma para combinar varias líneas.**
  * De manera similar, no pongas el cuerpo de una instrucción de bloque en la misma línea que la propia instrucción; indenta.

----

##Código de ejemplo##

[se añadirá más adelante&hellip; ~ [[labonte|https://wiki.rosettacommons.org/index.php/User:Labonte]] 20:56, 31 Aug 2012 (PDT)]

----

##Véase también
* [[Coding Conventions]] para el código C++ de Rosetta
* [[PEP 8 &mdash; Guía de estilo para código Python|http://www.python.org/dev/peps/pep-0008/]]
* [[PEP 20 &mdash; El Zen de Python|http://www.python.org/dev/peps/pep-0020/]]
* [[PEP 257 &mdash; Convenciones de docstrings|http://www.python.org/dev/peps/pep-0257/]]
