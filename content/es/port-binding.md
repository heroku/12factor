## VII. Asignación de puertos
### Publicar servicios mediante asignación de puertos

Las aplicaciones web se ejecutan a menudo mediante contenedores web. Por ejemplo, las aplicaciones de PHP se suelen ejecutar como módulos del [HTTPD de Apache](http://httpd.apache.org/), y las aplicaciones Java en [Tomcat](http://tomcat.apache.org/).

**Las aplicaciones "twelve factor" son completamente auto-contenidas** y no dependen de un servidor web en ejecución para crear un servicio web público. Una aplicación web **usa HTTP como un servicio al que se le asigna un puerto**, y escucha las peticiones que recibe por dicho puerto.

En los entornos de desarrollo, los desarrolladores usan una URL del servicio (por ejemplo `http://localhost:5000/`), para acceder al servicio que ofrece la aplicación. En la fase de despliegue, existe una capa de enrutamiento que se encarga de que las peticiones que llegan a una dirección pública se redirijan hacia el proceso web que tiene asignado su puerto correspondiente.

Esto se implementa, normalmente, usando una [declaración de dependencias](./dependencies) donde se incluyen librerías de las aplicaciones web, como [Tornado](http://www.tornadoweb.org/) para Python, [Thin](http://code.macournoyer.com/thin/) para Ruby, o [Jetty](http://www.eclipse.org/jetty/) para Java y otros lenguajes basados en la Máquina Virtual de Java (JVM). Esto ocurre totalmente en el *entorno del usuario*, es decir, dentro del código de la aplicación. El contrato con el entorno de ejecución obliga al puerto a servir las peticiones.

HTTP no es el único servicio que usa asignación de puertos. La verdad, es que cualquier servicio puede ejecutarse mediante un proceso al que se le asigna un puerto y queda a la espera de peticiones. Entre otros ejemplos podemos encontrar [ejabberd](http://www.ejabberd.im/) (que usa [XMPP](http://xmpp.org/)), y [Redis](http://redis.io/) (que usa [el protocolo Redis](http://redis.io/topics/protocol)).

También es cierto que la aproximación de asignación de puertos ofrece la posibilidad de que una aplicación pueda llegar a ser un ["backing service"](./backing-services) para otra aplicación, usando la URL de la aplicación correspondiente como un recurso declarado en la [configuración](./config) de la aplicación que consume este "backing service".
