#RBOutMover

[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; Christopher Norn; ch.norn@gmail.com ;PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Resumen
###En breve 

Este mover se usa para construir una base de datos de coordenadas de jump entre la cadena ligera variable y la cadena pesada variable de anticuerpos. Después, la base de datos de coordenadas de jump se usa en el modelado de anticuerpos ([ABpredict](https://www.ncbi.nlm.nih.gov/pubmed/27717001)) y en el diseño de anticuerpos ([ABdesign](https://onlinelibrary.wiley.com/doi/full/10.1002/prot.24779)) para muestrear distintas orientaciones Vl/Vh. El PDB de plantilla debe ser el mismo PDB que se usó para construir la base de datos de coordenadas de [[SpliceOutAntibody]]. El PDB de entrada (-s) es aquel del que se copian las coordenadas de jump.

```xml
<RBOut name="(&string;)" template_fname="(&string;)" jump_dbase_fname="(&string;)" jump_from_foldtree="(false &bool;)" />
```


-   **template_fname**: el archivo PDB de referencia usado para construir la base de datos
-   **jump_dbase_fname**: archivo de la base de datos de coordenadas de jump
-   **jump_from_foldtree**: si es true, obtiene el jump del fold tree y no automáticamente de la rotura de cadena del Pose (por defecto)

---

##Ejemplo
Por ahora este mover solo es accesible a través de RosettaScripts. 
A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
<RBOut name="rbo" template_fname="template.pdb" jump_dbase_fname="test.db" jump_from_foldtree="0" />
```