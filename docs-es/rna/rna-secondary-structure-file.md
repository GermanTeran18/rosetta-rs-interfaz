# Archivo de estructura secundaria de ARN
# Fundamentos
+ Usa la notación de puntos y paréntesis.
+ Puede usar paréntesis (`(`,`)`), corchetes (`[`,`]`) y llaves (`{`,`}`).
+ Después de la primera línea, puedes poner lo que quieras.

#Ejemplos
# Sencillo
```
(....()....)
ucagguaagcag
```
en `demos/public/RNA_Denovo/chunk002_1lnt_.secstruct`.

# Complejo
Para el ribozima GIR1 (RNA puzzle5):
```
(((((..((((((.(((((((((.......))))))))).((((((((((((((......(((((...((((((((((....))))....)).))))((....)).....[[[[[...))))).((((...)))))))))))))...]]]]].((((....))))....))))).))))))..)))))
gguuggguugggaaguaucauggcuaaucaccaugaugcaaucggguugaacacuuaauuggguuaaaacggugggggacgaucccguaacauccguccuaacggcgacagacugcacggcccugccucuuagguguguucaaugaacagucguuccgaaaggaagcauccgguaucccaagacaauc
```
en `tests/integration/tests/rna_puzzle5_P15P3P8_noP4P6_4RB_G208phosphate_ligation/GIR1_secstruct.txt`

# Véase también
* [[rna-denovo]]: aplicación principal donde se usa este formato de archivo.
* [[RNA applications]]: La página de inicio de las aplicaciones de ARN
