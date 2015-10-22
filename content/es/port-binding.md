## VII. Vinculación de puertos
### Exportar servicios a través de puertos vinculados

Las aplicaciones web a veces se ponen en marcha dentro de un contenedor de un servidor web. Por ejemplo, las aplicaciones PHP se pueden ejecutar como un módulo dentro de [Apache HTTPD](http://httpd.apache.org/), o las aplicaciones Java se pueden ejecutar dentro de [Tomcat](http://tomcat.apache.org/).

**Una aplicación twelve-factor es completamente autónoma** y no depende, cuando está en marcha, de la inyección de un servidor web en el entorno de ejecución para crear exponer un servicio web. La aplicación web **exporta HTTP como servicio a tráves de un puerto vinculado**, y escucha las peticiones recibidas en ese puerto.

En un entorno de desarrollo local, el desarrollador visita una URL como `http://localhost:5000/` para acceder el servicio que exportado por la aplicación. En un despliegue, una capa de enrutamiento se encarga de dirigir las peticiones desde un nombre de host público hacia los procesos web vinculados a cada puerto.

Esto normalmente se implementa [declarando dependencias](./dependencies) para añadir una librería de servidor web a la aplicación, como [Tornado](http://www.tornadoweb.org/) para Python, [Thin](http://code.macournoyer.com/thin/) para Ruby, o [Jetty](http://jetty.codehaus.org/jetty/) para Java y otros lenguajes basados en la JVM. Esto ocurre totalmente dentro del *espacio de usuario*, es decir, dentro del código de la aplicación. El contrato con el entorno de ejecución consiste en vincular a un puerto para responder a peticiones.

HTTP no es el único servicio que se puede exportar vinculando puertos. Casi cualquier servidor software se puede ejecutar vinculando un proceso a un puerto para esperar las peticiones entrantes. Algunos ejemplos son [ejabberd](http://www.ejabberd.im/) (que se comunica vía [XMPP](http://xmpp.org/)), y [Redis](http://redis.io/) (que utiliza el [protocolo Redis](http://redis.io/topics/protocol)).

Cabe destacar que la estrategia de vinculación de puertos significa que una aplicación puede transformarse en un [servicio](./backing-services) para otra aplicación, especificando como credenciales en la [configuración](./config) de la aplicación consumidora la URL de la aplicación que actúa como servicio.
