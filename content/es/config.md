## III. Configuración
### Guardar la configuración en el entorno

La **configuración** de la aplicación es todo lo que puede variar entre [deploys](./codebase) (staging, producción, entorno de desarrollo, etc). Incluye:

* Credenciales para la base de datos, Memcached y otros [servicios](./backing-services)
* Credenciales para servicios externos como Amazon S3 o Twitter
* Valores para cada deploy como el nombre canónico del host correspondiente

A veces las aplicaciones guardan la configuración como constantes en el código. Esto viola twelve-factor, porque requiere **la separación estricta entre la configuración y el código**. La configuración varia bastante entre distintos despliegues y el código no.

Una prueba de fuego para saber si una aplicación tiene toda la configuración correctamente ubicada fuera del código es preguntarse si sería posible publicar la base de código como código abierto en cualquier momento sin comprometer ninguna de las credenciales.

Cabe destacar que esta definición de "configuración" **no** incluye configuración interna de la applicación, como `config/routes.rb` en Rails, o como [se conectan módulos de código](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) en [Spring](http://spring.io/). Este tipo de configuración no varia entre despliegues, así que es mejor mantenerla en el código.

Otra estrategia es utilizar archivos de configuración que no estén bajo control de versiones, como `config/database.yml` en Rails. Es mucho mejor que usar constantes ubicadas en el repo, pero también tiene sus puntos débiles: es fácil equivocarse y añadir un archivo de configuración al repo. Es fácil que los archivos de configuración se dispersen en diferentes lugares y utilicen diferentes formatos, lo que hace difícil ver y gestionar toda la configuración en un único sitio. Además, aquellos formatos suelen ser específicos para un lenguaje o framework concreto.

**Las aplicaciones twelve-factor guardan la configuración en *variables de entorno*** (lo que se en inglés se suele abreviar como *env vars* o *env*). Es más facil cambiar las variables de entorno entre despliegues sin modificar el código. A diferencia de los archivos de configuración, hay poco peligro de añadirlas al repo por accidente y, a diferencia de los archivos de configuración y otros mecanismos como las Propiedads de Sistema de Java, siguen un estándar independiente del lenguaje y del sistema operativo.

Otro aspecto a tener en cuenta al gestionar la configuración es la categorización. A veces las aplicaciones separan la configuración en categorías (frecuentemente denominadas "entornos") denominadas a partir de deploys específicos, como los entornos `development`, `test`, y `production` en Rails. Este método no escala elegantemente: a medida que se crean despliegues se crean van haciendo falta más nombres de nuevos entornos, como `staging` o `qa`. Mientras el proyecto crezca los desarrolladores terminarían agregando sus propios entornos especiales como `joes-staging`, causando una explosión combinacional de configuración que redundaría en despliegues más frágiles.

En una aplicación twelve-factor las variables de entorno son controles granulares, siendo totalmente ortogonales entre sí. Nunca se categorizan juntas como "entornos", sino que se manejan de forma independiente en cada despliegue. Este modelo escala de manera fluida a medida que se añaden despliegues nuevos durante el ciclo de vida de la aplicación.
