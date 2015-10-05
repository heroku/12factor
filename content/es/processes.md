## VI. Procesos
### Ejecutar el app como uno o más procesos sin estado

El app se pone en marcha en el entorno de ejecución como uno o más *procesos*.

En el caso más simple, el código es un script autónomo, el entorno de ejecución es el laptop local del desarrollador con el runtime del lenguaje instalado, y el proceso se lanza via el intérprete de comandos (por ejemplo, `python my_script.py`). Por otro lado, un deploy en producción de un app sofisticado podrá usar varios [tipos de procesos, instanciado como cero o más procesos en marcha](./concurrency).

**Los procesos twelve-factor son sin estado y [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Cualesquier datos que hay que persistir se deben guardar en un [servicio de apoyo](./backing-services) con estado, normalmente una base de datos.

El espacio de memoria o el sistema de archivos del proceso se puede usar como un caché corto, que dura por una sola transacción. Por ejemplo, bajar un archivo grande, operar en él, y guardar el resultado de la operación en la base de datos. El app twelve-factor jamás asume que algo almacenado temporalmente en memoria o en disco estará disponible en una futura petición o tarea -- con muchos procesos de cada tipo en marcha, es probable que una futura petición recibirá una respuesta desde un proceso diferente. Aún cuando solo un proceso esté en marcha, un reinicio (por causa de un deploy de código, un cambio en la config, o porque el entorno de ejecución deba trasladar el proceso a una ubicacion física diferente) normalmente borrará todo el estado local (e.g., memoria y sistema de archivos).

Empaquetadores de activos (como [Jammit](http://documentcloud.github.com/jammit/) o [django-compressor](http://django-compressor.readthedocs.org/)) usan el sistema de archivos como caché para activos compilados. Un app twelve-factor prefiere hacer esto durante la [etapa de build](./build-release-run), tal como el [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), en vez de durante el runtime.

Algunos sistemas web confian en ["sesiones persistentes"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- es decir, almacenar temporalmente los datos de la sesión de cada usuario en la memoria del proceso del app, y confiar en que futuras peticiones de tal usuario serán servidas por el mismo proceso. Las sesiones persistentes violan al twelve-factor y nunca se deben usar ni confiar en ellos. Datos del estado de sesiones es un buen candidato para un almacén de datos que cuenta con vencimiento temporal, como [Memcached](http://memcached.org/) o [Redis](http://redis.io/).
