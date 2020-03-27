## III. Config (Konfiguration)
### Lagra konfiguration i miljön

En applikations *konfigration* berör allting som kan tänkas skilja sig mellan kodsläpp (acceptanstestnings-, produktions-, utvecklings-miljöer etc) Detta inkluderar:
An app's *config* is everything that is likely to vary between [deploys](./codebase) (staging, production, developer environments, etc).  This includes:

* Resurshantering mot databasen, minnescachning och andra [stödtjänster](./backing-services)
* Resource handles to the database, Memcached, and other [backing services](./backing-services)
* Inloggningsuppgifter mot externa tjänster såsom Amazon S3 eller Twitter
* Credentials to external services such as Amazon S3 or Twitter
* Värden relaterade till specifika kodsläpp som exempelvis vedertagna värdnamn
* Per-deploy values such as the canonical hostname for the deploy

Applikationer sparar ibland konfiguration som konstanter i koden. Detta är ett brott mot tolvfaktor-modellen, som kräver en **strikt uppdelning mellan konfigration och kod**. Konfiguration varierar avsevärt mellan kodsläpp, kod gör det inte.
Apps sometimes store config as constants in the code.  This is a violation of twelve-factor, which requires **strict separation of config from code**.  Config varies substantially across deploys, code does not.

Ett litmustest för om en applikation har all konfiguration separarerad från koden är om kodbasen skulle kunna göras om till öppen källkod när som helst, utan att avslöja några inloggningsuppgifter.
A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

Var god märkt att denna definition av "konfiguration" behöver **inte** inkludera intern konfiguration för applikationen, som exempelvis `config/routes.rb` i Rails, eller på vilket sätt [kodmoduler sammankopplas](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) i [Spring](http://spring.io/). Denna typ av konfiguration varierar inte mellan kodsläpp, och görs sig därför bäst i koden.
Note that this definition of "config" does **not** include internal application config, such as `config/routes.rb` in Rails, or how [code modules are connected](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) in [Spring](http://spring.io/).  This type of config does not vary between deploys, and so is best done in the code.

Ett annat angreppssätt till konfiguration är att använda sig av konfigurationsfiler som inte checkas in i versionshanteringen, exempelvis `config/database.yml` i Rails. Detta är fortfarande en enorm förbättring över att använda konstanter som checkas in i kodrepot, men har fortfarande svagheter: det är lätt att av misstag checka in en konfigurationsfil i repot; det finns en tendens för konfigurationsfiler att spridas ut på olika ställen och olika format, vilket gör det svårt att överblicka och hantera alla konfigurationer på ett och samma ställa. Vidare så tenderar format på konfigurationsfiler att vara språk- eller ramverks-specifika.
Another approach to config is the use of config files which are not checked into revision control, such as `config/database.yml` in Rails.  This is a huge improvement over using constants which are checked into the code repo, but still has weaknesses: it's easy to mistakenly check in a config file to the repo; there is a tendency for config files to be scattered about in different places and different formats, making it hard to see and manage all the config in one place.  Further, these formats tend to be language- or framework-specific.

**Tolvfaktor-applikationer lagrar konfiguration i *miljövariabler*** (ofta förkortade till *env vars* eller *env*). Miljövariabler är lätta att byta mellan kodsläpp utan att ändra någon kod; till skillnad mot konfigurationsfiler, det finns liten chans att av misstag checka in dem i kodrepot; och till skillnad från skräddarsydda konfigurationsfiler eller andra konfigurationsmekanismer såsom Java systemegenskaper, och de är vanligtvis språk- och operativsystems-agnostiska.
**The twelve-factor app stores config in *environment variables*** (often shortened to *env vars* or *env*).  Env vars are easy to change between deploys without changing any code; unlike config files, there is little chance of them being checked into the code repo accidentally; and unlike custom config files, or other config mechanisms such as Java System Properties, they are a language- and OS-agnostic standard.

En annan aspekt av konfigurationshantering är gruppering. Ibland grupperar applikationer inställningar i namngivning grupper (ofta kallade "miljöer") som benämns utifrån specifika kodsläpp, såsom `development`-, `test`-, och `production`-miljöer i Rails. Denna metod skalar inte enkelt: i takt med att det skapas fler kodsläpp, blir nya miljönamn nödvändiga, såsom `staging` eller `qa`. Ju mer projektet växer desto mer ökar risken att utvecklare skapar deras egna specialmiljöer såsom `joes-staging`, vilket resulterar i en kombinationsmässig explosion av konfiguration vilket gör hantering av kodsläpp väldigt svårgenomfört.
Another aspect of config management is grouping.  Sometimes apps batch config into named groups (often called "environments") named after specific deploys, such as the `development`, `test`, and `production` environments in Rails.  This method does not scale cleanly: as more deploys of the app are created, new environment names are necessary, such as `staging` or `qa`.  As the project grows further, developers may add their own special environments like `joes-staging`, resulting in a combinatorial explosion of config which makes managing deploys of the app very brittle.

I en tolvfaktor-applikation, fungerar miljövariabler som finkornig kontroll, var och en särskild från andra miljövariabler. De grupperas aldrig samman som "miljöer" utan istället självständigt hanterade för respektive kodsläpp. Detta ger en modell som skalar upp på ett smidigt sätt 
In a twelve-factor app, env vars are granular controls, each fully orthogonal to other env vars.  They are never grouped together as "environments", but instead are independently managed for each deploy.  This is a model that scales up smoothly as the app naturally expands into more deploys over its lifetime.
