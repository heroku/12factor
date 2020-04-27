##X. Dev-Prod-Vergleichbarkeit
### Entwicklung, Staging und Produktion so ähnlich wie möglich halten

Historisch gibt es große Lücken zwischen Entwicklung (wo ein Entwickler live an einem lokalen [Deploy](./codebase) der App Änderungen macht) und Produktion (ein laufender Deploy der App, auf den Endbenutzer zugreifen). Diese Lücken zeigen sich auf drei Gebieten:

* **Die Zeit-Lücke** Ein Entwickler arbeitet an Code der Tage, Wochen oder sogar Monate braucht um in Produktion zu gehen.
* **Die Personal-Lücke**: Entwickler schreiben Code, Operatoren deployen ihn.
* **Die Werkzeug-Lücke**: Entwickler nutzen vielleicht einen Stack wie Nginx, SQLite und OS X - die Produktion nutzt Apache, MySQL und Linux.

**Die Zwölf-Faktor-App ist ausgelegt auf [Continuous Deployment](http://avc.com/2011/02/continuous-deployment/) indem sie die Lücke zwischen Entwicklung und Produktion klein hält.** Mit Blick auf die oben beschriebenen drei Lücken:

* Die Zeit-Lücke klein halten: Ein Entwickler kann Code schreiben, der Stunden oder sogar Minuten später deployed wird.
* Die Personal-Lücke klein halten: Entwickler die Code schreiben sind intensiv am Deployment und der Überwachung des Verhaltens auf Produktion beteiligt.
* Die Werkzeug-Lücke klein halten: Entwicklung und Produktion so ähnlich wie möglich halten.

Das Gesagte in einer Tabelle:

<table>
  <tr>
    <th></th>
    <th>Traditionelle App</th>
    <th>Zwölf-Faktor-App</th>
  </tr>
  <tr>
    <th>Zeit zwischen Deployments</th>
    <td>Wochen</td>
    <td>Stunden</td>
  </tr>
  <tr>
    <th>Code-Autoren und Code-Deployer</th>
    <td>Andere Menschen</td>
    <td>Dieselben Menschen</td>
  </tr>
  <tr>
    <th>Entwicklungs- und Produktions-Umgebung</th>
    <td>Unterschiedlich</td>
    <td>So ähnlich wie möglich</td>
  </tr>
</table>

Im Bereich der [unterstützenden Dienste](./backing-services) wie der Datenbank der App, dem Queue-System oder dem Cache ist die Dev-Prod-Vergleichbarkeit wichtig. Viele Sprachen bieten Bibliotheken, die den Zugriff auf die unterstützenden Dienste vereinfachen und ebenso *Adapter* für unterschiedliche Arten von Diensten.

<table>
  <tr>
    <th>Art</th>
    <th>Sprache</th>
    <th>Bibliothek</th>
    <th>Adapter</th>
  </tr>
  <tr>
    <td>Datenbank</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Queue</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Speicher, Dateisystem, Memcached</td>
  </tr>
</table>

Für Entwickler ist es sehr elegant, einen leichtgewichtigen unterstützenden Dienst in der lokalen Umgebung zu benutzen, während ein ernst zu nehmender und robuster unterstützender Dienst in Produktion verwendet wird. So kann man SQLite lokal und PostgreSQL in Produktion benutzen; oder zum Cachen den lokalen Speicher in Entwicklung und Memcached in Produktion.

**Der Zwölf-Faktor-Entwickler widersteht dem Drang, verschiedene unterstützende Dienste in Entwicklung und Produktion zu verwenden**, selbst wenn Adapter über alle Unterschiede hinweg abstrahieren. Unterschiede zwischen den unterstützenden Diensten verursachen kleinste Inkompatiblitäten, und Code, der in Entwicklung oder Staging funktioniert und Tests besteht, scheitert in Produktion. Diese Reibungskosten und die dann notwendige Dämpfung des Continuous Deployment sind sehr hoch, wenn man sie über die Lebensdauer einer App aggregiert.

Leichtgewichtige lokale Dienste überzeugen weniger als früher. Moderne unterstützende Dienste wie Memcached, PostgreSQL und RabbitMQ sind dank moderner Paketierungs-Systeme wie [Homebrew](http://mxcl.github.com/homebrew/) und [apt-get](https://help.ubuntu.com/community/AptGet/Howto) nicht schwierig zu installieren und zu starten. Auch deklarative Installationssysteme wie [Chef](http://www.opscode.com/chef/) oder [Puppet](http://docs.puppetlabs.com/) in Kombination mit leichtgewichtigen virtuellen Umgebungen wie [Vagrant](http://vagrantup.com/) setzen Entwickler in den Stand, lokale Umgebungen ans Laufen zu bringen, die nahe an Produktionsumgebungen herankommen. Die Installations- und Betriebskosten dieser Systeme sind gering verglichen mit dem Nutzen der Dev-Prod-Vergleichbarkeit und einem Continuous Deployment.

Adapter für unterschiedliche unterstützende Dienste sind weiterhin von Nutzen, weil sie das Portieren auf andere unterstützende Dienste schmerzlos machen. Aber alle Deploys der App (Entwicklungsumgebungen, Staging, Produktion) sollten denselben Typ und dieselbe Version eines jeden unterstützenden Dienstes benutzen.
