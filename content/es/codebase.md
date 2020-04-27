## I. Código base (Codebase)
### Un código base sobre el que hacer el control de versiones y multiples despliegues

Una aplicación "twelve-factor" se gestiona siempre con un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), o [Subversion](http://subversion.apache.org/). A la copia de la base de datos de seguimiento de versiones se le conoce como un *repositorio de código*, a menudo abreviado como *repo de código* o simplemente *repo*.

El *código base* es cualquier repositorio (en un sistema de control de versiones centralizado como Subversion), o cualquier conjunto de repositorios que comparten un commit raíz (en un sistema de control de versiones descentralizado como Git).

![El código base se usa en muchos despliegues](/images/codebase-deploys.png)

Siempre hay una relación uno a uno entre el código base y la aplicación:

* Si hay multiples códigos base, no es una aplicación -- es un sistema distribuido. Cada componente en un sistema distribuido es una aplicación, y cada uno, individualmente, puede cumplir los requisitos de una aplicación "twelve-factor".
* Compartir código en varias aplicaciones se considera una violación de la metodología "twelve factor". La solución en este caso es separar el código compartido en librerías que pueden estar enlazadas mediante un [gestor de dependencias](./dependencies).

El código base de la aplicación es único, sin embargo, puede haber tantos despliegues de la aplicación como sean necesarios. Un *despliegue* es una instancia de la aplicación que está en ejecución. Normalmente, se ejecuta en un entorno de producción, y uno o varios entornos de pruebas. Además, cada desarrollador tiene una instancia en su propio entorno de desarrollo, los cuales se consideran también como despliegues.

El código base es el mismo en todos los despliegues, aunque pueden ser diferentes versiones en cada despliegue. Por ejemplo, un desarrollador tiene algunos commits sin desplegar en preproducción; preproducción tiene algunos commits que no están desplegados en producción. Pero todos ellos comparten el mismo código base, de este modo todos son identificables como diferentes despliegues de la misma aplicación.
