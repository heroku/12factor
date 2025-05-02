## III. Configuratie
### Config opslaan in de omgeving

De *config* van een app is alles wat waarschijnlijk varieert tussen [deploys](./codebase) (staging, productie, ontwikkelomgevingen, etc).  Dit omvat:

* Resource handles naar de database, Memcached, en andere [backing-services](./backing-services)
* Credentials naar externe diensten zoals Amazon S3 of Twitter
* Per-deploy waarden zoals de canonieke hostnaam voor de deploy

Apps slaan soms config op als constanten in de code. Dit is een schending van de 12-factors, die **strikte scheiding van config en code** vereist. Config varieert aanzienlijk tussen deploys, code niet.

Een lakmoesproef voor het feit of een app alle configuratie correct uit de code heeft gehaald, is of de codebase op elk moment open source kan worden gemaakt, zonder de credentials te compromitteren.

Merk op dat deze definitie van "config" **niet** interne applicatie config omvat, zoals `config/routes.rb` in Rails, of hoe [code modules zijn verbonden](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) in [Spring](http://spring.io/). Dit type van configuratie varieert niet tussen deploys, en wordt dus best in de code gedaan.

Een andere benadering van config is het gebruik van config bestanden die niet ingecheckt worden in revisie controle, zoals `config/database.yml` in Rails. Dit is een enorme verbetering ten opzichte van het gebruik van constanten die in de code repo worden ingecheckt, maar heeft nog steeds zwakke punten: het is gemakkelijk om per ongeluk een config bestand in de repo in te checken; er is een neiging voor config bestanden om verspreid te zijn over verschillende plaatsen en verschillende formaten, wat het moeilijk maakt om alle config op één plaats te zien en te beheren. Verder hebben deze formaten de neiging programmeertaal- of framework-specifiek te zijn.

**De 12-factor app slaat de configuratie op in *environment variables*** (vaak afgekort tot *env vars* of *env*).  Env vars zijn gemakkelijk te veranderen tussen deploys zonder code te veranderen; in tegenstelling tot config files, is er weinig kans dat ze per ongeluk in de code repo ingecheckt worden; en in tegenstelling tot custom config files, of andere config mechanismen zoals Java System Properties, zijn ze een programmeertaal- en OS-agnostische standaard.

Een ander aspect van config management is groeperen. Soms groeperen apps hun config in benoemde groepen (vaak "omgevingen" genaamd), genoemd naar specifieke deploys, zoals de `development`, `test`, en `production` omgevingen in Rails. Deze methode schaalt niet netjes: als meer deploys van de app worden gemaakt, zijn nieuwe omgevingsnamen nodig, zoals `staging` of `qa`. Als het project verder groeit, kunnen ontwikkelaars hun eigen speciale omgevingen toevoegen, zoals `joes-staging`, wat resulteert in een combinatorische explosie van config die het beheren van deploys van de app erg broos maakt.

In een 12-factor app, zijn env vars granulaire controls, elk volledig orthogonaal aan andere env vars. Ze worden nooit gegroepeerd als "omgevingen", maar worden in plaats daarvan onafhankelijk beheerd voor elke implementatie. Dit is een model dat soepel opschaalt naarmate de app zich op natuurlijke wijze uitbreidt naar meer implementaties gedurende zijn levensduur.