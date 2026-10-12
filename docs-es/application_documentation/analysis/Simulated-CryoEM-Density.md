# Datos simulados de densidad de crio-EM
# Descripción general
La herramienta `sim_cryo` simula de forma realista datos de microscopía crioelectrónica creando imágenes de proyección 2D para la reconstrucción 3D. La estructura de entrada se rota al azar y se toman imágenes de las proyecciones de cada plano. Para simular el ruido, se perturban los átomos de la imagen y se aplica ruido gaussiano a cada imagen.

# Comando de ejemplo
`sim_cryo` se usa llamando a la aplicación que está en `src/apps/public/electron_density/sim_cryo.cc`. Un comando de ejemplo sería:
```
Rosetta/bin/sim_cryo \
-NR 400 \
-gauss_multiplier 0.8 \
-resolution 4 \
-pixel_size 1 \
-box_size_multiplier 2 \
-s mypdbfile.pdb \
-ignore_zero_occupancy false \
-ignore_unrecognized_res \
-particle_wt_offset 0.2 \
-atom_gauss_random_multiplier 3
```

### Opciones
```
Common options:
-s # Input PDB for which to simulate data

-NR # Number of rotations to project. Final number of images will be 3 times NR

-resolution # Target resolution of the simulated map

-pixel_size # Pixel size of projection images

-box_size_multiplier # Size of the box of projection images

-particle_wt_offset # Offset distance of particle in projection images

-gauss_multiplier # Multiplier of gaussian noise applied to each projection image

-atom_gauss_random_multiplier # Multiplier of gaussian noise for atom perturbation

Other options:
-crystal_refine # When included with -atom_gauss_random_multiplier will scale the multiplier by B-factors provided in the input PDB

```

# Salidas
La aplicación entrega la pila de imágenes de proyección en un archivo `*.mrcs`, junto con metadatos en un archivo `*.star`. Se necesitan ambos archivos para importar las partículas en un software de reconstrucción 3D. Recomendamos cryoSPARC. Una vez importadas, se puede reconstruir un mapa 3D mediante reconstrucción ab initio y refinamiento homogéneo. **Nota:** recomendamos fijar manualmente el tamaño de píxel al importar las partículas en cryoSPARC. A veces la reconstrucción ab initio falla si lee el tamaño de píxel del archivo star.

# Modificaciones de la resolución
La resolución del mapa reconstruido final puede no coincidir con la resolución objetivo. La calidad y la resolución del mapa simulado final se pueden modificar cambiando cualquiera de las opciones anteriores, pero recomendamos cambiar `NR` o `atom_gauss_random_multiplier`. Aumentar el número de rotaciones aumenta el número total de partículas y, por tanto, probablemente mejore la resolución. Reducir el ruido gaussiano de los átomos mejora la calidad de las imágenes, lo que probablemente mejore la resolución. Para crear una variación de resolución local más realista, añade la opción `-crystal_refine` para escalar el multiplicador gaussiano de los átomos según el factor B.
