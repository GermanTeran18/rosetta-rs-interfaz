El formato Grishin es un formato de alineamiento múltiple de secuencias propio de Rosetta.  Se usa principalmente con la aplicación [[partial_thread|RosettaCM]] de Rosetta.  Cada par plantilla/objetivo se especifica en 6 líneas con el siguiente formato:

    ## hsIGF 1k3dA_renum
    #
    scores_from_program: 0
    0 KVTVDTVCKRGFLIQMSGHLECKCEND-VLVNEETCEEKVLKCDE
    0 AVTVDTICKNGQLVQMSNHFKCMCNEGLVHLSENTCEEKN-CKKE
    --

En lo anterior, las líneas '##', '#' y 'scores_from_program: 0' _deben_ estar presentes.  En la línea '##' debe haber dos identificadores.  El primero identifica el «nombre del objetivo» y el segundo identifica el «nombre de la plantilla».  Rosetta no usa el _nombre del objetivo_, mientras que el _nombre de la plantilla_ se usa tanto para la entrada como para los nombres de salida:
* Los cinco primeros caracteres se usan para identificar qué PDB de entrada se va a alinear.
* El nombre completo se usa para el archivo de salida

* primera secuencia = secuencia objetivo
* segunda secuencia = secuencia de la plantilla

**Nota:** La aplicación pondrá el .pdb de tu plantilla.  No debes tenerlo en el archivo de alineamiento. 

**Nota:**  Los archivos de salida se llamarán como el nombre correspondiente del archivo de alineamiento Grishin. Además, este nombre debe tener al menos 5 caracteres. Si el nombre en el archivo de alineamiento es el mismo que el nombre de tu archivo de entrada, **¡el archivo de entrada se sobrescribirá!** Por eso se recomienda usar "XXXXX_thread" en el archivo de alineamiento, donde 'XXXXX.pdb' es el archivo pdb de la plantilla; la aplicación **partial_thread** producirá entonces XXXXX_thread.pdb.

Pueden concatenarse varios alineamientos en un único archivo:

    ## hsIGF 1k3d.templ
    #
    scores_from_program: 0
    0 KVTVDTVCKRGFLIQMSGHLECKCEND-VLVNEETCEEKVLKCDE
    0 AVTVDTICKNGQLVQMSNHFKCMCNEGLVHLSENTCEEKN-CKKE
    --
    ## hsIGF 1y12.templ
    #
    scores_from_program: 0
    0 DVTVETVCKRGNLIQRSG---CKCENDLVLVNHETCEEKVLKCDL
    0 AVTVDTICKNGQLVQMSNHFKCMCNEGLVHLSENTCEEKN-CKKE
    --
Los alineamientos múltiples deben escribirse en el _mismo_ archivo de alineamiento.

Si tu alineamiento empieza en una posición distinta de la plantilla, puedes cambiar los números de la izquierda del formato o añadir - donde haga falta.

    ## 1xxx 1yyy
    # hhsearch
    scores_from_program: 1.0 0.0
    7 AAAAAAA
    0 AAAAAAA
    --

Como alternativa, puedes añadir al archivo ali los residuos del extremo N-terminal sin alinear:

    ## 1xxx 1yyy
    # hhsearch
    scores_from_program: 1.0 0.0
    0 AAAAAAAAAAAAAA
    0 -------AAAAAAA
