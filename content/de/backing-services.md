## IV. Unterstützende Dienste
### Unterstützende Dienste als angehängte Ressourcen behandeln

Ein *unterstützender Dienst* ist jeder Dienst, den die App über das Netzwerk im Rahmen ihrer normalen Arbeit konsumiert. Beispiele sind Datenspeicher  (wie [MySQL](http://dev.mysql.com/) oder [CouchDB](http://couchdb.apache.org/)), Messaging/Queueing-Systeme (wie [RabbitMQ](http://www.rabbitmq.com/) oder [Beanstalkd](https://beanstalkd.github.io)), SMTP-Dienste für das Senden von Mail (wie [Postfix](http://www.postfix.org/)), und Cache-Systeme (wie [Memcached](http://memcached.org/)).

Unterstützende Dienste wie Datenbanken werden traditionell von denselben Systemadministratoren verwaltet, die die App deployen. Außer diesen intern verwalteten Diensten können der App auch von Dritten verwaltete Dienste zur Verfügung stehen. Dazu gehören SMTP-Dienste (wie [Postmark](http://postmarkapp.com/)), Metrik-Sammler (wie [New Relic](http://newrelic.com/) oder [Loggly](http://www.loggly.com/)), Binary-Asset-Dienste (wie [Amazon S3](http://aws.amazon.com/s3/)), und auch über eine API zugängliche Dienste (wie [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), oder [Last.fm](http://www.last.fm/api)).

**Der Code einer Zwölf-Faktor-App macht keinen Unterschied zwischen lokalen Diensten und solchen von Dritten.** Für die App sind sie beide unterstützende Dienste, zugreifbar über eine URL oder andere Lokatoren/Credentials, die in der [Konfiguration](./config) gespeichert sind. Ein [Deploy](./codebase) einer Zwölf-Faktoren-App könnte eine lokale MySQL-Datenbank, durch eine von Dritten zur Verfügung gestellten, ersetzen (wie [Amazon RDS](http://aws.amazon.com/rds/)). Genauso ohne Codeänderung kann ein lokaler SMTP-Server durch einen von Dritten zur Verfügung gestellten SMTP-Dienst ersetzt werden. In beiden Fällen muss sich nur der Resource-Handle in der Konfiguration ändern.

Jeder einzelne unterstützende Dienst ist eine *Ressource*. So ist zum Beispiel eine MySQL-Datenbank eine Ressource; zwei MySQL-Datenbanken (die für ein Sharding auf Applikationsebene verwendet werden) stellen zwei Ressourcen dar. Dass die Zwölf-Faktor-App diese Datenbanken als *angehängte Ressourcen* behandelt, zeigt ihre lose Kopplung, zu dem Deploy an dem sie hängen.

<img src="/images/attached-resources.png" class="full" alt="Ein Produktions-Deploy der an vier unterstützenden Diensten hängt." />

Ressourcen können beliebig an Deploys an- und abgehängt werden. Wenn zum Beispiel die Datenbank einer App aufgrund von Hardwareproblemen aus der Rolle fällt, könnte der App-Administrator eine neue Datenbank aus einem Backup aufsetzen. Die aktuelle Produktionsdatenbank könnte abgehängt und die neue Datenbank angehängt werden -- ganz ohne Codeänderung.
