# Compilar Rosetta con compatibilidad con aprendizaje automático

Para tener compatibilidad con TensorFlow y Torch a la vez, sigue las instrucciones de descarga y configuración siguientes y luego compila con `extras=tensorflow,torch` (p. ej., `./scons.py -j 24 mode=release extras=tensorflow,torch`).



## Para compilar con compatibilidad con Tensorflow:

1. Descarga las bibliotecas precompiladas de Tensorflow 1.15 para tu sistema operativo desde uno de los siguientes enlaces:   
[Linux/CPU](https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-1.15.0.tar.gz) | [Linux/GPU](https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-linux-x86_64-1.15.0.tar.gz) | [Windows/CPU](https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-windows-x86_64-1.15.0.zip) | [Windows/GPU](https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-windows-x86_64-1.15.0.zip) | 
[MacOS/IntelCPU](https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-darwin-x86_64-1.15.0.tar.gz)  
(Ten en cuenta que las versiones para GPU requieren controladores CUDA; consulta la [documentación de TensorFlow](https://www.tensorflow.org/install/lang_c) para más información.)    
    p. ej., para Linux CPU:
    ```
    wget https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-1.15.0.tar.gz
    ```

2. Descomprime el archivo (zip/tar) en un directorio adecuado (aquí se usa `~/usr/local/lib/` como ejemplo) y añade las siguientes variables de entorno:

    p. ej., descomprimir con tar en el directorio del sistema (o en cualquier otro directorio que elijas)
    ```
    sudo tar -C /usr/local -xzf libtensorflow-cpu-linux-x86_64-1.15.0.tar.gz
    ```
3. Añade las siguientes variables de entorno para que apunten al nuevo directorio `lib` que se creó al extraer el archivo:

    Linux, Windows: 
    ```
    LIBRARY_PATH=$LIBRARY_PATH:~/usr/local/lib/ 
    LD_LIBRARY_PATH=$LD_LIBRARY_PATH:~/usr/local/lib/
    ```
    MacOS:
    ``` 
    LIBRARY_PATH=$LIBRARY_PATH:~/usr/local/lib/
    DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH:~/usr/local/lib/
    ```

    Si has descomprimido en un directorio del sistema (p. ej., /usr/local/lib/), también puedes enlazarlo en lugar de usar las variables de entorno, con, por ejemplo,
    ```
    sudo ldconfig /usr/local/lib

    ```

3. Edita tu archivo user.settings (`Rosetta/main/source/tools/build/user.settings`) y descomenta (es decir, quita la almohadilla del principio de) las siguientes líneas: 
    ```
    import os  
    'program_path' : os.environ['PATH'].split(':')
    'ENV' : os.environ,
    ```  

4. Compila Rosetta añadiendo extras=tensorflow (solo CPU) o extras=tensorflow_gpu (GPU) a tu comando de scons. Por ejemplo: 
    ```
    ./scons.py -j 8 mode=release extras=tensorflow bin
    ```

Nota: puedes usar tanto `extras=tensorflow` como `extras=tensorflow_gpu` con cualquiera de las versiones descargadas; no se comprueba si está conectado a la biblioteca correspondiente. Sin embargo, esto te permite tener binarios para ambas. Si tienes problemas para combinar la versión de GPU adecuada con CUDA, consulta [esta tabla](https://www.tensorflow.org/install/source#gpu).

## Para compilar con compatibilidad con Torch:

NOTA 1: Rosetta usa la biblioteca libTorch a nivel de C++, *no* PyTorch. Rosetta en línea de comandos no puede usar una versión de PyTorch instalada con Conda, pip o similares.

NOTA 2: Aunque las versiones actuales usan `extras=torch`, las versiones anteriores (incluida Rosetta 3.14) usaban `extras=pytorch`. La instalación debería ser similar, salvo por el cambio de la designación de extras y el nombre del ejecutable correspondiente.

1. Descarga Libtorch desde https://pytorch.org/get-started/locally/.
    p. ej., para la versión de cpu:
    ```
    wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.1%2Bcpu.zip -O libtorch.zip
    ```
   Por ahora, la versión de CPU de LibTorch no debe ser superior a 2.0.1, ya que las versiones posteriores requieren C++17,
   que actualmente no está configurado en la compilación de torch con scons. Esto cambiará pronto.
2. Descomprime en `rosetta/main/source/external`
    ```
    cd Rosetta/main/source
    unzip libtorch.zip -d external/ && rm libtorch.zip
    ```
3. Compila con extras=torch
    ```
    ./scons.py -j 8 mode=release extras=torch
    ```
