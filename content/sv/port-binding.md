## VII. Portbindning (Portbinding)
### Göra tjänster tillgängliga genom portbindning

Webbapplikationer körs ibland inuti en webbserver container. Exempelvis kan PHP-applikationer köras som en modul inuti [Apache HTTPD](http://httpd.apache.org/), och Java-applikationer kan köras inuti [Tomcat](http://tomcat.apache.org/).

**Tolvfaktorapplikationen är helt självförsörjande** och förlitar sig inte på tillgängligheten av en webbserver-komponent för att skapa en webbtjänst som är tillgänglig externt. Webbapplikationen själv **exporterar HTTP som en tjänst genom att binda till en port** och att lyssna på inkommande anrop på den porten.

I en lokal utvecklingsmiljö besöker utvecklaren en URL för tjänsten som ex. `http://localhost:5000/` för att få åtkomst till den tjänst som exporteras av applikationen. I produktion hanterar ett ruttningslager anropen för att styra vidare dem till ett publikt tillgängligt värdnamn för den portbundna webbprocessen.

Detta är vanligtvis implementerat genom att använda [beroende-deklarering](./dependencies) för att lägga till ett webbserver-bibliotek till applikationen, såsom [Tornado](http://www.tornadoweb.org/) för Python, [Thin](http://code.macournoyer.com/thin/) för Ruby, eller [Jetty](http://www.eclipse.org/jetty/) för Java och andra JVM-baserade språk. Detta händer helt i *användarutrymmet* (eng. "user space"), dvs inom applikationens kod. Kontraktet med körmiljön är portbindningen för att svara på anrop.

HTTP är inte den enda tjänst som kan exporteras genom portbindning. I princip alla typer av servermjukvara kan köra via processbindning till en port och invänta inkommande anrop. Ex. [ejabberd](http://www.ejabberd.im/) (som talar protokollet [XMPP](http://xmpp.org/)), och [Redis](http://redis.io/) (som talar protokollet [Redis](http://redis.io/topics/protocol)).

Notera också att tillvägagångssättet med portbindning betyder att en applikation kan fungera som en [stödtjänst](./backing-services) för en annan applikation, genom att lägga URL till stöd-applikationen som en ansluten resurs i [konfigurationen](./config)
