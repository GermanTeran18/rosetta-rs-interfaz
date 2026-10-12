[[include:mover_SwitchMover_type]]

Este mover ofrece la opción de elegir entre varios movers distintos que se le proporcionan.

En combinación con `-parser:script_vars`, básicamente permite que un solo script tenga comportamientos distintos según el mover seleccionado para ejecutarse. Así, algo como esto (suponiendo que `minimize`, `minimize_pack` y `fastdesign` son los nombres de tres movers ya declarados):

``` 
<SwitchMover name="switch" movers="minimize,minimize_pack,fastdesign" selected="%%protocol%%" />
``` 

permitirá llamar a uno u otro según las circunstancias desde fuera del script.  
El valor añadido es que el nombre del mover seleccionado se añade como una puntuación al scorefile/silent file. El nombre de esa puntuación será el nombre del mover. Así, en el caso anterior, podríamos obtener una nueva puntuación llamada `switch` con un valor igual al nombre del `%%protocol%%` solicitado

