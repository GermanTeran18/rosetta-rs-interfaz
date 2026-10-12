# Documentación de Rosetta en español

Traducción al español de la documentación de Rosetta
([RosettaCommons/documentation](https://github.com/RosettaCommons/documentation), commit `2d05ebc`):
las 2338 páginas, con la misma estructura de carpetas que el original. Empieza por [Home.md](Home.md).

## Diagramas

Cuatro diagramas interactivos para los conceptos centrales. Se abren en el navegador:

| Diagrama | Qué muestra |
|---|---|
| [Monte Carlo](figuras/monte-carlo.html) | Cómo decide Rosetta si acepta un cambio: `p = e^(−ΔE/kT)` sobre una curva de energía |
| [Función de puntuación](figuras/funcion-de-puntuacion.html) | El total como suma de peso × energía de los términos de `ref2015` |
| [Packer](figuras/packer.html) | Elegir un rotámero por posición con recocido simulado |
| [Pose](figuras/pose.html) | Cambiar un ángulo mueve todo lo que cuelga de él según el FoldTree |

## Qué queda en inglés, a propósito

- **Código:** bloques de código, comandos, opciones, XML de RosettaScripts y nombres de clases y movers. Incluye tablas
  que el original pone dentro de bloques de código, como la de términos de energía de
  `rosetta_basics/scoring/score-types.md`.
- **Citas:** referencias bibliográficas, con autores, títulos de artículos y revistas.
- **Licencia:** [LICENSE.md](LICENSE.md) se mantiene en el original en inglés, que es el texto con validez legal.
  Hay una [traducción no oficial](LICENCIA-traduccion-no-oficial.md) solo como ayuda.

## Limitaciones conocidas

- **Enlaces del wiki:** las páginas usan la sintaxis de wiki de Gollum (`[[texto|Página]]`), que GitHub no muestra
  como enlace. El original se lee igual.
- **Anclas de sección:** los títulos están traducidos y los enlaces conservan su destino original, así que algunos
  saltos a una sección concreta (`Página#titulo`) no llevan al lugar exacto.

## Cómo se tradujo y cómo comprobarlo

- [REGLAS-DE-TRADUCCION.md](REGLAS-DE-TRADUCCION.md) fija la voz (español neutro, de tú), lo que no se traduce y el
  glosario.
- `verificar_traduccion.py` compara cada página con su original: bloques de código idénticos, mismos destinos de
  enlaces, mismo número de títulos y texto que parezca sin traducir.

  ```sh
  python3 verificar_traduccion.py <carpeta del original>
  ```

  Hoy da 2317 de 2338 páginas sin avisos. Las 21 restantes son falsos positivos: páginas donde lo que queda en inglés
  son citas, código con sangría o nombres de atributos, y una página cuyo original tiene una valla de código mal
  cerrada.

## Licencia

Es una obra derivada de la documentación de Rosetta y hereda su licencia no comercial ([LICENSE.md](LICENSE.md)).
Los diagramas de `figuras/` son trabajo nuevo de este fork y están bajo la misma licencia.
