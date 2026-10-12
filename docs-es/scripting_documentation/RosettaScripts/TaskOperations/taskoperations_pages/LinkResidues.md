# LinkResidues
## LinkResidues

Especifica grupos de residuos que deben mutar juntos. Por ejemplo, si un residuo del grupo muta a Cys, todos los residuos de ese grupo mutarán a Cys. Esta TaskOperation está pensada para situaciones en las que quieres diseñar un homomultímero pero no quieres usar el modo de simetría (quizá porque tus monómeros no son geométricamente simétricos).  

### Uso:

```xml
<LinkResidues name="(&string)">
      <LinkGroup group="(&string)"/>
      ...
</LinkResidues>
```

### Opciones:

* name: Una cadena corta que puedes usar más adelante en el script para referirte a esta TaskOperation.

### Subtags:

* LinkGroup: Un grupo de residuos que deben mantener la misma identidad de aminoácido. Usa la opción ``group=(&string)`` para especificar una lista, separada por comas, de números de residuo (en numeración de Rosetta) que forman el grupo. Por ejemplo, `group="1,2"` asegura que el primer y el segundo residuo mantendrán la misma identidad. Puedes crear tantos grupos como quieras especificando varios subtags LinkGroup.

### Ejemplo:

Este script diseña una proteína según un resfile concreto, y a la vez asegura que los residuos 1 y 2 (en numeración de Rosetta) muten juntos.

```xml
<ROSETTASCRIPTS>
  <TASKOPERATIONS>
    <ReadResfile name="resfile" filename="my_resfile.res"/>
    <LinkResidues name="linkres">
      <LinkGroup group="1,2"/>
    </LinkResidues>
  </TASKOPERATIONS>
  <MOVERS>
      <PackRotamersMover name="packer" task_operations="resfile,linkres"/>
  </MOVERS>
  <PROTOCOLS>
    <Add mover_name="packer"/>
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Errores conocidos:

* Esta TaskOperation imprimirá advertencias de «singular unlinked position» y acabará causando un Segmentation Fault si hay posiciones de la proteína que se permiten para diseño pero no se especifican en ningún LinkGroup. Toda posición que quieras diseñar debe especificarse en un LinkGroup. Si una posición no debe enlazarse con nada, crea un LinkGroup que especifique solo esa posición; esto «enlazará la posición consigo misma», que es lo que quieres. 

* Todas las posiciones especificadas en los LinkGroups deben poder diseñarse (es decir, ALLAA en tu resfile o algo similar); de lo contrario obtendrás un SegmentationFault.
