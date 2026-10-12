# Cambios adicionales realizados después del Chemical XRW

Página creada el 9 de febrero de 2016 por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.

## Cambios en el formato PDB:
- Ahora los archivos PDB tienen registros TER al final de cada cadena (pull request #1066), y los índices de átomo se incrementan de forma adecuada después de los registros TER. Esto coincide con el estándar PDB.  El comportamiento anterior (escribir registros TER solo al final de todos los registros ATOM) se puede restaurar con la opción ```-out:file:no_chainend_ter```.
