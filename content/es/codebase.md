## I. Base de código
### Una base de código, bajo control de versiones, muchos despliegues

Una aplicación de doce factores siempre está bajo un sistema de control de versiones, como [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), o [Subversion](http://subversion.apache.org/).  Una copia de la base de datos del control de versiones se conoce como *repositorio de código*, *repo de código* o simplemente *repo*.

A *codebase* is any single repo (in a centralized revision control system like Subversion), or any set of repos who share a root commit (in a decentralized revision control system like Git).

![One codebase maps to many deploys](/images/codebase-deploys.png)

There is always a one-to-one correlation between the codebase and the app:

* If there are multiple codebases, it's not an app -- it's a distributed system.  Each component in a distributed system is an app, and each can individually comply with twelve-factor.
* Multiple apps sharing the same code is a violation of twelve-factor.  The solution here is to factor shared code into libraries which can be included through the [dependency manager](./dependencies).

There is only one codebase per app, but there will be many deploys of the app.  A *deploy* is a running instance of the app.  This is typically a production site, and one or more staging sites.  Additionally, every developer has a copy of the app running in their local development environment, each of which also qualifies as a deploy.

The codebase is the same across all deploys, although different versions may be active in each deploy.  For example, a developer has some commits not yet deployed to staging; staging has some commits not yet deployed to production.  But they all share the same codebase, thus making them identifiable as different deploys of the same app.

