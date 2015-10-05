## XI. Registros
### Tratar a registros como flujos de eventos

*Registros* facilitan la visibilidad sobre el funcionamiento de un app que está en marcha. Para entornos de servidores normalmente se graban en un archivo en el disco (un "logfile"); pero esto solamente es un formato de salida.

Los registros son el [flujo](http://adam.heroku.com/past/2011/4/1/logs_are_streams_not_files/) de eventos, conjuntos y en orden cronológico, reunidos de los flujos de las salidas de todos procesos y servicios de apoyo que están en marcha. Los registros en su forma cruda normalmente son un formato de texto con un evento por línea (aunque los "backtraces" de excepciones pueden ocupar múltiples líneas). Los registros no tienen comienzo ni fin fijo, pero fluyen de forma continua mientras el app esté en funcionamiento.

**Un app twelve-factor nunca se preocupa sobre dirigir ni sobre almacenar su flujo de salida.** No debe intentar grabar ni manejar los logfiles. En cambio, cada proceso que está en marcha graba su flujo de eventos, sin búfer, al `stdout`. Durante el desarrollo local, el desarrollador verá este flujo en el primer plano de su intérprete de comandos para observar el funcionamiento del app.

En los deploys de staging o de la producción, el flujo de cada proceso será capturado por el entorno de ejecución, será reunido con todos los otros flujos del app, y será dirigido hacia uno o más destinos finales para observación y para almacenamiento de largo plazo. El app no puede ver ni configurar estos destinos de almacenamiento, y en cambio son manejados completamente por el entorno de ejecución. Enrutadores código-abierto de flujos (como [Logplex](https://github.com/heroku/logplex) y [Fluent](https://github.com/fluent/fluentd)) pueden ayudar a lograr esto.

El flujo de eventos de un app se puede dirigir hacia un archivo, o se puede observar via un "tail" en vivo en un intérprete de comandos. Sobre todo, el flujo se puede dirigir hacia un sistema de indexamiento y análisis de registros como [Splunk](http://www.splunk.com/), o hacia un sistema general de almacenamiento de datos como [Hadoop/Hive](http://hive.apache.org/). Estos sistemas facilitan al gran poder y a la flexibilidad en la introspección del funcionamiento del app con el tiempo, y incluyen:

* Buscar eventos especificos en el pasado.
* Gráficos de tendencias a gran escala (como peticiones por minuto).
* Notificaciones actuales según heurísticas elegidas por el usuario (como avisos cuando la cantidad de errores por minuto excede algún límite).
