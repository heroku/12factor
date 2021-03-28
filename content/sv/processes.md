## VI. Arbetsprocesser (Processes)
### Exekvera applikationen som en eller flera tillståndslösa processer

Applikationen körs i arbetsmiljön som en eller flera *processer*.

I det enklaste fallet körs koden som ett självständigt skript. Arbetsmiljön är då en utvecklares lokala dator med en installerad körrutin för utvecklingsspråket, och processen startas via ett terminalkommando (till exempel `python myscript.py`). På andra sidan av spektrat kan en produktionssättning av en sofistikerad applikation använda många [processtyper som instansieras i noll eller flera rullande körprocesser](./concurrency).

**Tolvfaktorprocesser är tillståndslösa (eng. stateless) och [delar inget](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  All data som behöver sparas ner måste lagras i en tillståndsrik [stödtjänst](./backing-services) (eng. stateful), vanligtvis en databas.

Minnesutrymmet eller filsystemet för processen kan användas som kortvariga, enkla cachestransaktioner. Till exempel, att ladda ner en större fil, utföra operationer på den, och lagra resultatet av operationerna i databasen. Tolvfaktorapplikationen förutsätter aldrig att något cachas i minne eller att en disk kommer vara tillgänglig i framtida anrop eller jobb -- med många processer av respektive typ igång är risken hög att framtida anrop kommer att behandlas av en helt annan process. Även när man kör en enda process kommer en omstart (initierad av en produktionssättning, en konfigurationsändring eller att arbetsmiljön flyttar en process till en annan fysisk plats) vanligtvis radera alla lokala tillstånd (ex. minne och filsystem).

Tillgångspaketerare som ex. [django-assetpackager](http://code.google.com/p/django-assetpackager/) använder filsystemet som en cache för kompilerade tillgångar. En tolvfaktorapplikation föredrar att göra denna typ av kompilering under [byggstadiet](/build-release-run). Tillgångspaketerare som ex. [Jammit](http://documentcloud.github.com/jammit/) och [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) kan konfigureras till att paketera tillgångar under byggstadiet.

Vissa webbsystem förlitar sig på ["fästa sessioner"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) (eng. sticky sessions) -- dvs, caching av användarens sessionsdata för applikationens process i minnet och förväntar sig att framtida anrop från samma anropare kommer att styras till samma process. Fästa sessioner bryter mot tolvfaktormodellen och bör aldrig användas eller förlitas på. Sessionens tillståndsdata är en god kandidat för hanteras av datalagring som möjliggör tidsbegränsning, som ex. [Memcached](http://memcached.org/) eller [Redis](http://redis.io/).
