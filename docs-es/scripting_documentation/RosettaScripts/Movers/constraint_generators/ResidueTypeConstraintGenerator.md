#ResidueTypeConstraintGenerator
ResidueTypeConstraintGenerator se usa junto con [[AddConstraintsMover]] para añadir restricciones de tipo de residuo a una Pose. De forma predeterminada, restringe todos los residuos a su identidad inicial. Puede usarse un selector de residuos para especificar qué residuos deben restringirse, y puede indicarse un name3 con el tipo de residuo deseado para restringir los residuos seleccionados a una identidad concreta.
```
<ResidueTypeConstraintGenerator name="(&string;)"
        favor_native_bonus="(1.0 &real;)" rsd_type_name3="(&string;)"
        use_native="(false &bool;)" residue_selector="(&string;)" />
```
favor_native_bonus: bonificación de puntuación sin ponderar que recibe la Pose por tener el tipo de residuo especificado en la posición especificada
rsd_type_name3: código de tres letras del aminoácido al que quieres restringir este residuo. Si no se especifica, se usa el aminoácido nativo de esta posición.
use_native: usa la estructura nativa (indicada con in:file:native) como Pose de referencia para definir las identidades de residuo deseadas
residue_selector: selector que especifica los residuos que se restringirán. Si no se indica, se seleccionan todos los residuos

##Véase también##
* [[AddConstraintsMover]]