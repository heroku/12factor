## X. Dev/prod semejantes
### Mantener el desarrollo, el staging, y la producción lo mas parecido posible

Históricamente, había bastantes disparidades entre el desarrollo (un desarrollador editando en vivo un [deploy](./codebase) local del app) y la producción (un deploy del app en marcha que está accedido por usuarios). Aquellas disparidades se manifiestan en tres áreas:

* **La disparidad en tiempo:** Un desarrollador podrá trabajar en código que se demora días, semanas, o hasta meses en pasar a la producción.
* **La disparidad en personal:** Los desarrolladores escriben el código, pero los ingenieros de operaciónes lo lanzan.
* **La disparidad en herramientas:** Los desarrolladores podrán usar un cunjunto como Nginx, SQLite, y OS X, mientras el deploy en la producción usa Apache, MySQL, y Linux.

**El app twelve-factor está diseñado para el [lanzamiento continuo](http://www.avc.com/a_vc/2011/02/continuous-deployment.html) para minimizar la disparidad entre el desarrollo y la producción.** Con respeto a las tres disparidades mencionadas:

* Minimizar la disparidad en tiempo: un desarrollador podrá escribir código y lanzarlo horas o solo minutos después.
* Minimizar la disparidad en personal: los desarrolladores quienes escriben el código están involucrados en lanzarlo y en supervisar su funcionamiento en la producción.
* Minimizar la disparidad en herramientas: mantener el desarrollo y la producción lo mas parecido posible.

Para sumar lo anterior en una tabla:

<table>
  <tr>
    <th></th>
    <th>App tradicional</th>
    <th>App twelve-factor</th>
  </tr>
  <tr>
    <th>Tiempo entre deploys</th>
    <td>Semanas</td>
    <td>Horas</td>
  </tr>
  <tr>
    <th>Autores de código vs lanzadores de código</th>
    <td>Diferentes personas</td>
    <td>Mismas personas</td>
  </tr>
  <tr>
    <th>Entornos de desarrollo vs producción</th>
    <td>Divergente</td>
    <td>Lo mas parecido posible</td>
  </tr>
</table>

[Servicios de apoyo](./backing-services), como la base de datos del app, sistema de fila, o caché, es un área dónde el tema de dev/prod semejantes es importante. Muchos lenguajes se cuentan con bibliotecas que simplifican el acceso a los servicios de apoyo, incluyendo *adaptadores* para diferentes tipos de servicios. Algunos ejemplos están en la siguiente tabla.

<table>
  <tr>
    <th>Tipo</th>
    <th>Lenguaje</th>
    <th>Biblioteca</th>
    <th>Adaptadores</th>
  </tr>
  <tr>
    <td>Base de datos</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Fila</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Caché</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memoria, sistema de archivos, Memcached</td>
  </tr>
</table>

Los desarrolladores a veces se atraen mucho al uso de un servicio de fondo ligero en sus entornos locales, mientras un servicio de fondo mas fuerte y robusto se usa en la producción. Por ejemplo, usar SQLite en el desarrollo y PostgreSQL en la producción; o memoria local del proceso como caché en el desarrollo y Memcached en la producción.

**El desarrollador twelve-factor evita el uso de servicios de fondo diferentes entre el desarrollo y la producción**, aunque en teoria los adaptadores "abstraigan" cualesquier diferencias que hayan entre servicios de fondo. Las diferencias entre servicios de fondo suelen resultar en incompatibilidades minúsculas, tal que código que funciona y que pasa las pruebas en el desarrollo o en el staging, igual falle en la producción. Estos tipos de errores causan tensiones que desincentivan el lanzamiento continuo. El costo de estas tensiones y la resultante disminución en el desarrollo continuo es sumamente alto si se consideran en total durante toda la vida de una aplicación.

Los servicios de apoyo ligeros son menos tentadores que lo que eran antes. Servicios de apoyo modernos como Memcached, PostgreSQL, y RabbitMQ no son dificiles instalar y ejecutar gracias a los gestores de paquetes modernos, como [Homebrew](http://mxcl.github.com/homebrew/) y [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Alternativamente, herramientas de suministración declarativas como [Chef](http://www.opscode.com/chef/) y [Puppet](http://docs.puppetlabs.com/) en conjunto con entornos virtuales ligeros como [Vagrant](http://vagrantup.com/) dejan que los desarrolladores ejecuten entornos locales que se parecen mucho a los entornos de la producción. El costo de instalar y usar estos sistemas es bajo en comparación con la ventaja de dev/prod semejantes y del lanzamiento continuo.

Los adaptadores para servicios de fondo diferentes aún son útiles, porque facilitan el proceso de cambiar a nuevos servicios de fondo. Pero todos los deploys del app (entornos del desarrollo, del staging, y de la producción) deben usar el mismo tipo y versión de cada uno de los servicios de fondo.
