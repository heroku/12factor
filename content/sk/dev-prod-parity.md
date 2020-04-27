## X. Dev/prod parity
### Vývojové, testovacie a produkčné prostredie sú čo najpodobnejšie ako sa dá

Historicky bývali podstatné rozdiely medzi vývojovým prostredím (developer upravoval živé lokálne [nasadenie](./codebase)) a produkčným prostredím (bežiace nasadenie aplikácie, na ktoré pristupujú používatelia). Tieto rozdiely sa prejavujú v týchto troch oblastiach:

* **Časový rozdiel:** Developer môže pracovať na kóde, ktorý trvá dni, týždne alebo dokonca mesiace pred tým ako sa dostane na produkciu.
* **Personálny rozdiel**: Developeri píšu kód, systémový administrátory ho nasadzujú.
* **Nástrojový rozdiel**: Developeri môžu používať Nginx, SQLite, a OS X, pričom na produkcii beží Apache, MySQL, a Linux.

**Dvanásť faktorová aplikácia je navrhnutá pre [continuous deployment](http://avc.com/2011/02/continuous-deployment/) tak, že udržiava rozdiely medzi vývojom a produkciou.**  Keď sa pozrieme na tri rozdiely popísané vyššie:

* Zmenšite časový rozdiel: developer napíše kód a nasadí ho v priebehu hodín alebo dokonca minút.
* Zmenšite personálny rozdiel: developeri, ktorí kód píšu by mali byť prítomní pri nasadzovaní a sledovaní správania na produkcii.
* Zmenšite nástrojvý rozdiel: udržujte vývojové a produkčné prostredie nakoľko sa dá rovnaké.

Súhrn vyššie napísaného v tabuľke:
 
<table>
  <tr>
    <th></th>
    <th>Tradičná aplikácia</th>
    <th>Dvanásť faktorová aplikácia</th>
  </tr>
  <tr>
    <th>Čas medzi nasadeniami</th>
    <td>Týždne</td>
    <td>Hodiny</td>
  </tr>
  <tr>
    <th>Autori kódu vs nasadzovači kódu</th>
    <td>Rôzni ľudia</td>
    <td>Rovnakí ľudia</td>
  </tr>
  <tr>
    <th>Vývojárske vs produkčné prostredie</th>
    <td>Rozdielne</td>
    <td>Čo najpodobnejšie</td>
  </tr>
</table>

[Podporné služby](./backing-services) ako napríklad databáza, fronty alebo cache sú oblasťou, kde je zhodnosť vývojárskeho-produkčného prostredia dôležitá.  Veľa jazykov poskytuje knižnice, ktoré uľahčujú prístup k podporným službám, vrátane *adaptérov* k rôznym typom služieb.  Niektoré príklady sú v tabuľke nižšie.

<table>
  <tr>
    <th>Typ</th>
    <th>Jazyk</th>
    <th>Knižnica</th>
    <th>Adapér</th>
  </tr>
  <tr>
    <td>Databáza</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Fronta</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Pamäť, súborový systém, Memcached</td>
  </tr>
</table>

Developeri niekedy radi používajú odľahčené podporné služby na lokálny vývoj, pričom na produkcii sú robustnejšie podporné služby.  Napríklad používajú SQLite lokálne a PostgreSQL na produkcii; alebo pamäť lokálneho procesu počas vývoja a Memcached na produkcii.

**Dvanásť faktorový vývojár odoláva nutkaniu používať rôzne podporné služby medzi vývojom a produkciou**, aj v prípade, že adaptéry teoreticky abstrahujú rozdiely medzi službami. Rozdiely medzi službami znamenajú, že sa vyskytnú maličné nekompatibility a spôsobia, že kód prejde cez testy pri vývoji alebo testovaní a zlyhá na produkcii. Tieto typy chýb vytvárajú trenie, ktoré spomaľuje priebežné nasadzovanie.  Cena tohoto trenia a následné spomalenie priebežného nasadzovania je extrémne vysoká, keď ju sčítame cez celú životnosť aplikácie.

Odľahčené lokálne služby už nie sú také príťažlivé ako boli. Moderné podporné služby ako Memcached, PostgreSQL a RabbitMQ nie je ťažké nainštalovať a spustiť vďaka moderným balíčkovacím systémom ako [Homebrew](http://mxcl.github.com/homebrew/) a [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  Alternatívne deklaratívne nástroje ako [Chef](http://www.opscode.com/chef/) a [Puppet](http://docs.puppetlabs.com/) skombinované s odľahčenými virtuálnymi prostrediami ako [Docker](https://www.docker.com/) a [Vagrant](http://vagrantup.com/) umôžňujú vývojárom vytvoriť lokálne prostredie, ktoré tesne aproximuje produkčné prostredie. Cena inštalácie a používania týchto systémov je nízka v porovnaní s výhodami rovnakého prostredia vývoj/produkcia.

Adaptéry k rôznym podporným službám sú stále užitočné, pretože umožňujú plynulú migráciu na nové podporné služby. Ale všetky nasadenia aplikácia (vývojárske prostredie, testovacie, produkcia) by mali používať rovnaký typ a verziu každej podpornej služby.
