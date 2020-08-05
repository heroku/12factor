## X. Dev/prod parity (likhet mellan miljöer)
### Låt utvecklings-, acceptanstests- och produktionsmiljö vara så lika som möjligt

Historiskt sett har det funnits betydande skillnader mellan utvecklingsmiljö (en utvecklare som gör förändringar i en lokal [kodversion](./codebase) av en applikation) och produktionsmiljö (en aktiv produktionssättning av applikationen som används av slutanvändare). Dessa skillnader tydliggörs i tre områden: 
Historically, there have been substantial gaps between development (a developer making live edits to a local [deploy](./codebase) of the app) and production (a running deploy of the app accessed by end users).  These gaps manifest in three areas:

* **Tidsskillnad**: en utvecklare kan arbeta på kod under dagar, veckor, till och med månader innan det går in i produktion.
* **The time gap**: A developer may work on code that takes days, weeks, or even months to go into production.
* **Personalskillnad**: Utvecklare skriver kod, administratörer produktionssätter den.
* **The personnel gap**: Developers write code, ops engineers deploy it.
* **Verktygsskillnad**: Utvecklare kan använda en uppsättning verktyg som ex. Nginx, SQLite och OS X medan produktionssättningen använder Apache, MySQL och Linux.
* **The tools gap**: Developers may be using a stack like Nginx, SQLite, and OS X, while the production deploy uses Apache, MySQL, and Linux.

