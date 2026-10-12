<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Se usa para configurar sistemas simétricos en los que las estructuras de entrada están alineadas a lo largo del eje x, y o z.

```xml
<SymDofMover name="(&string;)" set_sampler="(true &bool;)"
        auto_range="(false &bool;)" symm_file="(&string;)"
        sym_dof_names="(&string;)"
        sampling_mode="(single_dock &sampling_mode_choices;)"
        flip_input_about_axes="(&type_for_axes_or_zero_cslist;)"
        align_input_axes_to_symdof_axes="(&type_for_axes_cslist;)"
        radial_disps="(&string;)" radial_offsets="(&string;)"
        translation_axes="(&type_for_axes_cslist;)" angles="(&string;)"
        rotation_axes="(&type_for_axes_cslist;)"
        radial_disps_range_min="(&string;)" radial_disps_range_max="(&string;)"
        angles_range_min="(&string;)" angles_range_max="(&string;)"
        angle_steps="(&string;)" radial_disp_steps="(&string;)"
        angle_deltas="(&string;)" radial_disp_deltas="(&string;)" />
```

-   **set_sampler**: Para usar con el filtro GetRBDOFValues. Si es false, los valores de RBDOF no se actualizan cuando los valores de DOF informados no se ven afectados por SymDofMoverSampler. Por defecto es true.
-   **auto_range**: Booleano que fija cómo se interpretan los rangos de desplazamiento radial definidos por el usuario. Si es true, los valores negativos de desplazamiento mínimo o máximo se interpretan como un movimiento de la estructura hacia el origen, y los positivos como un alejamiento del origen.
-   **symm_file**: (OBLIGATORIO) Archivo de definición de simetría.
-   **sym_dof_names**: (OBLIGATORIO) Nombres de los sym_dofs del archivo de definición de simetría a lo largo de los cuales se quiere mover o rotar la entrada. NOTA: En sistemas de varios componentes, el orden de los desplazamientos, ángulos, rangos y pasos debe corresponder con el orden de sym_dof_names. Se pasa como una cadena con una lista separada por comas (por ejemplo, sym_dof_names='JTP1,JDP1')
-   **sampling_mode**: Qué modo se usa para muestrear alrededor de la configuración inicial, si se desea. 'grid', 'uniform' o 'gaussian'
-   **flip_input_about_axes**: Rota las subunidades 180 grados alrededor de los ejes indicados antes de aplicar traslaciones, rotaciones, alineamiento y simetría; es decir, «invierte» el componente antes de seguir manipulándolo.
-   **align_input_axes_to_symdof_axes**: Si se especifica, alinea el eje indicado de cada subunidad con el eje correspondiente del salto symdof del archivo de definición de simetría.
-   **radial_disps**: Desplazamiento(s) inicial(es) con el que se traslada(n) la(s) estructura(s) de entrada a lo largo del eje especificado por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, radial_disps='-65.4,109.2'). También hay que especificar translationa_axes para aplicarlos a lo largo de esos ejes.
-   **radial_offsets**: Se puede usar en cualquier modo de muestreo. Los valores de desfase se suman a los radial_disps correspondientes antes de hacer el muestreo en rejilla, uniforme o gaussiano. Funciona con auto_range. Por ejemplo, si se quiere separar 2 ångström los dos symdofs de una estructura dada, se puede pasar radial_offsets='2,2' y auto_range=true. Así, sea cual sea el signo de los radial_disps, las subunidades se desplazarán 2 ångström más lejos del origen (suponiendo que las subunidades de entrada empiezan en el origen).
-   **translation_axes**: Hay que usarlo cuando se usa radial_disps. Ejes (x, y o z) a lo largo de los cuales se traslada cada subunidad antes de aplicar la simetría.
-   **angles**: Ángulo(s) inicial(es) con el que se rota(n) la(s) estructura(s) de entrada alrededor del eje especificado por el usuario. Se pasa como una lista separada por comas (por ejemplo, angles='-65.4,109.2'). También hay que especificar los ejes de rotación (rotation axes) para aplicarlos a lo largo de esos ejes.
-   **rotation_axes**: Ejes (x, y o x) alrededor de los cuales se rota cada subunidad antes de aplicar la simetría. Hay que usarlo cuando se usa angles.
-   **radial_disps_range_min**: Para usar con muestreo en rejilla o uniforme. Distancia(s) mínima(s) en ångström con la(s) que se modifican los radial_disps iniciales. Se pasa como una cadena con una lista separada por comas (por ejemplo, radial_disps_range_min='-1,-1'.
-   **radial_disps_range_max**: Para usar con muestreo en rejilla o uniforme. Distancia(s) máxima(s) en ångström con la(s) que se modifican los radial_disps iniciales. Se pasa como una cadena con una lista separada por comas (por ejemplo, radial_disps_range_max='1,1'.
-   **angles_range_min**: Para usar con muestreo en rejilla o uniforme. Ángulo(s) mínimo(s) en grados con el que se rota la estructura alrededor del/de los ángulo(s) inicial(es) dado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, angles_range_min='-1,-1'.
-   **angles_range_max**: Para usar con muestreo en rejilla o uniforme. Ángulo(s) máximo(s) en grados con el que se rota la estructura alrededor del/de los ángulo(s) inicial(es) dado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, angles_range_max='1,1'.
-   **angle_steps**: Para usar con muestreo en rejilla. Fija el/los tamaño(s) de intervalo con el/los que se muestrea dentro del/de los rango(s) definido(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, angle_steps='0.5,0.5'.
-   **radial_disp_steps**: Para usar con muestreo gaussiano. El rango dentro del cual se muestrea hacia dentro y hacia fuera alrededor del/de los desplazamiento(s) inicial(es) especificado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, radial_disp_deltas='0.5,0.5'.
-   **angle_deltas**: Para usar con muestreo gaussiano. El rango dentro del cual se muestrea alrededor del/de los ángulo(s) inicial(es) especificado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, angle_deltas='0.5,0.5'.
-   **radial_disp_deltas**: Para usar con muestreo gaussiano. El rango dentro del cual se muestrea hacia dentro y hacia fuera alrededor del/de los desplazamiento(s) inicial(es) especificado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (por ejemplo, radial_disp_deltas='0.5,0.5'.

---
