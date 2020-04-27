## III. Configuración
### Guardar la configuración en el entorno

La configuración de una aplicación es todo lo que puede variar entre [despliegues](./codebase) (entornos de preproducción, producción, desarrollo, etc), lo cual incluye:

* Recursos que manejan la base de datos, Memcached, y otros ["backing services"](./backing-services)
* Credenciales para servicios externos tales como Amazon S3 o Twitter
* Valores de despliegue como por ejemplo el nombre canónico del equipo para el despliegue

A veces las aplicaciones guardan configuraciones como constantes en el código, lo que conduce a una violación de la metodología "twelve-factor", que requiere una **estricta separación de la configuración y el código**. La configuración varía sustancialmente en cada despliegue, el código no.

La prueba de fuego para saber si una aplicación tiene toda su configuración correctamente separada del código es comprobar que el código base puede convertirse en código abierto en cualquier momento, sin comprometer las credenciales.

Hay que resaltar que la definición de "configuración" **no** incluye las configuraciones internas de la aplicación, como `config/routes.rb` en Rails, o como [se conectan los módulos](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) en [Spring](http://spring.io/). Este tipo de configuraciones no varían entre despliegues, y es por eso que están mejor en el código.

Otra estrategia de configuración es el uso de ficheros de configuración que no se guardan en el control de versiones, como ocurre con el `config/database.yml` de Rails. Esto supone una gran mejora con respecto a las constantes que se guardan en el repositorio, aunque todavía tiene ciertas debilidades: es fácil guardar un fichero de configuración en el repo por error; se tiende a desperdigar los ficheros de configuración en diferentes sitios y con distintos formatos, siendo más difícil la tarea de ver y gestionar toda la configuración en un solo sitio. Además, el formato tiende a ser específico del lenguaje o del framework.

**Las aplicaciones "twelve-factor" almacenan la configuración en *variables de entorno*** (abreviadas normalmente como *env vars* o *env*). Las variables de entorno se modifican fácilmente entre despliegues sin realizar cambios en el código; a diferencia de los ficheros de configuración, en los que existe una pequeña posibilidad de que se guarden en el repositorio de código accidentalmente; y a diferencia de los ficheros de configuración personalizados u otros mecanismos de configuración, como los System Properties de Java, son un estándar independiente del lenguaje y del sistema operativo.

Otro aspecto de la gestión de la configuración es la clasificación. A veces, las aplicaciones clasifican las configuraciones en grupos identificados (a menudo llamados "entornos" o "environments") identificando después despliegues específicos, como ocurre en Rails con los entornos `development`, `test`, y `production`. Este método no escala de una manera limpia: según se van creando despliegues de la aplicación, se van necesitando nuevos entornos, tales como `staging` o `qa`. Según va creciendo el proyecto, los desarrolladores van añadiendo sus propios entornos especiales como `joes-staging`, resultando en una explosión de combinaciones de configuraciones que hacen muy frágil la gestión de despliegues de la aplicación.

En una aplicación "twelve-factor", las variables de entorno son controles granulares, cada una de ellas completamente ortogonales a las otras. Nunca se agrupan juntas como "entornos", pero en su lugar se gestionan independientemente para cada despliegue. Este es un modelo que escala con facilidad según la aplicación se amplía, naturalmente, en más despliegues a lo largo de su vida.
