## III. Configuración
### Guardar la configuración en el entorno

La **config** del app es todo lo que es probable que varie entre [deploys](./codebase) (staging, producción, entorno de desarrollo, etc). Incluye:

* Credenciales para la base de datos, Memcached y otros [servicios de apoyo](./backing-services)
* Credenciales para servicios externos como Amazon S3 o Twitter
* Valores por cada deploy como el nombre canónico del host correspondiente

De vez en cuando, los apps guardan la config como constantes en el código. Esto viola al twelve-factor, el que requiere **la separación estricta entre la config y el código**. La config varia bastante trás deploys, el código no.

Una prueba de fuego para saber si un app tiene toda la config correctamente ubicada fuera del código es considerar si el codebase se pudiera publicar como código abierto en cualquier momento, sin comprometer ninguna de las credenciales.

Fíjese que esta definición de "config" **no** incluye config interna de la applicación, como `config/routes.rb` en Rails, o como [módulos de código están conectados](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) en [Spring](http://spring.io/). Este tipo de config no varia trás deploys, así que es mejor que se quede en el código.

Una otra estrategia para config es el uso de archivos de config los cuales que no estén bajo control de versiónes, como `config/database.yml` en Rails. Esto es bastante mejor que el uso de constantes ubicadas en el repo, aunque también tiene sus puntos débiles: es facil equivocarse y agregar un archivo de config al repo; hay una tendencia para que los archivos de config queden dispersos en diferentes lugares y diferentes formatos, que dificulta ver y manejar toda la config en un sólo lugar. Además, aquellos formatos suelen ser específicos del lenguaje o del framework.

**El app twelve-factor guarda la config en *variables del entorno*** (lo que se suele acortar a *env vars* o *env*). Es más facil cambiar los env vars trás deploys sin cambiar el código; a diferencia de los archivos de config, hay poco peligro de agregarlos al repo por accidente; y a diferencia de los archivos customizados de config, u otro mecanismos como Java System Properties, son un estándar independiente de lenguaje y de sistema operativo.

Otro aspecto de manejar la config es categorización. A veces los apps separan la config en categorías (frecuentemente denominado "entornos") nombradas por deploys específicos, como los entornos `development`, `test`, y `production` en Rails. Este método no escala elegantemente; mientras más deploys del app se crean, más nombres de nuevos entornos se necesitan, como `staging` o `qa`. Mientras el proyecto siga cresciendo, desarrolladores podrán agregar sus propios entornos especiales como `joes-staging`, que resultan en una explosión combinacional de config, con éste ya hace que manejar los deploys del app sea muy frágil.

En un app twelve-factor, los env vars son controles finos, con cada siendo totalmente ortogonal uno a otro. Nunca se categorizan juntos como "entornos", sino que se manejan de forma independiente por cada deploy. Esto es un modelo que escala hacia arriba fluidamente mientras el app se amplia naturalmente con más deploys trás su vida.
