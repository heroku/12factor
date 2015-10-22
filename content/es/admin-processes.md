## XII. Procesos de administración
### Ejecutar tareas de administración/gerencia como procesos únicos

La [formación de procesos](./concurrency) es el vector de procesos que se usa para hacer las tareas normales del app (como responder a peticiones de web) mientras esté en marcha. Por separado, el desarrollador a veces deseará ejecutar tareas administrativas o mantenciones únicas en el app, como:

* Hacer migraciones en la base de datos (e.g. `manage.py migrate` en Django, `rake db:migrate` en Rails).
* Poner en marcha un intérprete de comandos (también llamado un [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) para ejecutar algún código o para comparar los modelos del app con la base de datos en vivo. La mayoría de los lenguajes cuentan con un REPL para ejecutar el intérprete sin argumentos (e.g. `python` o `perl`) o en algunos casos tienen un comando distinto (e.g. `irb` en Ruby, `rails console` en Rails).
* Ejecutar scripts únicos que ya han sido agregados (por un commit) al repo del app (e.g. `php scripts/fix_bad_records.php`).

Los procesos únicos administrativos se deben ejecutar en un entorno idéntico a lo de los [procesos de larga vida](./processes) normales del app. Se ejecutan con un [release](./build-release-run) específico, y usan el mismo [codebase](./codebase) y [config](./config) como cualquier otro proceso ejecutado con aquel release. El código administrativo se debe incluir con el código de la aplicación para evitar problemas de sincronización.

Las mismas estrategias de [aislamiento de dependencias](./dependencies) se deben usar en todos tipos de procesos. Por ejemplo, si el proceso web de Ruby usa el comando `bundle exec thin start`, una migración de la base de datos debe usar `bundle exec rake db:migrate`. Asimismo, un programa de Python con Virtualenv debe usar el `bin/python` que viene "vendorizado" para ejecutar el servidor de web de Tornado y cualesquier procesos administrativos de `manage.py`.

El twelve-factor prefiere mucho a los lenguajes que cuentan con un REPL shell listo para usar, y que facilitan ejecutar los scripts únicos. En un deploy local, el desarrollador puede ejecutar los procesos administrativos únicos por un comando directo en el intérprete dentro de la carpeta del app. En un deploy de producción, el desarrollador puede usar ssh u otro mecanismo de ejecución remoto de comandos que tiene el entorno de ejecución del deploy para poner en marcha aquellos procesos.
