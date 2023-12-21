## III. Konfiguráció
### Konfigurációs beállítások a környezeti változókban tárolva 

Az alkalmazás *konfigurációja* minden olyan dolog, ami valószínüleg változik az egyes [üzembehelyezések](./codebase) (deployment) között (tesztelési, üzemeltetési, fejlesztői környezetek, stb.). Ideértve:

* Erőforráskezelők az adatbázishoz, a Memcached-hez és a további [háttérszolgáltatások](./backing-services) eléréséséhez
* Hozzáférési és hitelesítő adatok olyan külső szolgáltatásokhoz mint az Amazon S3 vagy a Twitter
* Olyan, üzembehelyezésenként (deployment) különböző értékek, mint az adott környezetben az egyedi név (canonical hostname)

Az alkalmazások néha konstansként tartalmaznak beállítási információkat a forráskódban. Ez megsérti a 12 tényezős alkalmazásfejlesztési alapelveket, aminek teljesítéséhez **szigorúan szét kell választani a konfigurációs értékeket a forráskódtól**.  A konfiguráció üzembehelyezésenként (deployment) jelentősen különbözik, a forráskód nem.

Ennek a szigorú szétválasztásnak egy jó lakmusz-próbáját teljesíti az alkalmazás, ha a kódbázis bármelyik pillanatban nyílt forráskódúvá tehető anélkül, hogy érzékeny információ kompromittálódna.

Fontos megjegyzés, hogy a konfigurációnak ez a definíciója **nem** terjed ki az alkalmazások olyan belső konfigurációjára, mint a Rails esetében a 'config/routes.rb', vagy a [Spring](http://spring.io/) esetében az, [ahogy az egyes modulok kapcsolódnak](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html), mert ezek az információk a különböző üzembehelyezések (deployment) esetében nem különböznek, így a legjobb, ha a kódban vannak elhelyezve.

A konfiguráció egy másik megközelítése, ha a konfigurációs állományainkat, mint a Railsnél a 'config/database.yml', nem adjuk hozzá (checkin) a kódtárhoz (repo). Ez a kódtárban (repo) tárolt konstansok használatához képest egy nagy előrelépés, azonban továbbra is gyenge pont: nagyon könnyű véletlenül felvenni (checkin) a kódtárunkba (repo) az egyik commit-nál. És könnyen vezethez ahhoz az állapothoz, amikor a konfigurációs információink szétszórva, különböző helyeken és különböző formátumokban szaporodnak, egyre nehezebben áttekinthetővé és egyre nehezebben kezelhetővé téve a beállításukat. Továbbá, ezek formája általában a nyelvhez és a keretrendszerhez igazodó, attól függő megoldás.

**A 12 tényezős alkalmazás a konfigurációs információkat *környezeti változókban tárolja***. Ezeket gyakran rövidítjük (angolul az Environment Variables után) env vars-nak vagy env-nek. A környezeti változókat -ellentétben a konfigurációs állományokkal- igazán könnyű, a forráskód módosítása nélkül, üzembehelyezésenként (deployment) különböző értékkel beállítani, kevés esélyünk van a kódtárba véletlenül felvenni, és a speciális konfigurációs állományokkal (vagy más konfigurációs módszerrel, mint például a Java System Properties) ellentétben, nyelv és operációs rendszertől független megoldás.

Egy másik nézőpontja a konfigurációkezelésnek a csoportosítás. Néha az alkalmazások a konfigurációt nevesített csoportokba szervezik (gyakran hívják az ilyet "környezetnek"), a konkrét üzembehelyezések (deployment) után elnevezve, mint a Rails-nél a 'development', a 'test' vagy a 'production'.  Ez a megoldás nem skálázható tisztán: amikor az alkalmazásból több üzembehelyezés (deployment) készül, akkor az új környezetnek új név kell, mint például: 'staging' vagy 'qa'. És ahogy a projekt bővül, a fejlesztők saját változókat hoznak létre, mint például 'tamas-staging', 'peter-staging', stb: ez kombinatorikus robbanáshoz vezethet, ami nagyon törékennyé teszi az alkalmazás konfigurációinak a kezelését.

A 12 tényezős alkalmazásfejlesztésben a környezeti változók a beállítás egységei, mindegyik környezeti változó teljesen független a többi környezeti változótól.  Soha nincsenek "környezetenként" csoportosítva, helyette mindegyiket üzembehelyezésenként (deployment) külön kezeljük.  Ez a megoldás könnyen skálázható az alkalmazás élettartama alatt, ahogy az üzembehelyezések (deployment) száma természetes módon növekszik.