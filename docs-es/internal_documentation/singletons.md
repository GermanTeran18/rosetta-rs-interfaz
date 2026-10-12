Singletons
==========

6/10/2014, actualizado el 13/9/2016

Una clase singleton X ahora debe hacer lo siguiente:
1) usando CRTP, derivar públicamente de <code> utility::SingletonBase< X > </code>

2) definir una función privada, <code> static function X * create_singleton_instance(); </code>

3) declarar <code> class utility::SingletonBase< X > </code> como friend, de modo que
    (y nadie más) pueda llamar a create_singleton_instance()
  

La clase SingletonBase define la función <code> static X * get_instance() </code> y se encarga
de crear la instancia de forma segura para hilos. El puntero instance_
pertenece a la clase base.
    
Los singletons, salvo ciertas excepciones explícitas (el JobDistributor, el ResourceManager),
no deben contener datos específicos de un trabajo.
