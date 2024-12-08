## X. Fejlesztés/üzemeltetés összehangolva
### A fejlesztés, a tesztelés és az üzemeltetés annyira hasonlónak megtartva, amennyire ez egyáltalán lehetséges

Történeti okokból jelentős eltérések vannak a fejlesztés (a fejlesztő az alkalmazás helyi [üzembehelyezését (deployment)](./codebase) élőben módosítja) és az üzemeltetés (az alkalmazás végfelhasználók által elérhető, éppen futó üzembehelyezése (deployment)) között.  Ezek az eltérések és az ezekből adódó problémák három területen jelentkeznek:

* **Az idő különbség:** A fejlesztő munkája a kódon az üzemeltetett alkalmazásba hetek vagy akár hónapok múlva kerül.
* **A személyi különbség**: A kódot a fejlesztő írja, az üzembehelyezést (deployment) az üzemeltető mérnök végzi.
* **Az eszköz különbség**:  a fejlesztő dolgozhat olyan csomaggal, amiben Nginx, SQLite és OS X van, az üzemeltetés viszont Apache, MySQL és Linux környezetet használ.

**A tizenkét tényezős alkalmazást a [szünetmentes üzembehelyezés (continuous deployment)](http://avc.com/2011/02/continuous-deployment/) miatt eleve úgy tervezzük, hogy ez a különbség a fejlesztés, a tesztelés és az üzemeltetés között kicsi legyen.** Nézzük a három különbséget egyenként:

* Az időbeli különbséget tegyük kicsivé: a fejlesztő írhat kódot, ami órák, de akár akár percek alatt üzembe van helyezve (deploy).
* A személyi különbséget tegyük kicsivé: a kódot megíró fejlesztő szorosan be van vonva az üzembehelyezésbe (deployment), és közelről figyeli az üzembehelyezett (deploy) alkalmazás viselkedését.
* Az eszközökben megjelenő különbséget tegyük kicsivé: megtartva a fejlesztési és az üzemeltetési környezetet olyan hasonlónak, amennyire csak lehet.

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
    <td>Ugyanazok az emberek</td>
  </tr>
  <tr>
    <th>Fejlesztői kontra üzemeltetési környezet</th>
    <td>Különböző</td>
    <td>Hasonló amennyire csak lehetséges</td>
  </tr>
</table>

A [háttérszolgáltatások](./backing-services), mint például az alkalmazás adatbázisa, az üzenetsor vagy a gyorsítótár olyan terület, ahol fontos a fejlesztés és az üzemeltetés hasonlósága. Sok nyelv kínál olyan könyvtárakat, amik leegyszerűsítik a háttérszolgáltatáshoz való hozzáférést, ideértve a különböző típusú szolgáltatásokhoz csatlakozó adaptereket. Néhány példa megtalálható az alábbi táblázatban.

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
    <td>Memória, állományrendszer, Memcached</td>
  </tr>
</table>

A fejlesztők néha nagyon vonzónak találják, ha a saját fejlesztési környezetükben pehelysúlyú háttérszolgáltatást használhatnak, míg sokkal komolyabb és megbízhatóbb háttérszolgáltatások elérhetőek majd az üzembehelyezett (deploy) éles környezetben. Például fejlesztéshez SQLite-ot használni, üzemeltetéshez viszont PostgreSQL-t; vagy gyorsítótárazáshoz helyben a folyamat memóriáját, üzemeltetéskor pedig Memcached-et használni.

**A tizenkét tényezős fejlesztő ellenáll annak a kísértésnek, hogy más háttérszolgáltatást használjon a fejlesztési és az üzemeltetési környezetben**, még akkor is, ha az adapterek elméletileg eltüntetnek bármilyen különbséget a háttérszolgáltatások között.  A háttérszolgáltatások közötti különbségek azt jelentik, hogy apró együttműködési problémák merülhetnek fel azt eredményezve, hogy a kód, ami működött és megfelelően teljesített a teszteken a fejlesztési és a tesztkörnyezetekben is, üzemeltetés közben hibára fut. A hibáknak ez a típusa súrlódást hoz létre ami kiszámíthatatlanná teszi a szünetmentes üzembehelyzés (continuous deployment) használatát. Ennek a súrlódásnak és a szünetmentes üzembehelyezés (continuous deployment) fékezésének a költsége az alkalmazás életciklusára összegezve rendkívül magas.

A pehelysúlyú háttérszolgáltatások ma már nem olyan vonzóak, mint korábban voltak.  A modern háttérszolgáltatásokat, mint a Memcached, a PostgreSQL és a RabbitMQ a modern csomagkezelési rendszereknek köszönhetően -mint a [Homebrew](http://mxcl.github.com/homebrew/) és az [apt-get](https://help.ubuntu.com/community/AptGet/Howto)- már egyáltalán nem körülményes telepíteni és futtatni. Alternatív megoldásként a deklaratív telepítő eszközök, mint a [Chef](http://www.opscode.com/chef/) és a [Puppet](http://docs.puppetlabs.com/) kombinálva a vékony virtuális rendszerekkel, mint a [Docker](https://www.docker.com/) és a [Vagrant](http://vagrantup.com/), lehetővé teszik a fejlesztők számára, hogy olyan fejlesztési környezetben dolgozhassanak ami nagyon megközelíti az üzemeltetési környezetet. Ezen rendszerek telepítésének és használatának a költsége alacsony - összehasonlítva a fejlesztés/üzemeltetés egyensúly valamint a szünetmentes üzembehelyezés (continuous deployment) előnyeivel.

A különböző háttérszolgáltatások eléréséhez adaptereket használni továbbra is hasznos, mivel az újabb háttérszolgáltatásokra való áttérést relatív fájdalommentessé teszik. De az alkalmazás valamennyi telepítésének (fejlesztési környezet, tesztelés és üzemeltetés) azonos típusú és verziójú háttérszolgáltatásokat kellene használnia.