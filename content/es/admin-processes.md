## XII. Administración de procesos
### Ejecutar las tareas de gestión/administración como procesos que solo se ejecutan una vez

El [juego de procesos](./concurrency) es el conjunto de procesos que se usa para hacer las tareas habituales de la aplicación (como procesar las peticiones web). Por otro lado, es frecuente que los desarrolladores quieran ejecutar procesos de administración o mantenimiento una sola vez, como por ejemplo:

* Ejecutar migraciones de las bases de datos (e.g. `manage.py migrate` de Django, `rake db:migrate` de Rails).
* Ejecutar una consola (también conocidas como [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop)) para ejecutar código arbitrario o inspeccionar los modelos de la aplicación en una base de datos con datos reales. La mayoría de los lenguajes proporcionan un interprete del tipo REPL si se ejecuta el mismo mandato sin ningún argumento (e.g. `python` o `perl`) pero en algunos casos tienen un mandato distinto (e.g. `irb` en Ruby, `rails console` en Rails).
* Ejecutar scripts incluidos en el repositorio de la aplicación (e.g. `php scripts/fix_bad_records.php`).

Los procesos de este tipo deberían ejecutarse en un entorno idéntico al que se usa normalmente en los [procesos](./processes) habituales de la aplicación. Estos procesos se ejecutan en una [distribución](./build-release-run) concreta, usando el mismo [código base](./codebase) y la misma [configuración](./config) que cualquier otro proceso que ejecuta esa distribución. El código de administración se debe enviar con el código de la aplicación para evitar problemas de sincronización.

Se deberían usar las mismas técnicas de [aislamiento de dependencias](./dependencies) en todos los tipos de procesos. Por ejemplo, si un proceso web Ruby usa el mandato `bundle exec thin start`, entonces una migración de la base de datos debería usar `bundle exec rake db:migrate`. De la misma manera, un programa Python que usa Virtualenv debería usar `bin/python` para ejecutar tanto el servidor web Tornado como cualquier proceso de administración `manage.py`.

"Twelve-factor" recomienda encarecidamente lenguajes que proporcionan una consola del tipo REPL, ya que facilitan las tareas relacionadas con la ejecución de scripts que solo han de usarse una vez. En un despliegue local, se invocarán los procesos de administración con un mandato directo en la consola dentro del directorio de la aplicación. En un despliegue de producción, se puede usar ssh u otro mecanismo de ejecución de mandatos remoto proporcionado por el entorno de ejecución del despliegue para ejecutar dichos procesos.
