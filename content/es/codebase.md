## I. Base de código
### Una base de código, bajo control de versiones, muchos despliegues

Una aplicación de doce factores siempre está bajo un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), o [Subversion](http://subversion.apache.org/).  Una copia de la base de datos del control de versiones se conoce como *repositorio de código*, *repo de código* o simplemente *repo*.

Una *base de código* es un único repo (en una sistema de control de código centralizado como Subversion), o un conjunto de repos que comparten un commit raíz (en un sistem descentralizado como Git).

![Una base de código se corresponde con muchos despliegues](/images/codebase-deploys.png)

Siempre hay una correspondencia uno a uno entre la base de código y la aplicación:

* Si hay múltiples bases de código, no es una app -- es un sistema distribuido. Cada componente en un sistema distribuido es una aplicación, y cada una puede cumplir individualmente con los doce factores.
* Múltiples aplicaciones compartiendo el mismo código es una violación de los doce factores.  La solución es descomponer el código compartido en librerías, que pueden ser incluídas usando un [gestor de dependencias](./dependencies).

Sólo hay una base de código por aplicación, pero puede haber muchos despliegues de la app. Un *despliegue* es una instancia en ejecución de la aplicación. Una instancia, típicamente, es una página de producción y uno o más sitios de preproducción. Adicionalmente, cada desarrollador tiene una copia de la aplicación ejecutándose en su entorno local, que también cuenta como despliegue.

La base de código es compartida por todos los despliegues, aunque diferentes versiones pueden estar activas en cada despliegue. Por ejemplo, un desarrollador tiene commits que aún no han sido desplegados en preproducción; preproducción tiene commits que aún no han llegado a producción. Pero todos comparten la misma base de código, identificándolos así como diferentes despliegues de la misma aplicación.

