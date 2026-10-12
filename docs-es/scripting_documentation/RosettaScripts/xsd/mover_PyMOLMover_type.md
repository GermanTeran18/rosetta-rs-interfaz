<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
PyMOLMover envía una Pose a una instancia del software de visualización molecular PyMOL que se ejecuta en el host local. Cada llamada del mover sobrescribe el objeto en PyMOL. No es tan completo como la versión integrada en PyRosetta, pero es muy útil para visualizar el flujo de un protocolo o para generar fotogramas de una película de un protocolo.

```xml
<PyMOLMover name="(&string;)" keep_history="(0 &bool;)"
        address="(127.0.0.1 &string;)" port="(65000 &port_range;)"
        max_packet_size="(7678 &max_packet_size_range;)" />
```

-   **keep_history**: Cada llamada al mover guarda la Pose en un nuevo estado o fotograma de un objeto en PyMOL, en lugar de sobrescribirlo. Después se pueden reproducir los fotogramas como una película para visualizar el flujo de un protocolo.
-   **address**: Dirección IP de la máquina que ejecuta PyMOL con el script PyMOL-RosettaServer.py en marcha.
-   **port**: Número de puerto al que se debe hacer la conexión UDP/IP.
-   **max_packet_size**: Tamaño máximo de los paquetes que se envían por la conexión UDP/IP. El valor por defecto depende de la dirección: para 127.0.0.1 se fija en 7678 y para cualquier otra dirección en 1500.

---
