## X. Egyensúly a fejlesztés és az üzemeltetés között
### A fejlesztési és az üzemeltetési folyamatok legyenek annyira hasonlóak amennyire csak ez lehetséges

Történeti okokból jelentős különbségek vannak a fejlesztés (a fejlesztő az alkalmazás helyi [telepítését](./codebase) élőben módosítja) és az üzemeltetés (az alkalmazás végfelhasználók által elérhető, éppen futó telepítése) között.  Ezek a különbségek és az ezekből adódó problémák három területen jelentkeznek:

* **Az idő különbség:** A fejlesztő a kódon napokig, hetekig vagy akár hónapokig dolgozhat, mire a munkája az üzemeltetett alkalmazásba kerülne.
* **A személyi különbség**: A fejlesztő írja a kódot, az üzemeltető mérnök telepíti azt.
* **Az eszköz különbség**:  a fejlesztő dolgozhat olyan csomaggal, amiben Nginx, SQLite és OS X van, az üzemeltetés viszont Apache, MySQL és Linux környezetre telepíti az alkalmazást.

**A tizenkét tényezős alkalmazást eleve [folyamatos telepítéshez](http://avc.com/2011/02/continuous-deployment/) tervezzük, hogy ez a különbség a fejlesztés és az üzemeltetés között kicsi legyen.** Nézzük a három különbséget egyenként:

* Az időbeli különséget tegyük kicsivé: a fejlesztő megírhatja a kódot, és az órák de akár akár percek múlva is az üzemeltetésbe kerülhet.
* A személyi különbséget tegyük kicsivé: a kódot író fejlesztőt szorosan bevonjuk a a telepítésbe így közelről figyeli az üzemeltetésben az alkalmazás viselkedését.
* Az eszközökben megjelenő különbséget tegyük kicsivé: legyen a fejlesztési és az üzemeltetési környezet olyan hasonló, amennyire csak lehet.

Összegezve ebben a táblázatban:

<table>
  <tr>
    <th></th>
    <th>Hagyományos alkalmazás</th>
    <th>Tizenkét tényezős alkalmazás</th>
  </tr>
  <tr>
    <th>Telepítések között eltelik</th>
    <td>Hetek</td>
    <td>Órák</td>
  </tr>
  <tr>
    <th>Kódot létrehozó kontra telepítő</th>
    <td>Különböző emberek</td>
    <td>Ugyanazon emberek</td>
  </tr>
  <tr>
    <th>Fejlesztői kontra üzemeltetési környezet</th>
    <td>Különböző</td>
    <td>Hasonló amennyire csak lehetséges</td>
  </tr>
</table>

A [háttérszolgáltatások](./backing-services), mint az alkalmazás adatbázisa, az üzenetsor vagy a gyorsítótár olyan terület, ahol a fejlesztés és az üzemeltetés egyensúlya fontos. Sok nyelv kínál könyvtárakat, amik egyszerűsítik a hozzáférést a háttérszolgáltatáshoz, ideértve adaptereket a különböző típusú szolgáltatásokhoz. Néhány példa táblázatban.

<table>
  <tr>
    <th>Típus</th>
    <th>Nyelv</th>
    <th>Könyvtár</th>
    <th>Adapter</th>
  </tr>
  <tr>
    <td>Adatbázis</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Üzenet várakozósor</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Gyorsítótár</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

A fejlesztők néha nagyon vonzónak találják, ha fejlesztés közben pehelysúlyú háttérszolgáltatást használhatnak a saját fejlesztési környezetükben, míg erős háttérszolgáltatások kerülnek az üzemeltetési környezetbe. Például fejlesztéshez SQLite-ot üzemeltetéshez viszont PostgreSQL-t használni; vagy helyben a folyamat memóriáját, üzemeltetéskor pedig Memcached-et használni gyorsítótárazáshoz.

**A tizenkét tényezős fejlesztő ellenál annak a kísértésnek, hogy más háttérszolgáltatást használjon a fejlesztési és az üzemeltetési környezetben**, még akkor is, ha az adapterek elméletileg bármilyen háttérszolgáltatások közötti különbséget eltüntetnek. A háttérszolgáltatások közötti különbségek azt jelenti, hogy apró inkompatibilitási problémák merülhetnek fel azt eredményezve, hogy a kód, ami működött és a teszteken megfelelően teljesített fejlesztési és tesztkörnyezetben, üzemeltetés közben hibára fut. A hibáknak ez a típusa súrlódást hoz létre ami a folyamatos telepítést akadályozza. Ennek a surlódásnak a negatív hatása a folyamatos telepítésre és az alkalmazás életciklusára összegzett kültsége rendkívül magas.

A pehelysúlyú háttérszolgáltatások ma már kevésbé vonzóak, mint korábban voltak. A modern háttérszolgáltatásokat, mint a Memcached, a PostgreSQL és a RabbitMQ a modern csomagkezelési rendszereknek köszönhetően -mint a [Homebrew](http://mxcl.github.com/homebrew/) és az [apt-get](https://help.ubuntu.com/community/AptGet/Howto)- már egyáltalán nem körülményes telepíteni és futtatni. Alternatív megoldásként a deklaratív telepítő eszközök, mint a [Chef](http://www.opscode.com/chef/) és a [Puppet](http://docs.puppetlabs.com/) kombinálva a vékony virtuális rendszerekkel, mint a [Docker](https://www.docker.com/) és a [Vagrant](http://vagrantup.com/) lehetővé teszi a fejlesztők számára, hogy az üzemeltetési környezethez nagyon hasonló fejlesztési környezetben dolgozhassanak. Ezen rendszerek telepítésének és használatának a költsége alacsony - összehasonlítva a fejlesztési és üzemeltetési egyensúllyal valamint a folyamatos telepítés előnyeivel.

A háttérszolgáltatások eléréséhez adaptereket használni továbbra is hasznos, mivel az újabb háttérszolgáltatásokra való áttérést relatív fájdalommentessé teszik. De az alkalmazás valamennyi telepítésének (fejlesztési környezet, tesztelés és üzemeltetés) azonos típusú és verziójú háttérszolgáltatásokat kell használnia.
