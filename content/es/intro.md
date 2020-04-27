Introducción
============

En estos tiempos, el software se está distribuyendo como un servicio: se le denomina *web apps*, o *software as a service* (SaaS). "The twelve-factor app" es una metodología para construir aplicaciones SaaS que:

* Usan formatos **declarativos** para la automatización de la configuración, para minimizar el tiempo y el coste que supone que nuevos desarrolladores se unan al proyecto;
* Tienen un **contrato claro** con el sistema operativo sobre el que trabajan, ofreciendo la **máxima portabilidad** entre los diferentes entornos de ejecución;
* Son apropiadas para **desplegarse** en modernas **plataformas en la nube**, obviando la necesidad de servidores y administración de sistemas;
* **Minimizan las diferencias** entre los entornos de desarrollo y producción, posibilitando un **despliegue continuo** para conseguir la máxima agilidad;
* Y pueden **escalar** sin cambios significativos para las herramientas, la arquitectura o las prácticas de desarrollo.

La metodología "twelve-factor" puede ser aplicada a aplicaciones escritas en cualquier lenguaje de programación, y cualquier combinación de 'backing services' (bases de datos, colas, memoria cache, etc).
