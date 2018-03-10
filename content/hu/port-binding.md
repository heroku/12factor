## VII. Hálózati port hozzárendelés
### Tegyük a szolgáltatásainkat port hozzárendeléssel elérhetővé

A webes alkalmazások néha [webszerver konténerekben](https://hu.wikipedia.org/wiki/Servlet) futnak.  Például, a PHP alkalmazások egy [Apache HTTPD](http://httpd.apache.org/)  vagy a Java alkalmazások futhatnak egy [Tomcat](http://tomcat.apache.org/) belsejében.

**A 12 tényezős alkalmazásfejlesztés követelményeinek megfelelő alkalmazás teljes egészében önálló** nem támaszkodik egy további webszerver szolgáltatásaira ahhoz, hogy webes felületet hozzon létre. A webes alkalmazás a **HTTP szolgáltatását egy porthoz rendelve kínálja** és ezen a porton figyelve várja a hozzá intézett kéréseket.

A fejlesztő lokális gépén, a fejlesztési környezetben ez megoldható egy szolgáltatási URL-en keresztül. Például a `http://localhost:5000/`felkeresésével férünk hozzá az alkalmazásunk szolgáltatásaihoz. Ha telepítjük az alkalmazást, akkor pedig az útválasztó réteg kezeli a nyilvános címre érkező kéréseket és továbbítja a porthoz rendelt webes folyamathoz.

Ezt általában úgy oldjuk meg, hogy webszerver könyvtárat adunk az alkalmazásunkhoz [függőségi definíció segítségével](./dependencies), mint például a [Tornado](http://www.tornadoweb.org/) Python környezetben, [Thin](http://code.macournoyer.com/thin/) a Ruby esetén, vagy [Jetty](http://www.eclipse.org/jetty/) a Javá-hoz és az egyéb JVM alapú nyelvekhez. Ez az *alkalmazás keretein belül* történik. Így az alkalmazásunknak csak a port hozzárendelésben kell megállapodnia -amin a kéréseket kiszolgálja- a futtatási környezettel.

A HTTP nem az egyetlen szolgáltatás, amit porthoz rendelve lehet szolgáltatni. Majdnem mindenfajta szerver szolgáltatást nyujtó alkalmazás képes a bejövő kéréseket kiszolgálni, ha a folyamatát porthoz rendeljük. Ideértve akár az [ejabberd](http://www.ejabberd.im/) ([XMPP](http://xmpp.org/)-ről beszélünk) és a [Redis](http://redis.io/) (a [Redis protocol](http://redis.io/topics/protocol) esetén).

Vegyük észre, hogy a port-hozzárendeléses megközelítés eredményeként bármelyik alkalmazás képes [háttérszolgáltatása](./backing-services) lenni egy másik alkalmazásnak, ha a szolgáltatási URL-jét erőforrás szolgáltatásként az őt használó alkalmazás [konfigurációjában](./config) megadjuk.
