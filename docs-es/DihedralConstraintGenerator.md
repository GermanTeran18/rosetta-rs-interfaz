# DihedralConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Descripción general de DihedralConstraintGenerator

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Un generador de restricciones que crea restricciones diedras para residuos especificados mediante un selector de residuos.
 Usa restricciones CircularHarmonic, porque no existe una función CircularGaussian. 
 Por defecto, trabaja con los diedros de la cadena principal de proteínas y carbohidratos (véase la opción dihedral); sin embargo, se pueden definir DIEDROS ARBITRARIOS PERSONALIZADOS. 
  Consulta las etiquetas dihedral_atoms y dihedral_residues para definir un diedro personalizado. Alternativamente, puedes establecer cualquier DIEDRO ARBITRARIO
 con la opción 'dihedral_angle' (esta opción está en grados). 

 Solo funciona con UN tipo de ángulo diedro, para permitir una personalización completa.

Referencias e información de autoría del generador de restricciones DihedralConstraintGenerator:

Autor(es) del ConstraintGenerator DihedralConstraintGenerator:
Jared Adolf-Bryfogle, Institute for Protein Innovation [jadolfbr@gmail.com]  (creó DihedralConstraintGenerator).

```xml
<DihedralConstraintGenerator name="(&string;)" dihedral="(&string;)"
        sd="(&real;)" dihedral_angle="(&string;)" dihedral_atoms="(&string;)"
        dihedral_residues="(&string;)" residue_selector="(&string;)" />
```

-   **dihedral**: el diedro canónico que se establece. Por ahora solo se aceptan diedros de la cadena principal. Funciona para proteínas y carbohidratos
-   **sd**: la desviación estándar usada para la función CircularHarmonic. El valor por defecto es 16 grados, obtenido al promediar la desviación estándar de todos los ángulos diedros PHI o PSI de cada clúster de CDR North (anticuerpos) (los CDR son los loops principales de los anticuerpos). Es una restricción bastante estricta que permite cierto movimiento sin cambiar mucho la estructura global.
-   **dihedral_angle**: el ángulo diedro deseado; debe estar en grados.
-   **dihedral_atoms**: lista de nombres de átomos separados por comas. CUATRO átomos usados para calcular un diedro personalizado. También se debe indicar dihedral_residues.
-   **dihedral_residues**: lista de números de residuo separados por comas. Deben ser CUATRO residuos para definir un diedro personalizado. Véase la definición de resnum en RosettaScripts. Numeración de Rosetta o del Pose (por ejemplo, 23 o 42A). También se aceptan rangos. Son completamente arbitrarios y NO tienen que estar en orden. También se debe indicar dihedral_atoms.
-   **residue_selector**: . El nombre de un selector de residuos declarado previamente o una expresión lógica con `AND`, `NOT` (!), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades tradicionales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `s1 or s2 and not s3`, que seleccionaría un residuo si fue seleccionado por s1 o si fue seleccionado por s2 pero no por s3.

##Véase también

* [[DistanceConstraintGenerator]]
* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]
* [[Formato de archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]
