# Cómo trabajar con D-aminoácidos en Rosetta
Documentación de Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu).  Creada el 19 de marzo de 2014.  Última modificación: 21 de septiembre de 2016.

## Resumen breve
Rosetta admite por completo los 19 D-aminoácidos que son imágenes especulares de los 19 L-aminoácidos canónicos, y estos son totalmente funcionales con las funciones de puntuación **talaris2013**, **talaris2014** y **beta_nov15**.  Esta página contiene información sobre cómo activar estos tipos de residuo y sobre cómo trabajar con otros D-aminoácidos con cadenas laterales no canónicas.

## ¿Qué son los D-aminoácidos?
Los D-alfa-aminoácidos son aminoácidos con la quiralidad invertida en el carbono alfa respecto a los L-alfa-aminoácidos convencionales.  Por convención, las versiones en imagen especular de los 19 aminoácidos quirales canónicos reciben los mismos nombres (la D-tirosina es la imagen especular de la L-tirosina, por ejemplo).  En su mayor parte, los D-aminoácidos no se incorporan a las proteínas naturales, ya que el ribosoma traduce los D-residuos de forma muy ineficiente.  (Hay algunos casos especiales en los que la modificación enzimática postraduccional de ciertas proteínas de la pared celular bacteriana produce algunos D-residuos.)

Hay dos casos especiales en los que tenemos que ser cuidadosos con las definiciones: los dos aminoácidos canónicos que también tienen un centro quiral en la cadena lateral (L-treonina y L-isoleucina) tienen este centro quiral invertido también en sus formas D, de modo que la D-treonina es la verdadera imagen especular de la L-treonina y la D-isoleucina es la verdadera imagen especular de la L-isoleucina.  (Invertir solo la cadena lateral produce L-_alo_-treonina y L-_alo_-isoleucina, mientras que invertir solo el centro quiral de la cadena principal produce D-_alo_-treonina y D-_alo_-isoleucina.)

La forma sencilla de determinar si un alfa-aminoácido es un D-aminoácido o un L-aminoácido es imaginar que sostienes la amida de la cadena principal con la mano izquierda y el carbonilo de la cadena principal con la derecha, con el carbono alfa apuntando hacia delante (como si sostuvieras una varilla de zahorí).  Si la cadena lateral apunta hacia _arriba_, tienes un L-aminoácido.  Si la cadena lateral apunta hacia _abajo_, tienes un D-aminoácido.

## ¿Cómo puedo habilitar los D-aminoácidos en Rosetta?
Rosetta considera «no canónicos» los residuos de D-aminoácidos.  Internamente, los objetos ResidueType de D-aminoácidos se generan automáticamente reflejando sus homólogos L-aminoácidos; no hace falta ninguna entrada separada por parte del usuario.  Por defecto, el _packer_ de Rosetta, que se usa para la optimización de rotámeros de cadenas laterales y para el diseño de secuencias, no diseña con D-aminoácidos, pero se pueden activar con el comando «NC» (de «non-canonical», no canónico) en un resfile.

## ¿Cómo gestiona Rosetta la puntuación de los D-aminoácidos?
En el caso de los 19 D-aminoácidos «canónicos» (es decir, los D-aminoácidos que son imágenes especulares de los 19 L-aminoácidos canónicos), todos los términos de las funciones de puntuación **talaris2013**, **talaris2014** y **beta_nov15**, así como el término **cart_bonded**, usan la información estadística y de puntuación de los L-aminoácidos correspondientes, reflejando los términos apropiados para garantizar que las estructuras en imagen especular se puntúen y se minimicen de forma idéntica.  Para ahorrar memoria, la información de la base de datos cargada para los términos **fa_dun**, **p_aa_pp**, **cart_bonded** y **rama** de los L-aminoácidos se reutiliza (con el reflejo adecuado) para los D-aminoácidos correspondientes, de modo que no se duplica innecesariamente.

En el caso de los D-aminoácidos «no canónicos», algunos términos actualmente pueden no gestionarlos bien.  Entre ellos:
* **pro_close** (No sabe reconocer D-aminoácidos no canónicos «de tipo prolina», como la D-hidroxiprolina.)
* **cart_bonded** (Que yo sepa, no conoce la geometría ideal de los no canónicos.)
* **rama** y **rama_prepro** (Ignoran por completo los no canónicos, a menos que se incluya la línea **BACKBONE_AA** en el archivo `.params`, y esta línea actualmente solo permite especificar L-aminoácidos canónicos.)
* **p_aa_pp** (Ignora por completo los no canónicos, a menos que se incluya la línea **BACKBONE_AA** en el archivo `.params`, y esta línea actualmente solo permite especificar L-aminoácidos canónicos.)
* **fa_dun** (Esto _sí_ puede puntuar correctamente D-no canónicos, si se le proporciona una biblioteca de rotámeros previamente reflejada para la versión D del no canónico)

_PÁGINA AÚN EN CONSTRUCCIÓN_
