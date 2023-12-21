## VII. Hálózati port hozzárendelés
### Tegyük a szolgáltatásainkat port hozzárendeléssel elérhetővé

A webalkalmazások néha [webkiszolgáló konténereken](https://hu.wikipedia.org/wiki/Servlet) belül futnak.  Például, a PHP alkalmazások modulként egy [Apache HTTPD](http://httpd.apache.org/) belsejében futnak vagy a Java alkalmazások futhatnak egy [Tomcat](http://tomcat.apache.org/) belsejében.

**A 12 tényezős alkalmazásfejlesztés követelményeinek megfelelő alkalmazás teljes egészében önálló** nem támaszkodik futásidőben egy további webszerver szolgáltatásaira ahhoz, hogy webes felületet hozzon létre. A webes alkalmazás a **HTTP szolgáltatását egy porthoz rendelve kínálja** és ezen a porton figyelve várja a hozzá intézett kéréseket.

A fejlesztő lokális gépén, a fejlesztési környezetben ez megoldható egy szolgáltatási URL-en keresztül. Például a `http://localhost:5000/`felkeresésével férünk hozzá az alkalmazásunk szolgáltatásaihoz. Ha üzembehelyezzük (deploy) valamilyen nem fejlesztői környezetben az alkalmazást, akkor pedig az útválasztó réteg kezeli a nyilvános címre érkező kéréseket és továbbítja a porthoz rendelt webes folyamathoz.

Ez tipikusan a webszerver könyvtár hozzáadásával, méghozzá az alkalmazáshoz [függőségi meghatározás segítségével](./dependencies) történő hozzáadásával jön létre, ilyen webszerver könyvtár például a [Tornado](http://www.tornadoweb.org/) a Python környezetben, a [Thin](http://code.macournoyer.com/thin/) a Ruby esetén, vagy a [Jetty](http://www.eclipse.org/jetty/) a Javá-hoz és az egyéb JVM alapú nyelvekhez. Ez teljes egészében az *alkalmazás keretein belül* történik. Így a megállapodás (contract) az alkalmazás és a futtatókörnyezet között egyedül a kéréseket kiszolgáló port hozzárendelése.

A HTTP nem az egyetlen szolgáltatás, amit porthoz rendelve lehet elérhetővé tenni. Szinte bármilyen típusú szerver szolgáltatást nyujtó alkalmazás képes a bejövő kéréseket kiszolgálni, ha a folyamatát porthoz rendeljük. Ideértve akár az [ejabberd](http://www.ejabberd.im/) (ami [XMPP](http://xmpp.org/)-t használ) és a [Redis](http://redis.io/) (ami [Redis protokollt](http://redis.io/topics/protocol) használ).

Vegyük észre, hogy ez a port hozzárendelés alapú megközelítés azt is jelenti, hogy bármelyik alkalmazás képes [háttérszolgáltatása](./backing-services) lenni egy másik alkalmazásnak, ha a szolgáltatási URL-jét erőforráskezelőként az őt használó alkalmazás [konfigurációjában](./config) megadjuk.
