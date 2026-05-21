## XI. Logs
### Behandel logs als event streams

*Logs* geven inzicht in het gedrag van een draaiende app. In server-gebaseerde omgevingen worden ze gewoonlijk naar een bestand op schijf geschreven (een "logfile"); maar dit is slechts een uitvoerformaat.

Logs zijn de [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) van geaggregeerde, tijdsgeordende gebeurtenissen verzameld uit de uitvoerstromen van alle draaiende processen en backing services. Logs in hun ruwe vorm zijn typisch een tekstformaat met één gebeurtenis per lijn (hoewel backtraces van uitzonderingen meerdere lijnen kunnen beslaan). Logs hebben geen vast begin of einde, maar stromen continu door zolang de app actief is.

**Een 12-factor app houdt zich nooit bezig met het routeren of opslaan van zijn uitvoerstroom.** Hij moet niet proberen te schrijven naar logfiles of deze te beheren. In plaats daarvan schrijft elk draaiend proces zijn event stream, ongebufferd, naar `stdout`. Tijdens lokale ontwikkeling, zal de ontwikkelaar deze stroom op de voorgrond van zijn terminal bekijken om het gedrag van de app te observeren.

In staging of productie implementaties, zal de stream van elk proces worden opgevangen door de executie omgeving, samengevoegd met alle andere streams van de app, en gerouteerd worden naar een of meer eindbestemmingen om te bekijken en op lange termijn te archiveren. Deze archiveringsbestemmingen zijn niet zichtbaar voor of configureerbaar door de app, en worden in plaats daarvan volledig beheerd door de executie-omgeving. Open-source logrouters (zoals [Logplex](https://github.com/heroku/logplex) en [Fluentd](https://github.com/fluent/fluentd)) zijn beschikbaar voor dit doel.

De event stream voor een app kan worden gerouteerd naar een bestand, of worden bekeken via realtime tail in een terminal. Het belangrijkste is dat de stroom kan worden verzonden naar een logindexerings- en analysesysteem zoals [Splunk](http://www.splunk.com/), of een datawarehousing systeem voor algemene doeleinden zoals [Hadoop/Hive](http://hive.apache.org/). Deze systemen bieden een grote kracht en flexibiliteit voor het introspecteren van het gedrag van een app in de tijd, inclusief:

* Het vinden van specifieke gebeurtenissen in het verleden.
* Grafieken op grote schaal van trends (zoals verzoeken per minuut).
* Actieve alarmering volgens door de gebruiker gedefinieerde heuristiek (zoals een waarschuwing wanneer het aantal fouten per minuut een bepaalde drempel overschrijdt).