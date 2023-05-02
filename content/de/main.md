## Einführung

Heute wird Software oft als Dienst geliefert - auch *Web App* oder *Software-As-A-Service* genannt. Die Zwölf-Faktoren-App ist eine Methode um Software-As-A-Service Apps zu bauen die:

* **deklarative** Formate benutzen für die Automatisierung der Konfiguration, um Zeit und Kosten für neue Entwickler im Projekt zu minimieren;
* einen **sauberen Vertrag** mit dem zugrundeliegenden Betriebssystem haben, **maximale Portierbarkeit** zwischen Ausführungsumgebungen bieten;
* sich für das **Deployment** auf modernen **Cloud-Plattformen** eignen, die Notwendigkeit von Servern und Serveradministration vermeiden;
* die **Abweichung minimieren** zwischen Entwicklung und Produktion, um **Continuous Deployment** für maximale Agilität ermöglichen;
* und **skalieren** können ohne wesentliche Änderungen im Tooling, in der Architektur oder in den Entwicklungsverfahren.

Die Zwölf-Faktoren-Methode kann auf Apps angewendet werden, die in einer beliebigen Programmiersprache geschrieben sind, und die eine beliebige Kombination von unterstützenden Diensten benutzen (Datenbank, Queue, Cache, ...)

## Hintergrund

Die Mitwirkenden an diesem Dokument waren direkt beteiligt an der Entwicklung und dem Deployment von hunderten von Apps und wurden Zeugen bei der Entwicklung, beim Betrieb und der Skalierung von hunderttausenden von Apps im Rahmen unserer Arbeit an der [Heroku](http://www.heroku.com/)-Plattform.

Dieses Dokument ist eine Synthese all unserer Erfahrungen und der Beobachtungen einer großen Bandbreite von Software-As-A-Service Apps. Es ist eine Bestimmung der idealen Praktiken bei der App-Entwicklung mit besonderem Augenmerk auf die Dynamik des organischen Wachstums einer App über die Zeit, die Dynamik der Zusammenarbeit zwischen den Entwicklern die an einer Codebase zusammenarbeiten und der [Vermeidung der Kosten von Software-Erosion](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

Unsere Motivation ist, das Bewusstsein zu schärfen für systembedingte Probleme in der aktuellen Applikationsentwicklung, ein gemeinsames Vokabular zur Diskussion dieser Probleme zu liefern und ein Lösungsportfolio zu diesen Problemen mit einer zugehörigen Terminologie anzubieten. Das Format ist angelehnt an Martin Fowlers Bücher *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* und *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*. 

## Wer sollte dieses Dokument lesen?

Jeder Entwickler der Apps baut, die als Dienst laufen. Administratoren, die solche Apps managen oder deployen.
