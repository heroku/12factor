## III. Config (Konfiguration)
### Lagra konfiguration i miljön

En applikations *konfigration* berör allting som kan tänkas skilja sig mellan kodsläpp (acceptanstestnings-, produktions-, utvecklingsmiljöer etc). Detta inkluderar:

* Resurslänkar till databasen, minnescachning och andra [stödtjänster](./backing-services)
* Inloggningsuppgifter mot externa tjänster såsom Amazon S3 eller Twitter
* Produktionssättningsspecifika värden som exempelvis vedertagna värdnamn

Applikationer sparar ibland konfiguration som konstanter i koden. Detta är ett brott mot tolvfaktor-modellen, som kräver en **strikt uppdelning mellan konfiguration och kod**. Konfiguration varierar avsevärt mellan kodsläpp, kod gör det inte.

Ett litmustest för om en applikation har all konfiguration korrekt separarerad från koden är om kodbasen skulle kunna göras om till öppen källkod när som helst, utan att avslöja några inloggningsuppgifter.

Denna definition av "konfiguration" behöver dock **inte** inkludera intern konfiguration för applikationen, som exempelvis `config/routes.rb` i Rails, eller på vilket sätt [kodmoduler sammankopplas](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) i [Spring](http://spring.io/). Denna typ av konfiguration varierar inte mellan kodsläpp, och görs sig därför bäst i koden.

Ett annat synsätt på konfiguration är att använda sig av konfigurationsfiler som inte checkas in i versionshanteringen, exempelvis `config/database.yml` i Rails. Detta är fortfarande en enorm förbättring över att använda konstanter som checkas in i kodrepot, men har fortfarande svagheter: det är lätt att av misstag checka in en konfigurationsfil i repot; det finns en tendens för filerna att spridas ut på olika ställen och i olika format, vilket gör det svårt att överblicka och hantera alla konfigurationer på ett och samma ställe. Vidare så tenderar format på konfigurationsfiler att vara språk- eller ramverks-specifika.

**Tolvfaktor-applikationer lagrar konfiguration i *miljövariabler*** (ofta förkortade till eng. *env vars* eller *env*). Miljövariabler är lätta att byta mellan kodsläpp utan att ändra någon kod. Till skillnad mot konfigurationsfiler finns det liten chans att av misstag checka in dem i kodrepot, till skillnad från skräddarsydda konfigurationsfiler eller andra konfigurationsmekanismer såsom Java systemegenskaper. De är också vanligtvis språk- och operativsystems-agnostiska.

En annan aspekt av konfigurationshantering är gruppering. Ibland grupperar applikationer inställningar i namngivna grupper (ofta kallade "miljöer") som benämns utifrån specifika kodsläpp, såsom `development`-, `test`-, och `production`-miljöer i Rails. Denna metod skalar inte upp på ett enkelt sätt: i takt med att det skapas fler kodsläpp, blir nya miljönamn nödvändiga, såsom `staging` eller `qa`. Ju mer projektet växer desto mer ökar risken att utvecklare skapar deras egna specialmiljöer såsom `joes-staging`, vilket resulterar i en kombinationsmässig explosion av konfigurationer vilket gör hantering av kodsläpp väldigt svårgenomfört.

I en tolvfaktor-applikation fungerar miljövariabler som finkornig kontroll, var och en separat från andra miljövariabler. De grupperas aldrig samman som "miljöer" utan är istället självständigt hanterade för respektive kodsläpp. Detta ger en modell som skalar upp på ett smidigt sätt i takt med att applikationen växer under fler kodsläpp under dess livstid.
