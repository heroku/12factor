## XII. Admin processes (Administrativa processer)
### Köra administrativa uppgifter som engångsprocesser

[Process-skapandet](./concurrency) är en samling av processer som används för att utföra applikationens ordinarie verksamhet (som att exempelvis hantera webb-anrop) medan den är igång. Förutom detta vill utvecklare ofta utföra enskilda administrativa eller underhållsmässiga uppgifter för applikationen, som till exempel:

* Genomföra databasmigreringar (ex. `manage.py migrate` i Django, `rake db:migrate` i Rails).
* Köra konsolapplikationer (även känga som [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) skal) för att köra godtycklig kod eller undersöka en applikations modell mot en produktionsdatabas. De flesta språk erbjuder en REPL genom att köra kodtolken utan några argument (ex. `python` eller `perl`) eller har i vissa fall ett separat kommando (ex. `irb` i Ruby, `rails console` i Rails).
* Köra enskilda engångsscript som lagts in i applikationens repo (ex. `php scripts/fix_bad_records.php`).

Engångsprocesser bör köras i en identisk miljö som applikationens ordinarie [huvudprocess](./processes). De bör köras mot en [produktionsrelease](./build-release-run), som har samma [kodbas](./codebase) och samma [konfiguration](./config) som alla andra processer som är baserade på den releasen. Administrativ kod bör inkluderas med samma applikationskod för att undvika versionsproblem.

Samma teknik för [isolering av beroenden](./dependencies) bör användas på alla processtyper. Till exempel, om en Ruby webb-process använder kommandot `bundle exec thin start`, så bör en databas-migrering använda `bundle exec rake db:migrate`. På samma sätt, ett Python-program som använder Virtualenv bör använda tredjepartskomponenten `bin/python` både för att köra Tornado-webservern och alla administriva processer med `manage.py`.

Twelve-factor strongly favors languages which provide a REPL shell out of the box, and which make it easy to run one-off scripts.  In a local deploy, developers invoke one-off admin processes by a direct shell command inside the app's checkout directory.  In a production deploy, developers can use ssh or other remote command execution mechanism provided by that deploy's execution environment to run such a process.

Twelve-factor förespråkar starkt de utvecklingsspråk som erbjuder ett REPL-skal som grundfunktion, och som gör det enkelt att köra engångsscript. I en lokal utvecklingsmiljö kan utvecklare köra administrativa engångsscript genom ett skalkommando i applikationens kodkatalog. I en produktionsmiljö, kan utvecklare köra ssh eller någon annan metod för fjärrkommandon som applikationens miljö erbjuder.