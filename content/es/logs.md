## XI. Historiales
### Tratar los historiales como una transmisión de eventos

Los *historiales* permiten observar el comportamiento de la aplicación durante su ejecución. En entornos basados en servidores es muy común escribir un fichero en disco (un "fichero de histórico") pero este, es tan solo un posible formato de salida.

Los historiales son la [transmisión](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) de un conjunto de eventos ordenados y capturados de la salida de todos los procesos en ejecución y de los "backing services". En bruto, los historiales suelen estar en formato texto y tienen un evento por línea (aunque las trazas de excepciones suelen estar en varias líneas). Los historiales no tienen un principio y un final fijo, sino que fluyen continuamente mientras la aplicación está en funcionamiento.

**Una aplicación "twelve-factor" nunca se preocupa del direccionamiento o el almacenamiento de sus transmisiones de salida.** No debería intentar escribir o gestionar ficheros de historial. En su lugar, cada proceso en ejecución escribe sus eventos a la `salida estándar` (o `stdout`). Durante el desarrollo, los desarrolladores verán el flujo en su terminal para observar el comportamiento de la aplicación.

En despliegues de preproducción y producción, cada transmisión del proceso será capturada por el entorno de ejecución, siendo capturadas junto con todos los otros flujos de la aplicación, y redirigidas a uno o más destinos finales para ser revisadas y archivadas. Estos destinos donde se archivan no son visibles o configurables por la aplicación, se gestionan totalmente por el entorno de ejecución. Las herramientas de código abierto que capturan y almacenan los historiales (como [Logplex](https://github.com/heroku/logplex) y [Fluentd](https://github.com/fluent/fluentd)) se usan con este objetivo.

Las transmisiones de eventos para una aplicación pueden ser redirigidas a un fichero u observadas en tiempo real mediante un "tail" en un terminal. Cabe destacar que la transmisión se puede enviar a un sistema de análisis e indexado como [Splunk](http://www.splunk.com/), o a un sistema de almacenamiendo de datos de propósito general como [Hadoop/Hive](http://hive.apache.org/). Estos sistemas se tienen en cuenta por el gran poder y la flexibilidad para inspeccionar el comportamiento de la aplicación a lo largo del tiempo, incluyendo: 

* Encontrar eventos específicos del pasado.
* Gráficas de tendencia a gran escala (como las peticiones por minuto).
* Activación de alertas de acuerdo con heurísticas definidas por el usuario (como una alerta cuando la cantidad de errores por minuto sobrepasa un cierto límite).
