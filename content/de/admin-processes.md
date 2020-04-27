## XII. Admin-Prozesse
### Admin/Management-Aufgaben als einmalige Vorgänge behandeln

Die [Prozess-Formation](./concurrency) ist das Bündel von Prozessen zur Erledigung der üblichen Aufgaben einer App (wie die Abarbeitung von Web-Requests) während sie läuft. Daneben möchten Entwickler oft einmalige Administrativ- oder Wartungsaufgaben an der App erledigen, wie zum Beispiel:

* Datenbank-Migrationen starten (z.B. `manage.py migrate` in Django, `rake db:migrate` in Rails)
* Eine Konsole starten (auch bekannt als [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) Shell) um beliebigen Code zu starten oder die Modelle der App gegen die Live-Datenbank zu prüfen. Die meisten Sprachen stellen eine REPL zur Verfügung, wenn man den Interpreter ohne Argumente startet (z.B. `python` oder `perl`) oder in manchen Fällen mit einem anderen Kommando (z.B. `irb` für Ruby, `rails console` für Rails).
* Einmalig auszuführende Skripte aus dem Repo der App starten (z.B. `php scripts/fix_bad_records.php`).

Einmalige Administrationsprozesse sollten in einer Umgebung laufen, die identisch ist zu der Umgebung der üblichen [langlaufenden Prozesse](./processes). Sie laufen gegen einen [Release](./build-release-run) und benutzen dieselbe [Codebase](./codebase) und [Konfiguration](./config) wie jeder Prozess, der gegen einen Release läuft. Administrationscode wird mit dem App-Code ausgeliefert um Synchronisationsprobleme zu vermeiden.

Dieselben Techniken zur [Isolation von Abhängigkeiten](./dependencies) sollten für alle Prozessarten verwendet werden. Wenn zum Beispiel ein Ruby-Web-Prozess das Kommando `bundle exec thin start` verwendet, dann sollte eine Datenbankmigration `bundle exec rake db:migrate` verwenden. Wenn ein Python-Programm Virtualenv nutzt, sollte es sein mitgeliefertes `bin/python` sowohl zum Start des Tornado Webservers als auch für alle `manage.py` Admin-Prozesse verwenden.

Die Zwölf Faktoren bevorzugen Sprachen, die eine REPL Shell direkt mitbringen. Das erleichtert das Starten von einmal auszuführenden Skripten. In einem lokalen Deploy rufen Entwickler einmal auszuführende Admin-Prozesse direkt über ein Shell-Kommando im Checkout-Verzeichnis der App auf. In einem Produktions-Deploy können Entwickler ssh oder andere Kommando-Fernsteuerungs-Mechanismen benutzen, die die Ausführungsumgebung dieses Deploys für das Starten eines solchen Prozesses bereitstellt.
