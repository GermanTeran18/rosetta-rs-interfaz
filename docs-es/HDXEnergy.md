# Energía HDX

Creadores:
* Tung Nguyen
* Daniel Marzolf
* Justin Seffernick
* Sten Heinze
* Investigador principal: Steffen Lindert (lindert.1@osu.edu)

Fecha de creación: 22 de febrero de 2022

Usa datos de intercambio hidrógeno-deuterio (HDX) medidos por resonancia magnética nuclear (RMN) para evaluar información estructural de proteínas y complementar los métodos computacionales de predicción con una función de puntuación que cuantifica la concordancia con los datos de HDX.

Referencia: https://doi.org/10.1016/j.str.2021.10.006

### Categórico

Usa categorías de intensidad que corresponden a las tasas de HDX (en lugar de las tasas de intercambio cuantitativas) para puntuar.

### Cuantitativo

Usa factores de protección (PF) cuantitativos de HDX-RMN para puntuar.

### Uso

Para usar la aplicación, se pueden especificar las siguientes opciones de línea de comandos: 

```
-in:file:s 1a2p_A.pdb
-in::file::HDX 1a2p_pf.txt
-ResPF
-out::file::o 1a2p_test.out

```

### Ejemplo

```
./HDXEnergy.linuxgccrelease -in:file:s 1a2p_A.pdb -in::file::HDX 1a2p_pf.txt -out::file::o 1a2p_test.out -ResPF           
```

