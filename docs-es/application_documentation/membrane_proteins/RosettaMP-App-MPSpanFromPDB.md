# Aplicación de RosettaMP: Span From PDB (MPSpanFromPDB)

## Código y demo
La aplicación de spanfile a partir de PDB se encuentra en `Rosetta/main/source/src/apps/public/mp_span_from_pdb.cc` 

Una demo de MPSpanFromPDB se encuentra en `Rosetta/demos/protocol_captures/mp_span_from_pdb`

Revisión de Rosetta n.º 58069

## Antecedentes
La mayoría de las aplicaciones de RosettaMP requieren un spanfile. Si se conoce la estructura de la proteína, el spanfile se puede calcular a partir de ella siempre que la estructura esté transformada a coordenadas de membrana. La aplicación considera que los residuos entre -15 <= z <= 15 están en la membrana cuando forman parte de un elemento de estructura secundaria, según lo predice el DsspMover de Rosetta. Además, los tramos deben tener al menos 3 residuos de longitud, ya que a veces Dssp predice varias hélices cortas para un único tramo. Esto también significa que hélices más cortas, como las hélices de poro de los canales de potasio, se consideran un tramo. Asimismo, la distancia a lo largo del eje z entre el residuo inicial y el final del tramo debe ser de al menos 5 Angstrom; de lo contrario, el tramo se considera anfipático y se descarta. Los tramos más cortos con hasta 3 residuos de loop entre ellos (como codos o loops cortos) se conectarán si la dirección del tramo es la misma (topología dentro/fuera o fuera/dentro) en AMBOS tramos. Si las direcciones de los dos tramos son antiparalelas, los tramos no se conectarán, porque se consideran tramos distintos. 

**Nota:** aunque la aplicación es mucho mejor que la implementación anterior, hay un par de aspectos que conviene tener en cuenta. (1) La identificación de un tramo depende de Dssp. Esto significa que, si Dssp calcula una estructura secundaria incorrecta (es decir, predice un loop donde hay una hélice), puede que un tramo no se identifique bien. Aunque es muy raro que no se identifiquen tramos completos, sí ocurre que en algunos casos se predicen demasiado cortos. ¡Revisa siempre tu spanfile! (2) Las proteínas de membrana son muy diversas y las hélices cortas no tienen por qué atravesar completamente la membrana. Si en un caso hay muchas hélices cortas en una sola hoja de la membrana, el centro de membrana que identifica Rosetta puede estar ligeramente desplazado, ya que considera el centro de los tramos. Al ejecutar una aplicación, visualiza la membrana y comprueba que sea correcta. 

## Ejecutar la aplicación

Asegúrate de que tu proteína esté transformada al marco de coordenadas de membrana antes de ejecutar esta aplicación. Puedes hacerlo con la base de datos PDBTM, el servidor TMDET, la base de datos OPM o el servidor PPM. Después ejecuta 

```
Rosetta/main/source/bin/mp_span_from_pdb.macosclangrelease \
-in:file:s 1AFO_tr.pdb \
```

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::thickness <Real>` | Mitad del grosor de la membrana usado para crear los spanfiles. Sobrescribe el grosor predeterminado de 15A (la membrana tiene 30A de grosor)|

## Cita
Revisión de Rosetta n.º 57715

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol; 11(9).

Koehler Leman J, Mueller BK, Gray JJ (2017). Expanding the toolkit for membrane protein modeling in Rosetta. Bioinformatics; 33(5).

## Contacto

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

