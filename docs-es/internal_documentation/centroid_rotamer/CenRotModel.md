# Modelo de rotámeros de centroide 

El modelo de rotámeros de centroide (Centroid Rotamer Model) agrega rotámeros al modelo estándar de centroides para representar mejor las cadenas laterales.
- Autor: Yuan Liu (wendao@uw.edu) (si necesitas más información o encuentras algún problema al usarlo, contáctame, ¡gracias!)
- última actualización: 8/4/2015

[[_TOC_]]

# Idea básica

Para cada aminoácido, agrupamos el centro de masa de los átomos pesados de la cadena lateral en grupos de rotámeros. Luego calculamos el valor medio y la desviación estándar de la longitud de enlace CEN-CB, el ángulo de enlace CEN-CB-CA y el ángulo de torsión CEN-CB-CA-N para cada bin de phi/psi usando el método de rotámeros de todos los átomos de Dunbrack.

# Cómo usarlo

Primero, agrega -corrections:score:cenrot a tu línea de comandos para cargar la biblioteca de rotámeros de centroide (este parche debería arreglarse después de la refactorización de Rocco, pero todavía no está completamente hecho)

La forma más sencilla de usar el modelo CenRot es rosetta_scripts; puedes cambiar fácilmente de tipo de residuo con
```
<SwitchResidueTypeSetMover name="to_cenrot" set="centroid_rot"/>
```

Los movers típicos, como el packer, el minimizador, etc., deberían funcionar correctamente.

# Ejemplo de código

La última versión está en mi rama (yuan/cenrot_hybird) y se fusionará en master muy pronto.
Si quieres usarlo en tu código, consulta pilot/wendao/cenrot_jd2.cc

## CenRotRepackMover
reempaquetado normal
## CenRotRelaxMover
reempaquetado + minimización (aumentando gradualmente el vdw)
## CenRotRigidBodyRelaxMover
reempaquetado + minimización (cadena principal fija)
## CenRotCanonicalMover
reempaquetado + gaussiana de la cadena principal
## CenRotDockingMover
cuerpo rígido + reempaquetado
## SmoothFragRepackMover
inserción de fragmentos + reempaquetado
## RepackMinCenrotMover
reempaquetado + minimización (solo cadena lateral)
## MinCenrotMover
minimización cartesiana o en torsión

# Función de puntuación
\Hay varias funciones de puntuación CenRot distintas optimizadas para propósitos diferentes
- score3_cenrot: para muestreo basado en fragmentos + reempaquetado
- score4_cenrot_repack: para reempaquetado de la cadena principal nativa
- score4_cenrot_design: para diseño de la cadena principal nativa
- score4_cenrot_relax: reempaquetado + minimización en el espacio de torsión
- score4_cenrot_relax_cart: reempaquetado + minimización en el espacio cartesiano
- score4_cenrot_cartmin.wts: minimización en el espacio cartesiano (vdw más alto)

# Pendiente

más protocolos específicos de CenRot
