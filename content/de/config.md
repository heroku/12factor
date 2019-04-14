## III. Konfiguration
### Die Konfiguration in Umgebungsvariablen ablegen

Die *Konfiguration* einer App ist alles, was sich wahrscheinlich zwischen den [Deploys](./codebase) ändern wird (Staging, Produktion, Entwicklungsumgebungen, usw.). Dies umfasst:

* Resource-Handles für Datenbanken, Memcached und andere [unterstützende Dienste](./backing-services)
* Credentials für externe Dienste wie Amazon S3 oder Twitter
* Direkt vom Deploy abhängige Werte wie der kanonische Hostname für den Deploy

Manchmal speichern Apps die Konfiguration als Konstanten im Code. Dies ist eine Verletzung der zwölf Faktoren. Sie fordern **strikte Trennung der Konfiguration vom Code**. Die Konfiguration ändert sich deutlich von Deploy zu Deploy, ganz im Gegensatz zu Code.

Ein Lackmustest, ob eine App die Konfiguration vollständig ausgelagert hat, ist, wenn die Codebase jederzeit als Open Source veröffentlicht werden könnte, ohne Credentials preiszugeben.

Es sei darauf hingewiesen, dass diese Definition von "Konfiguration" die interne Anwendungskonfiguration **nicht einschließt**, wie `config/routes.rb` in Rails oder wie Code-Module [mit Spring verdrahtet sind](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html). Diese Art von Konfiguration ändert sich nicht von Deploy zu Deploy und gehört daher zum Code.


Als Konfiguration könnte man auch Dateien verwenden, die nicht ins Versionsmanagement eingecheckt sind wie `config/database.yml` in Rails. Dies ist eine deutliche Verbesserung gegenüber der Verwendung von Konstanten, die ins Versionsmanagement eingecheckt sind, hat aber Schwächen. Es ist relativ einfach, versehentlich eine Konfigurationsdatei ins Repo einzuchecken. Zusätzlich gibt es Tendenzen, Konfigurationsdateien an verschiedenen Orten und in verschiedenen Formaten zu streuen. Das macht es schwer die Konfiguration von einem Punkt aus zu managen. Desweiteren sind diese Formate oft sprach- oder plattformspezifisch.

**Die Zwölf-Faktor-App speichert die Konfiguration in *Umgebungsvariablen*** (kurz auch *env vars* oder *env*). Umgebungsvariablen von Deploy zu Deploy zu ändern ist einfach; im Gegensatz zu Konfigurationsdateien ist es unwahrscheinlich, dass sie versehentlich ins Code Repository eingecheckt werden und im Gegensatz zu speziellen Konfigurationsdateien oder anderen Konfigurationsmechanismen wie den Java Properties sind sie Sprach- und Betriebssystemunabhängig.

Ein anderer Aspekt des Konfigurationsmanagements ist die Gruppierung. Manchmal sammeln Apps die Konfiguration in benamten Gruppen (oft "Umgebungen" genannt), benannt nach bestimmten Deploys wie zum Beispiel die Umgebungen `development`, `test` und `production` in Rails. Diese Methode skaliert nicht sauber: Je mehr Deploys einer App es gibt, desto mehr Umgebungsnamen werden benötigt, wie zum Beispiel `staging` oder `qa`. Wenn das Projekt noch weiter wächst, könnten Entwickler ihre eigenen speziellen Umgebungen wie `joes-staging` hinzufügen. Am Ende explodiert die Konfiguration kombinatorisch und die Verwaltung der Deploys wird fehleranfällig.

In einer Zwölf-Faktor-App sind Umgebungsvariablen granulare Stellschrauben und vollständig orthogonal zueinander. Sie werden nie als "Umgebungen" zusammengefasst, sondern können für jeden Deploy unabhängig verwaltet werden. Dieses Modell skaliert reibungslos aufwärts, wenn die App sich natürlicherweise über ihre Lebenszeit hinweg auf mehr Deploys ausdehnt.
