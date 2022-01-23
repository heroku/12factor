## X. Dev/prod parity
### Hou ontwikkeling, staging, en productie zo gelijk mogelijk

Historisch gezien zijn er aanzienlijke verschillen geweest tussen ontwikkeling (een ontwikkelaar die live bewerkingen uitvoert op een lokale [deploy](./codebase) van de app) en productie (een draaiende deploy van de app die toegankelijk is voor eindgebruikers). Deze verschillen manifesteren zich op drie gebieden:

* **De tijdskloof**: Een ontwikkelaar kan werken aan code die er dagen, weken of zelfs maanden over doet om in productie te gaan.
* **De personeelskloof**: Ontwikkelaars schrijven code, ops ingenieurs implementeren het.
* **De tools gap**: Ontwikkelaars gebruiken misschien een stack als Nginx, SQLite en OS X, terwijl de productie Apache, MySQL en Linux gebruikt.

**De 12-factor app is ontworpen voor [continue implementatie](http://avc.com/2011/02/continuous-deployment/) door de kloof tussen ontwikkeling en productie klein te houden.** Kijkend naar de drie hierboven beschreven kloven:

* Maak de tijdskloof klein: een ontwikkelaar kan code schrijven en deze uren of zelfs slechts minuten later laten implementeren.
* Maak de kloof tussen personeel klein: ontwikkelaars die code hebben geschreven zijn nauw betrokken bij het implementeren van de code en kijken naar het gedrag ervan in productie.
* Maak de tools gap klein: zorg dat ontwikkeling en productie zo veel mogelijk op elkaar lijken.

Vat het bovenstaande samen in een tabel:

<table>
  <tr>
    <th></th>
    <th>Traditionele app</th>
    <th>12-factor app</th>
  </tr>
  <tr>
    <th>Tijd tussen deploys</th>
    <td>Weken</td>
    <td>Uren</td>
  </tr>
  <tr>
    <th>Code-schrijvers vs. code-implementeerders</th>
    <td>Verschillende mensen</td>
    <td>Zelfde mensen</td>
  </tr>
  <tr>
    <th>Dev vs productie-omgevingen</th>
    <td>Verschillend</td>
    <td>Zo gelijk mogelijk</td>
  </tr>
</tabel>

[Backing services](./backing-services), zoals de app's database, wachtrijsysteem, of cache, is een gebied waar dev/prod pariteit belangrijk is. Veel talen bieden bibliotheken aan die de toegang tot de backing service vereenvoudigen, inclusief *adapters* naar verschillende soorten services. Enkele voorbeelden staan in de tabel hieronder.

<table>
  <tr>
    <th>Type</th>
    <th>Taal</th>
    <th>Library</th>
    <th>Adapters</th>
  </tr>
  <tr>
    <td>Database</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Queue</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Geheugen, bestandssysteem, Memcached</td>
  </tr>
</tabel>

Ontwikkelaars vinden het soms erg aantrekkelijk om een lichtgewicht backing service te gebruiken in hun lokale omgevingen, terwijl een serieuzere en robuustere backing service zal worden gebruikt in productie. Bijvoorbeeld, het gebruik van SQLite lokaal en PostgreSQL in productie; of lokaal procesgeheugen voor caching in ontwikkeling en Memcached in productie.

**De 12-factor ontwikkelaar weerstaat de drang om verschillende backing services te gebruiken tussen ontwikkeling en productie**, zelfs wanneer adapters theoretisch alle verschillen in backing services wegnemen. Verschillen tussen backing services betekenen dat kleine incompatibiliteiten opduiken, waardoor code die werkte en tests doorstond in ontwikkeling of staging, faalt in productie. Dit soort fouten creëert wrijving die continue implementatie ontmoedigt. De kosten van deze wrijving en de daaropvolgende afremming van continuous deployment zijn extreem hoog als je ze over de levensduur van een applicatie bij elkaar optelt.

Lichtgewicht lokale diensten zijn minder aantrekkelijk dan ze ooit waren. Moderne backing services zoals Memcached, PostgreSQL, en RabbitMQ zijn niet moeilijk te installeren en te draaien dankzij moderne packaging systemen, zoals [Homebrew](http://mxcl.github.com/homebrew/) en [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Als alternatief stellen declaratieve provisioning tools zoals [Chef](http://www.opscode.com/chef/) en [Puppet](http://docs.puppetlabs.com/) in combinatie met lichtgewicht virtuele omgevingen zoals [Docker](https://www.docker.com/) en [Vagrant](http://vagrantup.com/) ontwikkelaars in staat om lokale omgevingen te draaien die productieomgevingen dicht benaderen. De moeite van installatie en gebruik van deze systemen zijn laag vergeleken met het voordeel van dev/prod pariteit en continue deployment.

Adapters voor verschillende backing services zijn nog steeds nuttig, omdat ze het porten naar nieuwe backing services relatief pijnloos maken. Maar alle deploys van de app (ontwikkelomgevingen, staging, productie) zouden hetzelfde type en dezelfde versie van elk van de backing services moeten gebruiken.