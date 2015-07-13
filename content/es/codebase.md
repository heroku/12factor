## I. Base de código
### Una base de código, bajo control de versiones, muchos despliegues

Una aplicación de doce factores siempre está bajo un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), o [Subversion](http://subversion.apache.org/).  Una copia de la base de datos del control de versiones se conoce como *repositorio de código*, *repo de código* o simplemente *repo*.

Una *base de código* es un único repo (en una sistema de control de código centralizado como Subversion), o un conjunto de repos que comparten un commit raíz (en un sistem descentralizado como Git).

![Una base de código se corresponde con muchos despliegues](/images/codebase-deploys.png)

Siempre hay una correspondencia uno a uno entre la base de código y la aplicación:

* Si hay múltiples bases de código, no es una app -- es un sistema distribuido. Cada componente en un sistema distribuido es una aplicación, y cada una puede cumplir individualmente con los doce factores.
* Múltiples aplicaciones compartiendo el mismo código es una violación de los doce factores.  La solución es descomponer el código compartido en librerías, que pueden ser incluídas usando un [gestor de dependencias](./dependencies).

There is only one codebase per app, but there will be many deploys of the app.  A *deploy* is a running instance of the app.  This is typically a production site, and one or more staging sites.  Additionally, every developer has a copy of the app running in their local development environment, each of which also qualifies as a deploy.

The codebase is the same across all deploys, although different versions may be active in each deploy.  For example, a developer has some commits not yet deployed to staging; staging has some commits not yet deployed to production.  But they all share the same codebase, thus making them identifiable as different deploys of the same app.

