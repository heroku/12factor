## XI. Logs (Loggar)
### Behandla logga som flöden av händelser

*Loggar* erbjuder insikt i beteendet av en körande applikation. I en server-baserad miljö skrivs de vanligtvis till en fil på disken (en "loggfil") men detta är bara ett utformat.

Loggar är [strömmen](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) av aggregerade händelser, ordnade efter tid, som sammanställs från utdataströmmarna från alla körande processer och stödtjänster. Loggar i dess råa form är vanligtvis i textformat med en händelse per rad (även om återblickar (eng. "backtrace") av kastade fel kan ligga över flera rader. Loggar har ingen fixerad början eller slut utan flödar kontinuerligt så länge applikationen körs.

**En tolvfaktorapplikation bryr sig aldrig själv om ruttning eller lagring av dess utdataström.** Den bör inte försöka att skriva eller hantera loggfiler. Istället skriver varje körande process sin egen ström, obuffrad, till `stdout`. Under lokal utveckling kan utvecklaren granska denna ström i ett terminalfönster för att observera applikationens beteende.

I acceptanstestmiljö och produktionsmiljö fångas varje process ström upp av den exekverande miljön, sammanställt med alla andra strömmar från applikationen och ruttar till en eller flera slutdestinationer för granskning eller långvarig arkivering. Dessa arkivdestinationer är inte synliga för eller konfigurerbara för applikationen, och är istället helt och håller hanterade av den exekverande miljön. Öppna hanterare för ruttning av loggar (såsom [Logplex](https://github.com/heroku/logplex) och [Fluentd](https://github.com/fluent/fluentd)) finns tillgängliga för just detta syfte.

Händelseströmmen för en applikation kan ruttas till en fil, eller granskas i realtid i ett terminalfönster. Överordnat annat är att strömmen kan skickas till ett logg-indexerande och analyserande system såsom [Splunk](http://www.splunk.com/), eller ett mer  universellt datalagringssystem som [Hadoop/Hive](http://hive.apache.org/). Dessa system möjliggör stor effekt och flexibilitet för granskning av en applikations beteende över tid, vilket inkluderar:

* Hitta specifika tidigare händelser.
* Storskalig graf-framtagning av trender (såsom anrop per minut).
* Aktiv notifiering, enligt användardefinierade regler (såsom ett larm när antalet fel per minut överstiger ett visst gränsvärde)
