## VII. Poort-binding
### Exporteer diensten via poort binding

Web apps worden soms uitgevoerd binnen een webserver container. PHP apps kunnen bijvoorbeeld draaien als een module binnen [Apache HTTPD](http://httpd.apache.org/), of Java apps kunnen draaien binnen [Tomcat](http://tomcat.apache.org/).

**De 12-factor app is volledig op zichzelf staand** en is niet afhankelijk van runtime injectie van een webserver in de uitvoeringsomgeving om een web-facing service te creëren. De web app **exporteert HTTP als een service door te binden aan een poort**, en te luisteren naar verzoeken die binnenkomen op die poort.

In een lokale ontwikkelomgeving bezoekt de ontwikkelaar een service URL zoals `http://localhost:5000/` om toegang te krijgen tot de service die door zijn app wordt geëxporteerd. Bij de implementatie zorgt een routering laag voor het routeren van verzoeken van een publieke hostnaam naar de poort-gebonden web processen.

Dit wordt typisch geïmplementeerd door gebruik te maken van [dependency declaration](./dependencies) om een webserver library toe te voegen aan de app, zoals [Tornado](http://www.tornadoweb.org/) voor Python, [Thin](http://code.macournoyer.com/thin/) voor Ruby, of [Jetty](http://www.eclipse.org/jetty/) voor Java en andere JVM-gebaseerde talen. Dit gebeurt volledig in *gebruikersruimte*, dat wil zeggen, binnen de code van de app. Het contract met de uitvoeringsomgeving is het binden aan een poort om verzoeken te serveren.

HTTP is niet de enige dienst die kan worden geëxporteerd door poortbinding. Bijna elke soort server software kan worden uitgevoerd via een proces dat zich bindt aan een poort en wacht op inkomende verzoeken. Voorbeelden zijn [ejabberd](http://www.ejabberd.im/) (die [XMPP](http://xmpp.org/) aanspreekt), en [Redis](http://redis.io/) (die het [Redis protocol](http://redis.io/topics/protocol) aanspreekt).

Merk ook op dat de port-binding aanpak betekent dat een app de [backing service](./backing-services) voor een andere app kan worden, door de URL naar de backing app als een resource handle in de [config](./config) voor de consumerende app op te geven.