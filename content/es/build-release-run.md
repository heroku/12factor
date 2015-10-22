## V. Build, lanzamiento y ejecución
### Separar estrictamente las etapas de build y ejecución

Una [base de código](./codebase) se transforma en un despliegue (si no es de desarrollo) en tres etapas:

* La *etapa de build* es una transformación que convierte un repo de código en un paquete ejecutable conocido como un *build*. Usando una versión del código de un commit especificado por el proceso de lanzamiento, la etapa de build trae y "vendoriza" las [dependencias](./dependencies) y compila binarios y activos.
* La *etapa de lanzamiento* toma el build producido por la etapa de build y lo une con la [configuración](./config) del despliegue actual. La *release* resultante contiene el build y la configuración y está lista para ejecutarse inmediatamente en el entorno de ejecución.
* La *etapa de ejecución* (tambien conocido como el "runtime") pone en marcha la aplicación en el entorno de ejecución, arrancando algunos de los [procesos](./processes) de la aplicación con una release determinada.

![El código se transforma en un build, que se une con la configuración para crear una release.](/images/release.png)

**Una aplicación twelve-factor tiene una separación estricta entre las etapas de build, lanzamiento, y ejecución.** Por ejemplo, es imposible efectuar cambios en el código desde el runtime, porque no habría manera de retro-propagarlos hacia la etapa de build.

Las herramientas de lanzamiento se suelen contar con funcionalidades para manejar una release, en particular la habilidad de retroceder a una release anterior. Por ejemplo, la herramienta [Capistrano](https://github.com/capistrano/capistrano/wiki) guarda las releases en un subdirectorio llamado `releases`, donde la release actual es un enlace simbólico a su directorio correspondiente. Su comando `rollback` facilita retroceder rapidamente a una release anterior.

Cada release siempre debe tener un identificador único, por ejemplo la hora de la release (como `2011-04-06-20:32:17`) o un número que se auto-incrementa (como `v100`). Un conjunto de releases es un libro mayor en que sólo se permite añadir archivos, y una release no se puede mutar después de crearla. Cualquier cambio debe generar una nueva release.

Un build se inicia por los desarrolladores de la aplicación en cualquier momento en el que se necesita lanzar nuevo código. La ejecución, por el contrario, puede ocurrir automáticamente en casos como un reinicio del servidor, o si el gestor de procesos reinicia a un proceso que se ha bloqueado. Entonces, la etapa de ejecución debería tener las mínimas complicaciones posibles, porque un problema que no permite ejecutar la aplicación puede causar problemas en medio de la noche cuando no hay desarrolladores presentes. La etapa de build puede ser más complicada, porque los errores están siempre visibles para el desarrollador que supervisa el despliegue.
