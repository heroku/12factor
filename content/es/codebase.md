## I. Codebase
### Un solo codebase mantenido en control de versiones, muchos deploys

Un app twelve-factor está siempre mantenido en un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), o [Subversion](http://subversion.apache.org/). Una copia del codebase se llama el *code repository*, lo que se suele acortar a *code repo* o solo *repo*.

Un *codebase* es cualquier repo individual (en un sistema centralizado como Subversion), o cualquier conjunto de repos, los cuales que comparten el mismo commit raíz (en un sistema decentralizado como Git).

![A un codebase le corresponde muchos deploys](/images/codebase-deploys.png)

Hay siempre una correlación uno-a-uno entre el codebase y el app:

* Si hay más que un codebase, no es un app -- es un sistema distribuido. Cada componente en un sistema distribuido es un app, y cada uno se puede cumplir individualmente con twelver-factor.
* Si múltiples apps comparten el mismo código, eso viola al twelve-factor. La solución en aquel caso es transformar el código compartido en unas bibliotecas, las que se puede incluir a tráves del [dependency manager](./dependencies).

Hay un solo codebase por cada app, pero habrán múltiples deploys por cada app. Un *deploy* es una instancia del app que está en marcha. Esto suele ser una página en producción, y uno o más páginas en staging. Adicionalmente, cada desarrollador tiene una copia en marcha del app en su entorno local, cada uno de los cuales se califica también como un deploy.

El codebase es lo mismo trás todos los deploys, aunque puede ser que diferentes versiones estén activas en cada deploy. Por ejemplo, tal vez un desarrollador tenga commits aún no lanzado al staging; y el staging tenga algunos commits aún no lanzado al producción. Pero todos comparten el mismo codebase, asi que se pueden identificar como diferentes deploys del mismo app.

