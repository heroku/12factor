## V. Build, lanzar, ejecutar
### Separar estrictamente las etapas de build y ejecutar

Un [codebase](./codebase) se transforma en un deploy (si no es del desarrollo) en tres etapas:

* La *etapa de build* es una transformación que convierte un repo de código en un paquete ejecutable conocido como un *build*. Usando una versión del código de un commit especificado por el proceso de lanzamiento, la etapa de build trae y "vendoriza" las [dependencias](./dependencies) y compila binarios y activos.
* La *etapa de lanzar* toma el build producido por la etapa de build y lo une con la [config](./config) del deploy actual. El *release* resultante contiene el build y la config y está listo para ejecutar inmediatamente en el entorno de ejecución.
* La *etapa de ejecutar* (tambien conocido como el "runtime") se pone en marcha el app en el entorno de ejecución, prendiendo algunos de los [procesos](./processes) del app con un release determinado.

![El código de transforma en un build, que se une con la config para crear un release.](/images/release.png)

**El app twelve-factor tiene una separación estricta entre las etapas de build, lanzar, y ejecutar.** Por ejemplo, es imposible efectuar cambios en el código durante del runtime, porque no habría cómo propagar aquellos cambios de vuelta hacia la etapa de build.

Las herramientas de lanzamiento se suelen contar con habilidades de manejar un release, en particular la habilidad de retroceder a un release anterior. Por ejemplo, la herramienta de lanzamiento [Capistrano](https://github.com/capistrano/capistrano/wiki) guarda los releases en un subdirectorio que se llama `releases`, donde el release actual es un enlace simbólico a su directorio correspondiente. Su comando `rollback` facilita retroceder rapidamente a un release anterior.

Cada release siempre debe tener un identificador único, por ejemplo un sello de tiempo del release (como `2011-04-06-20:32:17`) o un número que se auto-incrementa (como `v100`). Un conjunto de releases es un libro mayor que solo se permite añadir archivos, y un release no se puede mutar después de crear. Cualquier cambio debe generar un nuevo release.

Un build se inicia por los desarrolladores del app en cualquier momento que hay que lanzar nuevo código. Ejecutar, por el contrario, puede ocurrir automaticamente en casos como un reinicio del servidor, o si el gestor de procesos se reinicia a un proceso que se ha bloqueado. Entonces, la etapa de ejecutar debería tener lo mínimo posible de complicaciones, porque un problema que no deja al app ejecutar puede causar problemas en medio de la noche cuando no hay desarrolladores presente. La etapa de build puede ser mas complicado, porque los errores están siempre visibles para el desarrollador quien supervisa el deploy.
