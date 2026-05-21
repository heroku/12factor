## XII. Admin-processen
### Voer admin/beheertaken uit als eenmalige processen

De [proces formatie](./concurrency) is de reeks van processen die gebruikt worden om de gewone zaken van de app te doen (zoals het afhandelen van web verzoeken) terwijl het draait. Los daarvan zullen ontwikkelaars vaak eenmalige administratieve of onderhoudstaken voor de app willen doen, zoals:

* Het uitvoeren van database migraties (bijv. `manage.py migrate` in Django, `rake db:migrate` in Rails).
* Het uitvoeren van een console (ook bekend als een [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) om willekeurige code uit te voeren of de modellen van de app te inspecteren tegen de live database.  De meeste talen bieden een REPL door het uitvoeren van de interpreter zonder argumenten (bijv. `python` of `perl`) of in sommige gevallen hebben een apart commando (bijv. `irb` voor Ruby, `rails console` voor Rails).
* Het draaien van eenmalige scripts die gecommit zijn in de repo van de app (bijv. `php scripts/fix_bad_records.php`).

Eenmalige admin processen moeten worden uitgevoerd in een identieke omgeving als de reguliere [langlopende processen](./processes) van de app. Ze draaien tegen een [release](./build-release-run), met dezelfde [codebase](./codebase) en [config](./config) als elk proces dat tegen die release draait. De beheercode moet samen met de applicatiecode worden geleverd om synchronisatieproblemen te voorkomen.

Dezelfde [dependency isolation](./dependencies) technieken moeten gebruikt worden op alle procestypes. Bijvoorbeeld, als het Ruby web proces het commando `bundle exec thin start` gebruikt, dan zou een database migratie `bundle exec rake db:migrate` moeten gebruiken. Op dezelfde manier zou een Python programma dat Virtualenv gebruikt de vendored `bin/python` moeten gebruiken voor het draaien van zowel de Tornado webserver als alle `manage.py` admin processen.

12-factor heeft een sterke voorkeur voor talen die een REPL shell uit de doos bieden, en die het gemakkelijk maken om eenmalige scripts te draaien. In een lokale implementatie roepen ontwikkelaars eenmalige admin processen aan door een direct shell commando in de checkout directory van de app. Bij een productie-implementatie kunnen ontwikkelaars ssh gebruiken of een ander mechanisme om commando's op afstand uit te voeren, zoals voorzien door de uitvoeringsomgeving van die implementatie, om zo'n proces uit te voeren.