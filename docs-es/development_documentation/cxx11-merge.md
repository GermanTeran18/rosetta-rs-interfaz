<!--- BEGIN_INTERNAL -->
(Este es un correo archivado, escrito originalmente por Andy Watkins.)

Hice un montón de modernizaciones que tocan un montón de archivos. Voy a describir el mismo proceso que esbocé en la discusión del PR, con comandos concretos de git -- plagiados sin vergüenza de una guía anterior sobre beautification. También lo describiré con palabras para que este TIPO de estrategia resulte intuitivo. La idea es que el historial de master desde que creaste tu rama tiene ahora dos tipos distintos de partes, y por eficiencia conviene considerarlas por separado. 

La mayor parte del historial de master consiste en commits que es poco probable que toquen tus archivos, pero que probablemente implican algún cambio semántico. Las grandes transformaciones automáticas -- beautification, modernización -- es muy probable que toquen los archivos de prácticamente todo el mundo, pero convenientemente puedes reproducir exactamente la misma transformación tú mismo, en tus archivos, o (en teoría) elegir ignorarla. Así que tratas con seriedad la primera parte del historial de master, resuelves cualquier conflicto con la modernización confiando en tu reproducción, y luego tratas con seriedad el resto del historial de master.

1) Fusiona en tu rama la revisión de master que precedió inmediatamente a la modernización
> git merge c2abaa4

2) Resuelve en este punto cualquier conflicto entre tu rama y master. ¡Los conflictos aquí son reales! No los descartes.

[OPCIONAL: 3) Moderniza tu rama, si de verdad quieres: ¡da igual si es manual o automático! La [documentación](http://clang.llvm.org/extra/clang-tidy/index.html#using-clang-tidy)de `clang-tidy` se explica por sí sola, pero puedo ofrecer algunas sugerencias. En particular, usa todas las comprobaciones de modernize, y nada más: algunas de las comprobaciones de rendimiento no funcionan muy bien en nuestra base de código y traen dolores de cabeza.]

4) Fusiona en tu rama la única revisión de master en la que SE modernizó, usando la opción -Xours.
> git merge -Xours 01a57f1

5) Fusiona en tu rama el resto de master. Todos los conflictos generados a partir de este punto son reales y deben tratarse con cuidado.
`> git merge master`

<!-- SEO:
cxx11
c++11
merge
-->

<!--- END_INTERNAL -->
