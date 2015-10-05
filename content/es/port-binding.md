## VII. Vinculación de puertos
### Exportar servicios via vinculación de puertos

Los web apps a veces se ponen en marcha dentro de un contenedor de un servidor web. Por ejemplo, los apps PHP se pueden ejecutar como módulo dentro de [Apache HTTPD](http://httpd.apache.org/), o los apps Java se pueden ejecutar dentro de [Tomcat](http://tomcat.apache.org/).

**El app twelve-factor es completamente autónomo** y no depende, durante estar en marcha, de la inyección de un servidor web en el entorno de ejecución para crear un servicio mirando al web. El web app **exporta HTTP como servicio a tráves de vinculación a un puerto**, y a tráves de escuchar las peticiones que vienen en aquel puerto.

En un entorno de desarrollo local, el desarrollador visita a un URL de servicio como `http://localhost:5000/` para acceder el servicio que el app exporta. En un entorno lanzado, una capa de encaminamiento se encarga de las peticiones de rutas desde un nombre de host público hacia los procesos web vinculados a puertos.

Esto normalmente se implementa con [declaración de dependencias](./dependencies) para añadir una biblioteca de servidor web al app, como [Tornado](http://www.tornadoweb.org/) para Python, [Thin](http://code.macournoyer.com/thin/) para Ruby, o [Jetty](http://jetty.codehaus.org/jetty/) para Java y otros lenguajes basados en JVM. Esto ocurre totalmente dentro del *espacio de usuario*, es decir, dentro del código del app. El contrato con el entorno de ejecución consiste en vincular a un puerto para responder a peticiones.

HTTP no es el único servicio que se puede exportar via vinculación de puertos. Casi todos tipos de software de servidores se pueden ejecutar via vinculación de un proceso a un puerto para esperar a peticiones entrantes. Ejemplos incluyen [ejabberd](http://www.ejabberd.im/) (comunicando con [XMPP](http://xmpp.org/)), y [Redis](http://redis.io/) (comunicando con el [protocolo Redis](http://redis.io/topics/protocol)).

Fíjese también que la estrategia de vinculación de puertos significa que un app puede transformarse en el [servicio de apoyo](./backing-services) para un otro app, a tráves de especificar el URL del app de apoyo como credenciales en la [config](./config) del app consumidor.
