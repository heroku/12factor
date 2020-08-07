## X. Dev/prod parity (Likhet mellan miljöer)
### Låt utvecklings-, acceptanstests- och produktionsmiljö vara så lika som möjligt

Historiskt sett har det funnits betydande skillnader mellan utvecklingsmiljö (där utvecklare gör förändringar i en lokal [kodversion](./codebase) av en applikation) och produktionsmiljö (en aktiv produktionssättning av applikationen som används av slutanvändare). Dessa skillnader tydliggörs i tre områden: 

* **Tidsskillnad**: en utvecklare kan arbeta på kod under dagar, veckor, till och med månader innan den går in i produktion.
* **Personalskillnad**: Utvecklare skriver kod, tekniker produktionssätter den.
* **Verktygsskillnad**: Utvecklare kan använda en uppsättning olika verktyg som ex. Nginx, SQLite och OS X medan produktionssättningen använder Apache, MySQL och Linux.

**Tolvfaktorapplikationen är designad för [kontinuerlig produktionssättning](http://avc.com/2011/02/continuous-deployment/) genom att hålla skillnaden mellan utvecklingsmiljö och produktionsmiljö liten.** Om man ser till de tre skillnaderna ovan:

* Gör tidsskillnaden liten: en utvecklare kan skriva kod och få den produktionssatt timmar eller bara minuter senare.
* Gör personalskillnaden liten: utvecklare som skrev koden är tätt involverade i att produktionssätta den och att se dess beteende i produktion.
* Gör verktygsskillnaden liten: håll utvecklingsmiljö och produktionsmiljö så lika som möjligt.

För att sammanfatta ovanstående i en tabell:

<table>
  <tr>
    <th></th>
    <th>Traditionell applikation</th>
    <th>Tolvfaktorapplikation</th>
  </tr>
  <tr>
    <th>Tid mellan produktionssättningar</th>
    <td>Veckor</td>
    <td>Timmar</td>
  </tr>
  <tr>
    <th>Kodutvecklare vs produktionssättare</th>
    <td>Olika personer</td>
    <td>Samma personer</td>
  </tr>
  <tr>
    <th>Utvecklings- vs produktionsmiljö</th>
    <td>Avvikande från varandra</td>
    <td>Så lika som möjligt</td>
  </tr>
</table>

[Stödtjänster](./backing-services), såsom applikationens databas, kösystem eller cachning är ett område där likhet mellan utvecklings- och produktionsmiljö är viktigt. Många språk erbjuder bibliotek som förenklar tillgång till stödtjänster, inklusive *adaptrar* till olika typer av tjänster. Några exempel finns i tabellen nedan.

<table>
  <tr>
    <th>Typ</th>
    <th>Språk</th>
    <th>Bibliotek</th>
    <th>Adapter</th>
  </tr>
  <tr>
    <td>Databas</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Köhantering</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cachning</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filsystem, Memcached</td>
  </tr>
</table>

Utvecklare finner det ibland attraktivt att använda lättviktiga stödtjänster i deras lokala miljö, medan mer seriösa och robusta stödtjänster används i produktion. Till ex. att använda SQLite lokalt och PostgreSQL i produktion, eller lokalt processminne för cachning i utvecklingsmiljön och Memcached i produktion.

**Tolvfaktor-utvecklaren motstår ingivelsen att använda olika stödtjänster mellan utvecklingsmiljö och produktionsmiljö** även när adaptrar teoretiskt sett kan abstrahera iväg alla skillnader mellan stödtjänster. Skillnaden mellan stödtjänster innebär att små inkompabiliteter dyker upp, som orsakar att kod som funkat och passerat testning i utvecklingsmiljö och acceptanstestsmiljö misslyckas i produktion. Denna typ av fel skapar friktion som hämmar kontinuerlig produktionssättning. Den sammanräknade kostnaden för denna friktion och de efterföljande hindren för kontinuerlig produktionssättning är extremt hög sett över en applikations livslängd.

Lättviktiga lokala tjänster är mindre tilltalande nu än de tidigare var. Moderna stödtjänster som Memcached, PostgreSQL, och RabbitMQ är inte svåra att installera och köra tack vare moderna paketeringssystem såsom [Homebrew](http://mxcl.github.com/homebrew/) och [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  Alternativt, att använda deklarativa nedladdningsverktyg såsom [Chef](http://www.opscode.com/chef/) och [Puppet](http://docs.puppetlabs.com/) kombinerat med lättviktiga virtuella miljöer såsom [Docker](https://www.docker.com/) och [Vagrant](http://vagrantup.com/) möjliggör utvecklare att köra lokala miljöer som mycket tätt liknar produktionsmiljöer. Kostnaden för att installera och använda dessa system är låg i förhållande till fördelarna av likhet mellan miljöer och kontinuerlig produktionssättning. 

Adaptrar till olika stödtjänster är dock fortfarande användbara, eftersom de gör portning till nya stödtjänster relativt smärtfri. Men alla produktionssättningar av applikationen (utvecklarmiljö, acceptanstestsmiljö, produktionsmiljö) bör använda samma typ och version av respektivt stödtjänst.
