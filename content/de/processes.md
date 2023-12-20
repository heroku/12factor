## VI. Prozesse
### Die App als einen oder mehrere Prozesse ausführen

Die App wird als ein oder mehrere *Prozesse* ausgeführt.

Im einfachsten Fall ist der Code ein Stand-alone-Skript, die Ausführungsumgebung ist der lokale Laptop eines Entwicklers mit einer installierten Laufzeitumgebung einer Sprache, und der Prozess wird von der Kommandozeile gestartet (zum Beispiel `python my_script.py`). Am anderen Ende des Spektrums kann eine hochentwickelte App viele [Prozesstypen benutzen, die in keinen oder mehreren Prozessen laufen](./concurrency).

**Zwölf-Faktor-Apps sind zustandslos und [Shared Nothing](https://de.wikipedia.org/wiki/Shared_Nothing_Architecture).**  Alle Daten werden in [unterstützenden Diensten](./backing-services) gespeichert, normalerweise einer Datenbank.

Der RAM oder das Dateisystem des Prozesses kann als kurzfristiger Cache für die Dauer einer Transaktion verwendet werden. Zum Beispiel kann ein Prozess eine Datei herunterladen, sie verarbeiten und die Ergebnisse in einer Datenbank speichern. Die Zwölf-Faktor-App geht nie davon aus, dass irgendetwas aus dem RAM oder im Dateisystem zwischengespeichertes für einen künftigen Request oder Job verfügbar sein wird. Es ist gut möglich, dass ein künftiger Request von einem anderen Prozess bedient wird. Selbst wenn nur ein Prozess läuft, wird ein Neustart (verursacht durch Code Deployment, Konfigurationsänderung oder der Verlagerung der Ausführungsumgebung auf einen anderen physikalischen Ort) den gesamten lokalen Zustand (RAM und Dateisystem) löschen.

Asset-Paketierer (wie [Jammit](http://documentcloud.github.com/jammit/) oder [django-compressor](http://django-compressor.readthedocs.org/)) benutzen das Dateisystem als Cache für kompilierte Assets. Eine Zwölf-Faktor-App wie die [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) würde diese Art von Kompilation eher in der [Build-Phase](./build-release-run) erledigen anstatt zur Laufzeit.

Manche Web-Systeme verlassen sich auf ["Sticky Sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- sie cachen Benutzer-Session-Daten im RAM des App-Prozesses und erwarten, dass künftige Requests desselben Benutzers zum selben Prozess geschickt werden. Sticky Sessions sind eine Verletzung der zwölf Faktoren und eine guter Kandidat für einen Datenspeicher, der ein zeitabhängiges Löschen anbietet, wie [Memcached](http://memcached.org/) oder [Redis](http://redis.io/).
