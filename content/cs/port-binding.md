## VII. Vazba s portem
### Exportujte služby pomocí vazby na port.

Webové aplikace jsou někdy vykonávány uvnitř webového serveru. Například PHP aplikace mohou běžet jako modul uvnitř [Apache HTTPD](http://httpd.apache.org/) nebo Java aplikace mohou běžet uvnitř [Tomcatu](http://tomcat.apache.org/).

**Twelve-factor aplikace jsou úplně soběstačné** a nespoléhají se na vsunutí webserveru do běhového prostředí k vytvoření webové služby. Webová aplikace **exportuje HTTP jako službu vázanou na port** a naslouchá požadavkům přicházejícím na daný port. 

V lokálním vývojovém prostředí přistupuje vývojář na službu exportovanou jeho aplikací přes URL jako je `http://localhost:5000/`. U nasazení přesměrovává směrovací vrstva požadavky z veřejně dostupné domény na port webového procesu.

To se typicky realizuje přidáním knihovny webserveru přímo do aplikace za pomoci [deklarace závislostí](./dependencies). Například [Tornado](http://www.tornadoweb.org/) pro Python, [Thin](http://code.macournoyer.com/thin/) pro Ruby, nebo [Jetty](http://www.eclipse.org/jetty/) pro Javu a jiné jazyky založené na JVM. Toto se děje výhradně v *uživatelském prostoru*, tedy v kódu aplikace. Dohoda s běhovým prostředím je pak pouze vazba na port pro obsluhu požadavků.

HTTP není jediná služba, kterou je možné exportovat přes port. Téměř libovolný serverový software může běžet na otevřeném portu a naslouchat příchozím požadavkům. Například [ejabberd](http://www.ejabberd.im/) (komunikující pomocí [XMPP](http://xmpp.org/)) nebo [Redis](http://redis.io/) (komunikující [Redis protokolem](http://redis.io/topics/protocol)).

Všimněte si také, že přístupem pomocí vazby na port se jedna aplikace může stát [podpůrnou službou](./backing-services) pro jinou aplikaci, poskytnutím URL podpůrné služby jako zdroje pro [konfiguraci](./config) konzumující aplikace.
