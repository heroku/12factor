## VII. Bindung an Ports
### Dienste durch das Binden von Ports exportieren

Web-Apps laufen manchmal in einem Webserver als Container. Zum Beispiel laufen PHP-Apps als Modul in [Apache HTTPD](http://httpd.apache.org/), oder Java-Apps laufen manchmal in [Tomcat](http://tomcat.apache.org/).

**Die Zwölf-Faktor-App ist vollständig eigenständig** und verlässt sich nicht darauf, dass ein externer Webserver zur Laufzeit injiziert wird, um dem Web einen Dienst zur Verfügung zu stellen. Die Web-App **exportiert HTTP als Dienst, indem sie sich an einen Port bindet** und wartet an diesem Port auf Requests.

In einer lokalen Entwicklungsumgebung öffnet ein Entwickler eine Dienst-URL wie `http://localhost:5000/`, um auf den Dienst der App zuzugreifen. Beim Deployment sorgt eine Routing-Schicht dafür, dass Requests von einem öffentlich sichtbaren Hostnamen zu den an die Ports gebundenen Prozessen kommen.

Üblicherweise wird dies mittels [Abhängigkeitsdeklaration](./dependencies) implementiert. Zu der App fügt man eine Webserver-Bibliothek hinzu wie [Tornado](http://www.tornadoweb.org/) für Python, [Thin](http://code.macournoyer.com/thin/) für Ruby oder [Jetty](http://www.eclipse.org/jetty/) für Java und andere JVM-basierenden Sprachen. Dies findet vollständig im *User Space* statt, also im Code der App. Der Vertrag mit der Laufzeitumgebung ist das Binden an einen Port um Requests zu bedienen.

HTTP ist nicht der einzige Dienst, der durch Portbindung exportiert werden kann. Fast jede Server-Software kann betrieben werden, indem ein Prozess an einen Port gebunden wird und auf ankommende Requests wartet. Einige Beispiele sind [ejabberd](http://www.ejabberd.im/) (spricht [XMPP](http://xmpp.org/)) und [Redis](http://redis.io/) (spricht das [Redis-Protokoll](http://redis.io/topics/protocol)).

Es sei auch erwähnt, dass durch Portbindung eine App ein [unterstützender Dienst](./backing-services) für eine andere App werden kann, indem die URL der unterstützenden App der konsumierenden App als Resource-Handle zur Verfügung gestellt wird.
