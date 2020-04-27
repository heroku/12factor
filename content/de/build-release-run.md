## V. Build, release, run
### Build- und Run-Phase strikt trennen

Eine [Codebase](./codebase) wird durch drei Phasen in einen (Nicht-Entwicklungs)-Deploy transformiert:

* Die *Build-Phase* ist eine Transformation, die ein Code-Repository in ein ausführbarers Code-Bündel übersetzt, das man auch *Build* nennt. Ausgehend von einer Code-Version eines Commits, der im Deployment-Prozess festgelegt wurde, holt sie [Abhängigkeiten](./dependencies), verpackt sie zum Mitliefern, und kompiliert Binaries und Assets.
* Die *Release-Phase* übernimmt den Build von der Build-Phase und kombiniert ihn mit der zum Deploy passenden [Konfiguration](./config). Der so erzeugte *Release* enthält sowohl den Build, als auch die Konfiguration und kann direkt in einer Ausführungsumgebung ausgeführt werden.

* Die *Run-Phase* (auch "Laufzeit" genannt) führt die App in einer Ausführungsumgebung aus, indem sie eine Menge der [Prozesse](./processes) der App gegen einen ausgewählten Release ausführt.
![Code wird zum Build und zusammen mit einer Konfiguration ergibt sich ein Release](/images/release.png)

**Die Zwölf-Faktor-App trennt strikt zwischen Build-, Release- und Run-Phase.** Es ist nicht möglich, Code-Änderungen zur Laufzeit zu machen, weil es keinen Weg gibt, diese Änderungen zurück in die Build-Phase zu schicken.

Deployment-Werkzeuge bieten meist eine Release-Verwaltung an. Am bekanntesten ist die Funktion auf einen früheren Release zurückzusetzen. Zum Beispiel speichert das Deployment-Werkzeug [Capistrano](https://github.com/capistrano/capistrano/wiki) Releases in einem Unterverzeichnis mit Namen `releases`. Der aktuelle Release ist ein symbolischer Link auf aktuelle Release-Verzeichnis. Mit dem Kommando `rollback` kann einfach und schnell auf einen früheren Release zurückgesetzt werden.

Jeder Release sollte eine eindeutige Release-ID haben, wie zum Beispiel einen Zeitstempel des Releases (`2011-04-06-20:32:17`) oder eine laufende Nummer (`v100`). Releases werden nie gelöscht und ein Release kann nicht verändert werden, wenn er einmal angelegt ist. Jede Änderung erzeugt einen neuen Release.

Builds werden durch die Entwickler der App angestoßen, wenn neuer Code deployt wird. Im Gegensatz dazu kann die Ausführung zur Laufzeit automatisch erfolgen, wenn ein Server neu gebootet wird oder ein abgestürzter Prozess von der Prozessverwaltung neu gestartet wird. Deswegen sollte die Run-Phase auf so wenig bewegliche Teile wie möglich beschränkt sein, denn Probleme, die eine App vom Laufen abhalten, können sie mitten in der Nacht zusammenbrechen lassen, wenn keine Entwickler zur Verfügung stehen. Die Build-Phase kann komplexer sein, denn Fehler sind immer sichtbar für den Entwickler, der den Deploy vorantreibt.
