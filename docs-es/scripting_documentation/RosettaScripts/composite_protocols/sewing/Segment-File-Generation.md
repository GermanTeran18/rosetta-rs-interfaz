#Generación de archivos de segmentos
Si buscas la documentación antigua de SEWING sobre cómo generar archivos de modelos, consulta la página [[Generación de modelos|Model Generation ]].


----------------------
###Crear un archivo de motivos
Los archivos de motivos definen qué tipo de estructuras secundarias quieres extraer de tus archivos de entrada.
Cada línea define un motivo nuevo y se escribirá como su propio archivo de segmentos. Cada motivo contiene el código DSSP junto con el número mínimo y máximo de residuos permitidos para cada estructura secundaria, separados por espacios. Los motivos compuestos por varias unidades de estructura secundaria se separan con comas. 

Por ejemplo, un motivo compuesto por segmentos hélice-loop-hélice, con hélices de un mínimo de 5 residuos y un máximo de 20 residuos, conectadas por loops de un máximo de 5 residuos, se definiría así: ```H 5 20, L 1 5, H 5 20```

Se permiten los siguientes códigos DSSP: ```H``` (hélice), ```L``` (loop), ```E``` (hebra), ```N``` (cualquiera), ```U``` (no hélice), ```Y``` (no loop) y ```R``` (no hebra)

----------------------
###Usar la aplicación segment_file_generator

La aplicación segment_file_generator requiere dos argumentos de línea de comandos: ```motif_file``` (ver arriba) y ```pdb_list_file```. El ```pdb_list_file``` es un archivo de texto que enumera las rutas de los archivos pdb, separadas por un carácter de nueva línea. Los archivos de estructura se pueden consultar en la base de datos de proteínas del RCSB o en fuentes como la [base de datos Top 8000](http://kinemage.biochem.duke.edu/research/top8000/) del laboratorio Richardson o el [servidor PISCES](http://dunbrack.fccc.edu/PISCES.php) del laboratorio Dunbrack.

La aplicación también admite un argumento opcional, ```strict_dssp_changes``` (por defecto true). **NOTA 26/07/2018: Actualmente hay un error en la aplicación que hace que falle salvo que esta opción se establezca en false.** Cuando ```strict_dssp_changes``` es true, no se reconocen los elementos de estructura secundaria de un solo residuo, lo que permite (por ejemplo) que las hélices con torceduras se traten como un solo elemento en lugar de como varios elementos.

Ejemplo de ejecución:
```sh
./segment_file_generator.default.xxx -database ~/Rosetta/main/database/ -ignore_unrecognized_res -pdb_list_file pdbs.txt -motif_file motifs.txt
```

Recomendamos encarecidamente usar la opción ```-ignore_unrecognized_res```, salvo que tus archivos de entrada ya hayan sido depurados correctamente.

----------------------
###Combinar archivos de segmentos

Aunque no se recomienda por falta de validación, es posible generar estructuras de SEWING con varios motivos. Por ejemplo, podrías usar un archivo de segmentos que contenga tanto estructuras HLH como HLELH para generar una estructura alfa+beta. Para ello, basta con combinar los dos archivos de segmentos:

```sh
cp smotifs_H_1_100_L_1_100_H_1_100.segments HLH_HLELH_combined_segment_file.segments && cat smotifs_H_1_100_L_1_100_E_1_100_L_1_100_H_1_100.segments >> HLH_HLELH_combined_segment_file.segments
```


##Véase también
* [[SEWING]] La página principal de SEWING
* [[SEWING Dictionary]]
* [[Model comparison with geometric hashing]]

