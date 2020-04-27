## V. Construir, distribuir, ejecutar
### Separar completamente la etapa de construcción de la etapa de ejecución

El [código base](./codebase) se transforma en un despliegue (que no es de desarrollo) al completar las siguientes tres etapas:

* La *etapa de construcción* es una transformación que convierte un repositorio de código en un paquete ejecutable llamado *construcción* (una "build"). En la etapa de construcción se traen todas las [dependencias](./dependencies) y se compilan los binarios y las herramientas usando una versión concreta del código correspondiente a un commit especificado por el proceso de despliegue.
* En la *fase de distribución* se usa la construcción creada en la fase de construcción y se combina con la [configuración](./config) del despliegue actual. Por tanto, la *distribución* resultante contiene tanto la construcción como la configuración y está lista para ejecutarse inmediatamente en el entorno de ejecución.
* La *fase de ejecución* (también conocida como "runtime") ejecuta la aplicación en el entorno de ejecución, lanzando un conjunto de [procesos](./processes) de una distribución concreta de la aplicación.

![El código se convierte en una construcción, que se combina con la configuración para crear una distribución.](/images/release.png)

**Las aplicaciones "twelve-factor" hacen una separación completa de las fases de construcción, de distribución y de ejecución.** Por ejemplo, es imposible hacer cambios en el código en la fase de ejecución, porque no hay una manera de propagar dichos cambios a la fase de construcción.

Las herramientas de despliegue ofrecen, normalmente, herramientas de gestión de distribuciones (releases). La capacidad de volver a una versión anterior es especialmente útil. Por ejemplo, la herramienta de despliegues [Capistrano](https://github.com/capistrano/capistrano/wiki) almacena distribuciones en un subdirectorio llamado `releases`, donde la distribución actual es un enlace simbólico al directorio de la distribución actual. Su mandato `rollback` hace fácil y rápidamente el trabajo de volver a la versión anterior.

Cada distribución debería tener siempre un identificador único de distribución, como por ejemplo una marca de tiempo (timestamp) de la distribución (`2011-04-06-20:32:17`) o un número incremental (como `v100`). Las distribuciones son como un libro de contabilidad, al que solo se le pueden agregar registros y no pueden ser modificados una vez son creados. Cualquier cambio debe crear una nueva distribución.

Cada vez que un desarrollador despliega código nuevo se crea una construcción nueva de la aplicación. La fase de ejecución, en cambio, puede suceder automáticamente, por ejemplo, cuando se reinicia un servidor, o cuando un proceso termina inesperadamente siendo reiniciado por el gestor de procesos. Por tanto, la fase de ejecución debería mantenerse lo más estática posible, ya que evita que una aplicación en ejecución pueda causar una interrupción inesperada, en mitad de la noche, cuando no hay desarrolladores a mano. La fase de construcción puede ser más compleja, ya que los errores siempre están en la mente de un desarrollador que dirige un despliegue.
