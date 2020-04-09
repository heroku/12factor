## XII. Admin procesy
### Spouštějte administrativní úlohy jako jednorázové procesy.

[Formace procesů](./concurrency) je sada procesů, které aplikace používá pro svůj běh (jako je například obsluha příchozích požadavků). Kromě toho potřebují vývojáři často spouštět i jednorázové administrativní nebo úlohy údržby, jako například:

* Spuštění databázové migrace (jako `manage.py migrate` v Django, `rake db:migrate` v Rails).
* Spuštění konzole (známé také jako [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) pro vykonání libovolného kódu nebo k prohlížení aplikačních modelů v živé databázi. Většina jazyků poskytuje REPL spuštěním interpreteru bez argumentů (kupříkladu `python` nebo `perl`) nebo v některých případech samostatným příkazem (jako `irb` u Ruby, `rails console` pro Rails).
* Spuštění jednorázových skriptů uložených v repozitáři aplikace (například `php scripts/fix_bad_records.php`).

Jednorázové administrativní procesy by měly být spouštěny ve stejném prostředí jako běžné [dlouho běžící procesy](./processes) aplikace. Běží proti [vydání](./build-release-run) za použití stejného [kódu](./codebase) a [konfigurace ](./config) jako ostatní procesy daného vydání. Administrativní kód musí být dodáván spolu s aplikací, aby se zabránilo problémům se synchronizací.

Stejné techniky [izolace závislostí](./dependencies) by měly být použity na všechny typy procesů. Například, pokud Ruby webový proces používá příkaz `bundle exec thin start`, tak databázová migrace by měla používat `bundle exec rake db:migrate`. Obdobně by pak měl program v Pythonu, využívající Virtualenv, používat přibalený `bin/python` pro spouštění jak Tornado webserveru, tak i pro spouštění `manage.py` administrativního procesu.

Twelve-factor metodika silně preferuje jazyky, které poskytují REPL shell v základu a umožňují tak snadno spouštět jednorázové skripty. V lokálním  nasazení spouštějí vývojáři jednorázový administrativní proces příkazem přímo v shellu uvnitř repozitáře. V produkčním nasazení mohou vývojáři použít SSH nebo jiný způsob vzdáleného spouštění příkazů, který je v daném nasazení pro spouštění procesů k dispozici.
