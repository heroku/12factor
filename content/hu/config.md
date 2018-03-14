## III. Konfiguráció
### A konfigurációs beállításokat tároljuk a környezetben

Az alkalmazás *konfigurációja* minden olyan, ami valószínüleg változik az egyes [telepítések](./codebase) között (tesztelés, üzemeltetés, fejlesztői környezetek, stb.). Ideértve:

* Az adabázis elérések kezelése, Memcached elérés és további [háttérszolgáltatások](./backing-services) elérése
* Hozzáférési információk küső szervízekhez mint az Amazon S3 vagy a Twitter
* Telepítésenként különböző értékek, mint például a gép azonosítója, amire telepítünk

Az alkalmazások néha konstansként tartalmaznak beállítási információkat. Ez megsérti a 12 tényezős alkalmazásfejlesztési alapelveket, aminek teljesítéséhez **szigorúan szét kell választani a konfigurációs értékeket a forráskódtól**. A konfiguráció telepítésenként jelentősen különbözik, a forráskód nem.

Ennek a szigorú szétválasztásnak egy jó lakmusz-próbáját teljesíti az alkalmazásunk, ha a kódbázis bármelyik pillanatban nyílt forráskódúvá tehető anélkül, hogy érzékeny információ kompromittálódna.

Figyelem, a konfigurációnak ez a definíciója **nem** terjed ki az alkalmazások belső konfigurációjára, mint a Rails esetében a 'config/routes.rb', vagy a  [Spring](http://spring.io/) esetében [ahogy az egyes modulok kapcsolódnak](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html), mert ezek az információk a különböző telepítések esetében nem különböznek.

A konfiguráció egy másik megközelítése, ha a konfigurációs állományainkat, mint a Railsnél a 'config/database.yml' nem adjuk hozzá, így nem is tároljuk a kódtárunkban. Ez a konstansok használatához képest egy nagy előrelépés, mivel azokat kódtárban tároljuk, azonban továbbra is gyenge pont: nagyon könnyű véletlenül vagy figyelmetlenségből felvenni a kódtárunkba az egyik checkin-nél. És könnyen vezethez ahhoz az állapothoz, amikor a konfigurációs információink szétszórva, különböző helyeken és különböző formátumokban szaporodnak, egyre nehezebben áttekinthetővé téve a beállításokat. Továbbá, ezek a formátumok általában nyelvhez és keretrendszerhez igazodó formát vesznek fel.

**A 12 tényezős alkalmazás a konfigurációs információkat *környezeti változókban tárolja***. Ezeket gyakran rövidítjük angolul az Environment Variables után env vars-nak vagy env-nek. A környezeti változókat -ellentétben a konfigurációs állományokkal- igazán könnyű telepítésenként különböző értékkel beállítani, kevés esélyünk van a kódtárba véletlenül felvenni, és a speciális konfigurációs állományokkal (vagy más konfigurációs módszerrel, mint például a Java System Properties) ellentétben, nyelv és operációs rendszertől független megoldás.

Még egy érdekes nézőpontja a konfigurációkezelésnek, a csoportosítás. Néha az alkalmazások a konfigurációt nevesített csoportokba szervezik (gyakran hívják az ilyet "környezetnek"), az egyes telepítések után elnevezve, mint a 'development', 'test' vagy a 'production' környezet a Rails-nél. Ez a megoldás nem skálázható tisztán: amikor az alkalmazásból új telepítés készül, az új környezetnek új név kell, mint például: 'staging' vagy 'qa'. És ahogy a projekt bővül, a fejlesztők saját változókat hoznak létre, mint például 'tamas-staging', 'peter-staging', stb, ez kombinatorikus robbanáshoz vezethet, ami nagyon törékennyé teszi az alkalmazás konfigurációinak az egységes kezelését.

A 12 tényezős alkalmazásfejlesztésben a környezeti változók a beállítás egységei, mindegyik teljesen független a többi a többi környezeti változótól. Soha nincsenek "környezetenként" csoportosítva, helyette mindegyiket telepítésenként külkön kezeljük. Ez a megoldás az alkalmazás az élettartama alatt a telepítések számával együtt könnyen skálázható. 