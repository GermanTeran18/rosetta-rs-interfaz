<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Mover de cuerpo rígido que hace rodar la Pose alrededor del eje especificado

```xml
<RollMover name="(&string;)" chain="(&positive_integer;)"
        random_roll="(false &bool;)" random_roll_angle_mag="(3.0 &real;)"
        random_roll_trans_mag="(1.0 &real;)" min_angle="(&real;)"
        max_angle="(&real;)" axis="(&char;)"
        start_res="(&refpose_enabled_residue_number;)"
        stop_res="(&refpose_enabled_residue_number;)" >
    <axis x="(&real;)" y="(&real;)" z="(&real;)" />
    <translate x="(&real;)" y="(&real;)" z="(&real;)" />
</RollMover>
```

-   **chain**: ID de la cadena del objeto que se hace rodar
-   **random_roll**: Rota y/o traslada la Pose sobre un eje o dirección aleatorios
-   **random_roll_angle_mag**: Desviación estándar de una rotación gaussiana alrededor de un eje aleatorio
-   **random_roll_trans_mag**: Desviación estándar de una traslación aleatoria gaussiana en 3D
-   **min_angle**: Ángulo mínimo de giro alrededor del eje; obligatorio si random_roll no es true
-   **max_angle**: Ángulo máximo de giro alrededor del eje; obligatorio si random_roll no es true
-   **axis**: Alrededor de qué eje (x, y o z) se hace rodar
-   **start_res**: ID del primer residuo del objeto que se hace rodar
-   **stop_res**: ID del último residuo del objeto que se hace rodar


Subetiqueta **axis**:   

-   **x**: (OBLIGATORIO) Coordenada X de este vector
-   **y**: (OBLIGATORIO) Coordenada Y de este vector
-   **z**: (OBLIGATORIO) Coordenada Z de este vector

Subetiqueta **translate**:   

-   **x**: (OBLIGATORIO) Coordenada X de este vector
-   **y**: (OBLIGATORIO) Coordenada Y de este vector
-   **z**: (OBLIGATORIO) Coordenada Z de este vector

---
