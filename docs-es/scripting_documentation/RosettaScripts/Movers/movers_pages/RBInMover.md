#RBInMover

[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; Christopher Norn; ch.norn@gmail.com ;PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Resumen
###En breve 

Este mover se usa para muestrear distintas orientaciones de la cadena ligera variable y la cadena pesada variable en el modelado de anticuerpos ([ABpredict](https://www.ncbi.nlm.nih.gov/pubmed/27717001)) y en el diseño de anticuerpos ([ABdesign](https://onlinelibrary.wiley.com/doi/full/10.1002/prot.24779)). La base de datos se crea con el [[RBOutMover]].

```xml
<RBIn name="(&string;)" rigid_body_dbase="(&string;)"
        from_entry="(1 &non_negative_integer;)"
        to_entry="(1 &non_negative_integer;)" randomize="(true &bool;)"
        db_entry="(&string;)"
        modify_foldtree="(true &bool;)" />
```

-   **rigid_body_dbase**: ruta al archivo de base de datos con las orientaciones Vl/Vh.
-   **from_entry**: limita el rango de la base de datos del que se muestrea 
-   **to_entry**: limita el rango de la base de datos del que se muestrea 
-   **randomize**: muestrea al azar de la base de datos.
-   **db_entry**: selecciona una entrada concreta de la que muestrear
-   **modify_foldtree**: si es true, fija un nuevo fold tree con un jump entre Vl/Vh

---


##Ejemplo
Por ahora este mover solo es accesible a través de RosettaScripts. 
A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
<RBIn name="rb" rigid_body_dbase="rb.db" db_entry="1AHW"/>
```