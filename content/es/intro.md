Introducción
============

En la era moderna el software se suele ofrecer como servicio, a través de las llamadas *aplicaciones web*, o *software-as-a-service*. Twelve-factor es una metodología para construir aplicaciones software-as-a-service que:

* Usan formatos **declarativos** para automatizar el setup inicial, con el objetivo de minimizar el tiempo y coste cuando nuevos desarrolladores se incorporan al proyecto.
* Tienen un **contrato claro** con el sistema operativo, ofreciendo **máxima portabilidad** entre entornos de ejecución.
* Son adecuadas para **despliegues** en **plataformas en la nube**, evitando la necesidad de tener servidores y administrar sistemas.
* **Minimizan las diferencias** entre desarrollo y la producción, habilitando **despliegues contínuos** para maximizar la agilidad.
* Y pueden **escalar** sin cambios significativos en las herramientas, la arquitectura y las prácticas del desarrollo.

La metodología twelve-factor se puede aplicar a aplicaciones escritas en cualquier lenguaje de programación, y que usan cualquier combinación de servicios externos (bases de datos, colas, cachés en memoria, etc).