**Tolvfaktorapplikationen är designad för [kontinuerlig produktionssättning](http://avc.com/2011/02/continuous-deployment/) genom att hålla skillnaden mellan utvecklingsmiljö och produktionsmiljö liten.** Om man ser till de tre skillnaderna ovan:
**The twelve-factor app is designed for [continuous deployment](http://avc.com/2011/02/continuous-deployment/) by keeping the gap between development and production small.**  Looking at the three gaps described above:

* Gör tidsskillnaden liten: en utvecklare kan skriva kod och få den produktionssatt timmar eller även minuter senare.
* Make the time gap small: a developer may write code and have it deployed hours or even just minutes later.
* Gör personalskillnaden liten: utvecklare som skrev koden är tätt involverade i att produktionssätta den och att se dess beteende i produktion.
* Make the personnel gap small: developers who wrote code are closely involved in deploying it and watching its behavior in production.
* Gör verktygsskillnaden liten: håll utvecklingsmiljö och produktionsmiljö så lika som möjligt.
* Make the tools gap small: keep development and production as similar as possible.

För att sammanfatta detta i en tabell:
Summarizing the above into a table:

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
    <th>Kodutvecklare vs kodsläppare</th>
    <td>Olika personer</td>
    <td>Samma personer</td>
  </tr>
  <tr>
    <th>Utvecklings- vs produktionsmiljö</th>
    <td>Avvikande från varandra</td>
    <td>Så lika som möjligt</td>
  </tr>
</table>
<table>
  <tr>
    <th></th>
    <th>Traditional app</th>
    <th>Twelve-factor app</th>
  </tr>
  <tr>
    <th>Time between deploys</th>
    <td>Weeks</td>
    <td>Hours</td>
  </tr>
  <tr>
    <th>Code authors vs code deployers</th>
    <td>Different people</td>
    <td>Same people</td>
  </tr>
  <tr>
    <th>Dev vs production environments</th>
    <td>Divergent</td>
    <td>As similar as possible</td>
  </tr>
</table>

[Stödtjänster](./backing-services), såsom applikationens databas, kösystem eller cachning är ett område där skillnad mellan utvecklings- och produktionsmiljö är viktigt. Många spårk erbjuder bibliotek som förenklar tillgång till stödtjänster, inklusive *adaptrar* till olika typer av tjänster. Några exempel finns i tabellen nedan.
[Backing services](./backing-services), such as the app's database, queueing system, or cache, is one area where dev/prod parity is important.  Many languages offer libraries which simplify access to the backing service, including *adapters* to different types of services.  Some examples are in the table below.

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
    <td>Queue</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>
<table>
  <tr>
    <th>Type</th>
    <th>Language</th>
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
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Utvecklare finner det ibland attraktivt att använda lättviktiga stödtjänster i deras lokala miljö, medan mer seriösa och robusta stödtjänster används i produktion. Till ex. att använda SQLite lokalt och PostgreSQL i produktion, eller lokalt processminne för cachning i utvecklingsmiljön och Memcached i produktion.
Developers sometimes find great appeal in using a lightweight backing service in their local environments, while a more serious and robust backing service will be used in production.  For example, using SQLite locally and PostgreSQL in production; or local process memory for caching in development and Memcached in production.

**Tolvfaktor-utvecklaren motstår ingivelsen att använda olika stödtjänster mellan utvecklingsmiljö och produktionsmiljö** även när adaptrar teoretiskt sett kan abstrahera iväg alla skillnader mellan stödtjänster. Skillnaden mellan stödtjänster innebär att små inkompabiliteter dyker upp, som orsakar att kod som funkat och passerat testning i utvecklingsmiljö och acceptanstestsmiljö misslyckas i produktion. Denna typ av fel skapar friktion som hämmar kontinuerlig produktionssättning. Den sammanräknade kostnaden för denna friktion och de efterföljande hindren för kontinuerlig produktionssättning är extremt hög sett över en applikations livslängd.
**The twelve-factor developer resists the urge to use different backing services between development and production**, even when adapters theoretically abstract away any differences in backing services.  Differences between backing services mean that tiny incompatibilities crop up, causing code that worked and passed tests in development or staging to fail in production.  These types of errors create friction that disincentivizes continuous deployment.  The cost of this friction and the subsequent dampening of continuous deployment is extremely high when considered in aggregate over the lifetime of an application.

Lättviktiga lokala tjänster blir mindre tilltalande än de tidigare var. Moderna stödtjänster som Memcached, PostgreSQL, och RabbitMQ är inte svåra att installera och köra tack vare moderna paketeringssystem såsom [Homebrew](http://mxcl.github.com/homebrew/) och [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  Alternativt, att använda deklarativa tillgänglighetsverktyg såsom [Chef](http://www.opscode.com/chef/) och [Puppet](http://docs.puppetlabs.com/) kombinerat med lättviktiga virtuella miljöer såsom [Docker](https://www.docker.com/) och [Vagrant](http://vagrantup.com/) möjliggör att utvecklare kan köra lokala miljöer som mycket tätt liknar produktionsmiljöer. Kostnaden för att installera och använda dessa system är låg i förhållande till fördelarna av likhet mellan miljöer och kontinuerlig produktionssättning. 
Lightweight local services are less compelling than they once were.  Modern backing services such as Memcached, PostgreSQL, and RabbitMQ are not difficult to install and run thanks to modern packaging systems, such as [Homebrew](http://mxcl.github.com/homebrew/) and [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  Alternatively, declarative provisioning tools such as [Chef](http://www.opscode.com/chef/) and [Puppet](http://docs.puppetlabs.com/) combined with light-weight virtual environments such as [Docker](https://www.docker.com/) and [Vagrant](http://vagrantup.com/) allow developers to run local environments which closely approximate production environments. The cost of installing and using these systems is low compared to the benefit of dev/prod parity and continuous deployment.

Adaptrar till olika stödtjänster är fortfarande användbar, eftersom de gör portning till nya stödtjänster relativt smärtfri. Men alla produktionssättningar av applikationen (utvecklarmiljö, acceptanstestsmiljö, produktionsmiljö) bör använda samma typ och version av respektivt stödtjänst.
Adapters to different backing services are still useful, because they make porting to new backing services relatively painless.  But all deploys of the app (developer environments, staging, production) should be using the same type and version of each of the backing services.
