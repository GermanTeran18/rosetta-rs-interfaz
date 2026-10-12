#Referencia de la clase numeric::xyzVector

Descripción detallada
---------------------

xyzVector es una plantilla de clase de vector rápido de 3 coordenadas ( x, y, z ). Las funciones son inline y no tienen bucles, para lograr la máxima velocidad. El destructor se declara no virtual por velocidad, así que xyzVector no está preparada para usarse como clase base. Al ser una plantilla de clase, xyzVector puede contener distintos tipos de valor.

Las declaraciones adelantadas y los typedefs para los tipos de valor comunes se proporcionan en el archivo xyzVector.fwd.hh. Este encabezado debe incluirse en los archivos que solo usan los nombres de los tipos xyzVector (p. ej., declaraciones de funciones y funciones que solo pasan los tipos a otras funciones por puntero o por referencia).

Se proporcionan operaciones comunes que normalmente se programan con bucles, entre ellas:
```
normalize()

normalize_or_zero() - Zero xyzVector if length is zero

normalize_any() - Arbitrary normalized xyzVector if length is zero

project_normal() - Project normally onto input xyzVector

project_parallel() - Project in direction of input xyzVector

distance() - Distance between two xyzVectors

distance_squared() - Distance squared between two xyzVectors

dot(), dot_product(), inner_product() - dot or inner product of two xyzVectors

cross(), cross_product() - cross product of two xyzVectors

midpoint() - midpoint between two xyzVectors.
```

Muchas operaciones también tienen versiones con 'ed'; p. ej., `normalize()` y `normalized()`, que no modifican el xyzVector, sino que generan un xyzVector.

Además, el encabezado xyz\_functions.hh contiene funciones comunes que interactúan con xyzVector, como:

```
product() - xyzMatrix * xyzVector product

inplace_product() - xyzMatrix * xyzVector product, input xyzVector is modified

outer_product() - xyzVector * xyzVector outer product

projection_matrix() - projection matrix onto the line through an xyzVector

dihedral() - dihedral (torsion) angle with respect to four positions in a chain

rotation_matrix() - rotation matrix about a helical axis through the origin through an angle

rotation_axis() - transformation from rotation matrix to helical axis of rotation

eigenvalue_jacobi() - classic Jacobi algorithm for the eigenvalues of a real symmetric matrix

eigenvector_jacobi() - classic Jacobi algorithm for the eigenvalues and eigenvectors of a real symmetric matrix
```

##Uso

1.  Para usar los tipos xyzVector en una función, normalmente pondrías una declaración `using` al principio de la función y luego usarías el nombre corto del typedef para declarar los objetos:

   ```
   void
   f()
   {
          using numeric::xyzVector_double;

          xyzVector_double r; // Default constructed (uninitialized)
          xyzVector_double s( 0.0 ); // Constructs s = ( 0.0, 0.0, 0.0 )
          xyzVector_double t( 1.0, 2.0, 3.0 ); // Constructs t = ( 1.0, 2.0, 3.0 )

          ...
          t.x() = 1.5; // Elements can be accessed as x(), y(), and z()
   }
   ```

2.  También puedes construir un xyzVector a partir de la dirección del primer valor de una estructura de datos contigua, como un FArray o un std::vector:


   ```
          xyzVector_double const pos_ij( &position(1,i,j) ); // position(1-3,i,j)
   ```

   Puedes usar xyzVector en bucles accediendo a los elementos por índice:

   ```
          v( i ); // For i = 1, 2, 3   (1-based indexing for xyzVector )
          v[ i ]; // For i = 0, 1, 2   (0-based indexing for xyzVector )
   ```

##Véase también

* [[Documentación del espacio de nombres utility|namespace-utility]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
