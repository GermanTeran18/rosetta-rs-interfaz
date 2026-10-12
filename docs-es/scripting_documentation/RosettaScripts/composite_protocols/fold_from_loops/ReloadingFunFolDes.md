# Recargar FunFolDes

# El problema
Supongamos que has ejecutado **FunFolDes** y has obtenido _25 decoys candidatos_ que merecen más atención. Para seguir adecuadamente con la optimización de esos diseños puedes optar por tratarlos como decoys normales y avanzar, o puede que quieras _conservar las condiciones y restricciones_ de **FunFolDes**. Esto significaría fijar el tipo de residuo de los `HOTSPOTS`, así como la posición correlativa entre los distintos segmentos de un **motivo**.  
Para ello, hay dos contenidos principales que necesitamos recargar en el _rosettascript_ siguiente:

1.  **LABELS:** Para mantener el mismo nivel de control que antes, necesitamos recargar las etiquetas de residuos tal como estaban.
2.  **WORKING FOLDTREE:** Esto es específico de los **motivos** de varios segmentos. En los **motivos** de un solo segmento, el `FOLDTREE` cargado del silent file ya es el funcional, pero en los **motivos** de varios segmentos, el [[NubInitioLoopClosureMover]] debería haberse encargado de cerrar las roturas de la estructura y de configurar el `FOLDTREE` correcto para una estructura completamente cerrada. Por tanto, hay que recargar el `WORKING_FOLDTREE` original para asegurarse de que los distintos segmentos del **motivo** se mantengan en su sitio.

# Movers necesarios
Para recargar las **LABELS** en el Pose, basta con usar el [[LabelPoseFromResidueSelectorMover]] con el atributo especial `from_remark`:

```xml
<LabelPoseFromResidueSelectorMover name="relabel" from_remark="1" />
```

Para recargar el **WORKING_FOLDTREE**, se usará el [[AtomTreeMover]], por ejemplo así:

```xml
<AtomTree name="retree" update_residue_variants="1" from_remark="WORKING_FOLDTREE" />
```

Con solo añadir estos dos movers al principio de tus `PROTOCOLS` debería bastar para recargar todos los datos necesarios y mantener las condiciones requeridas de una ejecución clásica de **FunFolDes**.