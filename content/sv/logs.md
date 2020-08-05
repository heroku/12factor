## XI. Logs (loggar)
### Behandla logga som flöden av händelser

*Loggar* erbjuder synlighet in i beteendet av en körande applikation. I en server-baserad miljö skrivs de vanligtvis till en fil på disken (en "loggfil") men detta är bara ett utformat.
*Logs* provide visibility into the behavior of a running app.  In server-based environments they are commonly written to a file on disk (a "logfile"); but this is only an output format.

Loggar är [strömmen](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) av händelser, ordnade efter tid, som sammanställs från utdataströmmar från alla körande processer och stödtjänster. Loggar i dess råa form är vanligtvis i textformat med en händelse per rad (även om åt återblickar (eng. "backtrace") av kastade fel kan ligga över flera rader. Loggar har ingen fixerad början eller slut utan flödar kontinuerligt så länga applikationen körs.
Logs are the [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) of aggregated, time-ordered events collected from the output streams of all running processes and backing services.  Logs in their raw form are typically a text format with one event per line (though backtraces from exceptions may span multiple lines).  Logs have no fixed beginning or end, but flow continuously as long as the app is operating.

**En tolvfaktorapplikation bryr sig aldrig själv om ruttning eller lagring av dess utdataström.** Den bör inte försöka att skriva eller hantera loggfiler. Istället skriver varje körande process sin egen ström, obuffrad, till `stdout`. Under lokal utveckling kan utvecklaren granska denna ström i förgrunden av sin terminal för att observera applikationens beteende.
**A twelve-factor app never concerns itself with routing or storage of its output stream.**  It should not attempt to write to or manage logfiles.  Instead, each running process writes its event stream, unbuffered, to `stdout`.  During local development, the developer will view this stream in the foreground of their terminal to observe the app's behavior.

I acceptansmiljö och produktionsmiljö fångas varje process ström upp av den exekverande miljön, sammanställt med alla andra strömmar från applikationen och ruttar till en eller flera slutdestinationer för granskning eller långsiktig arkivering. Dessa arkivdestinationer är inte synliga för eller konfigurerbara för applikationen, och är istället helt och håller hanterade av den exekverande miljön. Öppna hanterare för ruttning av loggar (såsom [Logplex](https://github.com/heroku/logplex) och [Fluentd](https://github.com/fluent/fluentd)) finns tillgängliga för just detta syfte.
In staging or production deploys, each process' stream will be captured by the execution environment, collated together with all other streams from the app, and routed to one or more final destinations for viewing and long-term archival.  These archival destinations are not visible to or configurable by the app, and instead are completely managed by the execution environment.  Open-source log routers (such as [Logplex](https://github.com/heroku/logplex) and [Fluentd](https://github.com/fluent/fluentd)) are available for this purpose.

Händelseströmmen för en applikation kan ruttas till en fil, eller granskas i realtid i en terminal. Mest betydelsefullt är att strömmen kan skickas till ett logg-indexerande och analyserande system såsom [Splunk](http://www.splunk.com/), eller ett mer  universellt datalagringssystem som [Hadoop/Hive](http://hive.apache.org/). Dessa system möjliggör stor effekt och flexibilitet för granskning av en applikations beteende över tid, inkluderande:
The event stream for an app can be routed to a file, or watched via realtime tail in a terminal.  Most significantly, the stream can be sent to a log indexing and analysis system such as [Splunk](http://www.splunk.com/), or a general-purpose data warehousing system such as [Hadoop/Hive](http://hive.apache.org/).  These systems allow for great power and flexibility for introspecting an app's behavior over time, including:

* Hitta specifika tidigare händelser.
* Finding specific events in the past.
* Storskalig graf-framtagning av trender (såsom anrop per minut).
* Large-scale graphing of trends (such as requests per minute).
* Aktiv notifiering av användardefinierat kunskapsbildande (såsom en notis när antalet fel per minut överstiger ett viss gränsvärde)
* Active alerting according to user-defined heuristics (such as an alert when the quantity of errors per minute exceeds a certain threshold).
