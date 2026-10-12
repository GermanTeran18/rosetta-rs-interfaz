#Referencia de la clase numeric::xyzMatrix

Descripción detallada
---------------------

xyzMatrix es una plantilla de clase de matriz de 3x3 rápida. Las funciones son inline y no tienen bucles, para lograr la máxima velocidad. El destructor se declara no virtual por velocidad, así que xyzMatrix no está preparada para usarse como clase base. Al ser una plantilla de clase, xyzMatrix puede contener distintos tipos de valor.

Las declaraciones adelantadas y los typedefs para los tipos de valor comunes se proporcionan en el archivo xyzMatrix.fwd.hh. Este encabezado debe incluirse en los archivos que solo usan los nombres de los tipos xyzMatrix (p. ej., declaraciones de funciones y funciones que solo pasan los tipos a otras funciones por puntero o por referencia).

Se proporcionan operaciones comunes que normalmente se programan con bucles, entre ellas:

right\_multiply\_by() - Multiplica por la derecha por una xyzMatrix

right\_multiply\_by\_transpose() - Multiplica por la derecha por la traspuesta de una xyzMatrix

left\_multiply\_by() - Multiplica por la izquierda por una xyzMatrix

left\_multiply\_by\_transpose() - Multiplica por la izquierda por la traspuesta de una xyzMatrix

det() - Determinante

trace() - Traza

transpose() - Traspuesta

transposed() - Copia traspuesta

Ten en cuenta que tranpose() y transposed() siguen la convención de la biblioteca según la cual la versión con 'ed' no modifica la xyzMatrix, sino que genera una xyzMatrix.

xyzMatrix ofrece varios métodos de construcción, entre ellos varios orientados a columnas o a filas: a partir de nueve elementos, a partir de uno o varios punteros a valores contiguos, o a partir de tres xyzVector.

Además, el encabezado xyz\_functions.hh contiene funciones comunes que interactúan con xyzMatrix, como:

product() - producto xyzMatrix * [[xyzVector]]

inplace\_product() - producto xyzMatrix * [[xyzVector]], en el que se modifica el [[xyzVector]] de entrada

outer\_product() - producto exterior [[xyzVector]] * [[xyzVector]]

projection\_matrix() - matriz de proyección sobre la recta que pasa por un [[xyzVector]]

rotation\_matrix() - matriz de rotación alrededor de un eje helicoidal que pasa por el origen, según un ángulo

rotation\_axis() - transformación de una matriz de rotación al eje helicoidal de rotación

eigenvalue\_jacobi() - algoritmo clásico de Jacobi para los valores propios de una matriz simétrica real

eigenvector\_jacobi() - algoritmo clásico de Jacobi para los valores propios y vectores propios de una matriz simétrica real

##Uso

1.  Para usar los tipos xyzMatrix en una función, normalmente pondrías una declaración `using` al principio de la función y luego usarías el nombre corto del typedef para declarar los objetos:

    ```
        void
        f()
        {
          using numeric::xyzMatrix_double;

         xyzMatrix_double m;        // Default constructed (uninitialized)
         xyzMatrix_double n( 0.0 ); // Constructs n = ( 0.0, 0.0, 0.0
                                                        0.0, 0.0, 0.0
                                                        0.0, 0.0, 0.0 )

         ...
         n.xx() = 1.5; // Elements can be accessed as xx(), xy(), xz(),
                                                      yx(), yy(), yz()
                                                      zx(), zy(), and zz()
        }
    ```

    Además, se puede acceder a las columnas y filas de una xyzMatrix, o asignarlas, por nombre o por un índice que empieza en 1:

    ```
        col_x(), col_y(), col_z(), col( i ) i = 1, 2, 3;
        row_x(), row_y(), row_z(), row( i ) i = 1, 2, 3;
    ```

    Puedes usar numeric::xyzMatrix en bucles accediendo a los elementos por índice:

    ```
         m( i, j ); // For rows i = 1, 2, 3 and columns j = 1, 2, 3
                    // (1-based indexing for xyzMatrix )
    ```

2.  Puedes construir una numeric::xyzMatrix a partir de nueve valores que representan las entradas de la matriz.

    Ten en cuenta que la orientación de los elementos se especifica mediante un constructor con nombre:

    ```
         // Construction from column-ordered values:
         xyzMatrix_double m( xyzMatrix_double::cols( xx_a, yx_a, zx_a,
                                                     xy_a, yy_a, zy_a,
                                                     xz_a, yz_a, zz_a ) )

         // Assignment from column-ordered values:
         xyzMatrix_double m;
         ...
         m = xyzMatrix_double::cols( xx_a, yx_a, zx_a,
                                     xy_a, yy_a, zy_a,
                                     xz_a, yz_a, zz_a );

         // Construction from row-ordered values:
         xyzMatrix_double m( xyzMatrix_double::rows( xx_a, yx_a, zx_a,
                                                     xy_a, yy_a, zy_a,
                                                     xz_a, yz_a, zz_a ) )

         // Assignment from row-ordered values:
         xyzMatrix_double m;
         ...
         m = xyzMatrix_double::rows( xx_a, yx_a, zx_a,
                                     xy_a, yy_a, zy_a,
                                     xz_a, yz_a, zz_a );
    ```

3.  Puedes construir una numeric::xyzMatrix a partir de la dirección del primer valor de una estructura de datos contigua, como un FArray o un std::vector.

    Ten en cuenta que la orientación de los elementos se especifica mediante un constructor con nombre:

    ```
        // Construction from a pointer to contiguous column-ordered values:
        xyzMatrix_double m( xyzMatrix_double::cols( pointer ) );

        // Assignment from a pointer to contiguous column-ordered values:
        xyzMatrix_double m;
         ...
        m = xyzMatrix_double::cols( pointer );

        // Construction from a pointer to contiguous row-ordered values:
        xyzMatrix_double m( xyzMatrix_double::rows( pointer ) );

        // Assignment from a pointer to contiguous row-ordered values:
        xyzMatrix_double m;
        ...
        m = xyzMatrix_double::rows( pointer );

    ```

4.  Puedes construir una numeric::xyzMatrix a partir de tres direcciones, cada una de las cuales apunta al primer valor de una estructura de datos contigua, como un FArray o un std::vector.

    Ten en cuenta que la orientación de los elementos se especifica mediante un constructor con nombre:

    ```
         // Construction from three pointers to contiguous columns:
         xyzMatrix_double m( xyzMatrix_double::cols( pointer, pointer, pointer ) );

         // Assignment from three pointers to contiguous columns:
         xyzMatrix_double m;
         ...
         m = xyzMatrix_double::rows( pointer, pointer, pointer );

         // Construction from three pointers to contiguous rows:
         xyzMatrix_double m( xyzMatrix_double::cols( pointer, pointer, pointer ) );

         // Assignment from three pointers to contiguous rows:
         xyzMatrix_double m;
         ...
         m = xyzMatrix_double::rows( pointer, pointer, pointer );
    ```


##Véase también

* [[Documentación del espacio de nombres utility|namespace-utility]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
