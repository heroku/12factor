## VII. Port binding
### Export služieb cez port binding

Webové aplikácie sú niekedy vykonávané vnútri webserverového kontainera.  Napríklad PHP aplikácie bežia ako modul vnútri [Apache HTTPD](http://httpd.apache.org/), alebo Java aplikácie môžu bežať vnútri [Tomcat](http://tomcat.apache.org/).

**Dvanásť faktorová aplikácia je úplne sebestačn** a nespolieha sa na vsunutie webservera v exekučnom prostredí na to, aby vytvorila webovú službu.  Webová aplikácia **exportuje HTTP ako službu bindovaním na port**, a počúvaním požiadaviek prichádzajúcich na daný port.

V lokálnom vývojárskom prostredí developer pristupuje na službu exportovanú jeho aplikáciou cez URL napríklad `http://localhost:5000/`.  Pri nasadení, smerovacia vrstva presmerúva požiadavky z verejnej domény na port web procesu.

Toto sa typicky implementuje použitím [deklarácie závislostí](./dependencies) a pridá sa tak knižnica webservera do aplikácie. Napríklad [Tornado](http://www.tornadoweb.org/) pre Python, [Thin](http://code.macournoyer.com/thin/) pre Ruby, alebo [Jetty](http://www.eclipse.org/jetty/) pre Javu a iných jazykoch bežiacich na JVM.  Deje sa to úplne v *používateľskom priestore*, takže v kóde aplikácie.  Dohoda s exekučným prostredím je je bindovanie na port na ktorom bude obsluhovať požiadavky.

HTTP nie je jediná služba, ktorú je možné exportovať bindovaním na port.  Skoro každý serverový softvér môže bežať na otvorenom porte a čakať na prichádzajúce požiadavky.  Príklady zahŕňajú [ejabberd](http://www.ejabberd.im/) (protokol [XMPP](http://xmpp.org/)), a [Redis](http://redis.io/) (protokol [Redis](http://redis.io/topics/protocol)).

Všimnite si, že pripojenie na port znamená, že aplikácia sa môže stať [podpornou službou](./backing-services) pre inú aplikáciu, poskytnutím URL na podpornú službu ako zdroj v [configu](./config) pre konzumujúcu aplikáciu.

