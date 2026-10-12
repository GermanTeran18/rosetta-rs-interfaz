# VLB
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## VLB (también llamado Variable Length Build)

¡En desarrollo! Todo el mérito es de Andrew Ban, del laboratorio Schief, por hacer posible insertar, eliminar y reconstruir segmentos de longitud variable. ¡Este mover SOLO funciona con segmentos que no se solapan!

**¡¡¡NOTA IMPORTANTE!!!** : VLB lleva su propio conteo interno de ntrials. Esto permite a VLB guardar fragmentos en caché entre ntrials, lo que ahorra una cantidad muy significativa de tiempo. Pero cada trayectoria de ntrial recibirá además ntrials llamadas internas adicionales a apply de VLB. Por ejemplo, "-jd2:ntrials 5" provocará un máximo de 25 ejecuciones de VLB (5 por cada ntrial). Si un movimiento de VLB tiene éxito, se sale de este bucle interno y la trayectoria continúa con normalidad.

```xml
<VLB name="(&string)" scorefxn="(string)">
    <VLB TYPES GO HERE/>
</VLB>
Default scorefxn is score4L. If you use another scorefxn, make sure the chainbreak weight is > 0. Do not use a full atom scorefxn with VLB!
```

VLB dispone de varios tipos de movimiento, cada uno con sus propias opciones. Los más populares probablemente serán SegmentRebuild y SegmentInsert.

```

<SegmentInsert left=(&integer) right=(&integer) ss=(&string) aa=(&string) pdb=(&string) side=(&string) keep_bb_torsions=(&bool)/> 

Insert a pdb into an existing pose. To perform a pure insertion without replacing any residues within a region, use an interval with a zero as the left endpoint.
e.g. [0, insert_after_this_residue].
If inserting before the first residue the Pose then interval = [0,0].  If inserting after the last residue of the Pose then interval = [0, last_residue]. 

*ss = secondary structure specifying the flanking regions, with a character '^' specifying where the insert is to be placed. Default is L^L.
*aa = amino acids specifying the flanking regions, with a character '^' specifying insert.
*keep_bb_torsions = attempt to keep the a few torsions from around the insert. This should be false for pure insertions. (default false)
*side = specifies insertion on its N-side ("N"), C-side ("C") or decide randomly between the two (default "RANDOM"). Random is only random on parsing, not per ntrial
```

```

<SegmentRebuild left=(&integer) right=(&integer) ss=(&string) aa=(&string)/> 
Instruction to rebuild a segment. Can also be used to insert a segment, by specifying secondary structure longer than the original segment.
```

```
Very touchy. Watch out.
<SegmentSwap left=(&integer) right=(&integer) pdb=(&string)/> instruction to swap a segment with an external pdb
```

```xml
<Bridge left="(&integer)" right="(&integer)" ss="(&string)" aa="(&string)"/> connect two contiguous but disjoint sections of a
                       Pose into one continuous section
```

```xml
<ConnectRight left="(&integer)" right="(&integer)" pdb="(&string)"/> instruction to connect one PDB onto the right side of another
```

```xml
<GrowLeft pos="(&integer)" ss="(&string)" aa="(&string)"/> Use this for n-side insertions, but typically not n-terminal
            extensions unless necessary.  It does not automatically cover the
            additional residue on the right endpoint that needs to move during
            n-terminal extensions due to invalid phi torsion.  For that case,
            use the SegmentRebuild class replacing the n-terminal residue with
            desired length+1.
```

```xml
<GrowRight pos="(&integer)" ss="(&string)" aa="(&string)"/> instruction to create a c-side extension
```

Para más información, consulta las distintas BuildInstructions en src/protocols/forge/build/

# Movers de «maduración de afinidad» computacional (muy experimentales)

Estos movers sirven para tomar un complejo existente y mejorarlo cambiando sutilmente todos los grados de libertad relevantes mientras se optimizan las interacciones de las cadenas laterales clave con la diana. La idea básica es llevar a cabo iteraciones de relax y diseño de la proteína de unión, diseñando una esfera amplia de residuos alrededor de la interfaz (para captar efectos de segunda y tercera capa).

Empezamos generando interacciones de residuos de alta afinidad entre el diseño y la diana. El FoldTree del diseño se corta de modo que cada residuo de la diana tenga un corte en sus extremos N y C, se introducen saltos desde la proteína diana hacia los residuos de la diana en el diseño, y luego se deja relajar el sistema. Esto produce diseños deformados con interacciones de alta afinidad con la superficie de la diana. Después usamos las coordenadas de los residuos de la diana para generar restricciones armónicas de coordenadas y las enviamos a un segundo ciclo de relax, esta vez sin deformar la cadena principal del diseño. Hay ejemplos de scripts disponibles en demo/rosetta\_scripts/computational\_affinity\_maturation/


##Véase también

* [[I want to do x]]: Guía para elegir un mover
