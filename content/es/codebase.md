## I. Base de código
### Una sola base de código gestionada con control de versiones, y múltiples despliegues

El código de una aplicación twelve-factor siempre se gestiona con un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), o [Subversion](http://subversion.apache.org/). Una copia del código se llama *repositorio de código*, lo que se suele acortar a *repo de código* o *repo* a secas.

Una *base de código* es cualquier repo individual (en un sistema centralizado como Subversion), o cualquier conjunto de repos que comparten el mismo commit raíz (en un sistema descentralizado como Git).

![A una base de código le corresponden múltiples despliegues](/images/codebase-deploys.png)

Hay siempre una correlación uno-a-uno entre el la base de código y la aplicación:

* Si hay más que una base de código, no es una aplicación: es un sistema distribuido. Cada componente en un sistema distribuido es una aplicación, y cada una puede cumplir twelve-factor individualmente.
* Si varias aplicaciones comparten el mismo código, están violando la metodología twelve-factor. La solución en ese caso es transformar el código compartido en librerías que se pueden incluir a tráves del [gestor de dependencias](./dependencies).

Hay una sola base de código por cada aplicación, pero habrá múltiples despliegues por cada aplicación. Un *despliegue* es una instancia de la aplicación que se está ejecutando. Esto suele ser un sitio web en producción, y uno o más en staging. Además, cada desarrollador puede ejecutar una copia de la aplicación en su entorno de desarrollo local, y esto se considera también un despliegue.

La base de código es la misma en todos los despliegues, aunque cada despliegue puede tener activa una versión diferente. Por ejemplo, un desarrollador puede tener commits aún no desplegados en staging, y el entorno de staging puede tener commits aún no desplegados en producción. Sin embargo todos comparten la misma base de código y pueden considerarse diferentes deploys de la misma aplicación.
