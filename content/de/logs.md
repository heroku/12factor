## XI. Logs
### Logs als Strom von Ereignissen behandeln

*Logs* machen das Verhalten einer laufenden App sichtbar. In Server-basierten Umgebungen werden sie üblicherweise in eine Datei auf der Platte geschrieben (eine Logdatei) - das ist aber nur ein Ausgabeformat.

Logs sind der [Stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) von aggregierten, nach Zeit sortierten Ereignissen und zusammengefasst aus den Output Streams aller laufenden Prozesse und unterstützenden Dienste. Logs in ihrer rohen Form sind üblicherweise ein Textformat mit einem Ereignis pro Zeile (obwohl Backtraces von Exceptions über mehrere Zeilen gehen können)

**Eine Zwölf-Faktor-App kümmert sich nie um das Routing oder die Speicherung ihres Output Streams.** Sie sollte nicht versuchen, in Logdateien zu schreiben oder diese zu verwalten. Statt dessen schreibt jeder laufende Prozess seinen Stream von Ereignissen ungepuffert auf `stdout`. Bei einem lokalen Deployment sichtet ein Entwickler diesen Stream im Vordergrund seines Terminals um das Verhalten der App zu beobachten.

Auf Staging- oder Produktionsdeploys werden die Streams aller Prozesse von der Laufzeitumgebung erfasst, mit allen anderen Streams der App zusammengefasst und zu einem oder mehreren Zielen geleitet, zur Ansicht oder langzeitigen Archivierung. Diese Archivierungsziele sind für die App weder sichtbar noch konfigurierbar - sie werden vollständig von der Laufzeitumgebung aus verwaltet. Open-Source Log Router (wie [Logplex](https://github.com/heroku/logplex) und [Fluentd](https://github.com/fluent/fluentd)) stehen dafür zur Verfügung.

Der Stream von Ereignissen für eine App kann in eine Datei geleitet werden oder mit einem Echtzeit-Tail in einem Terminal beobachtet werden. Sehr bedeutsam ist es, das der Stream in ein Log-Indexierungs- und Analyse-System wie [Splunk](http://www.splunk.com/) oder in ein allgemein verwendbares Data-Warehouse-System wie [Hadoop/Hive](http://hive.apache.org/) gelenkt werden kann. Mit diesem System kann das Verhalten einer App leistungsfähig und flexibel beobachtet werden. Dies schließt ein:

* Bestimmte Ereignisse in der Vergangenheit zu finden
* Umfangreiche graphische Darstellungen (wie Requests pro Minute)
* Aktives Alarmieren aufgrund benutzerdefinierter Heuristiken (wie ein Alarm wenn die Anzahl von Fehlern pro Minute eine gewisse Grenze überschreitet)
