## XI. Naplók
### Kezeljük a naplókat események folyamatos sorozataként

A *Naplók* a futó alkalmazás viselkedésébe nyújtanak betekintést. Szerver alapú környezetben általában egy állományba írják őket a merevlemezre ("naplóállomány"); de ez csak egy kimeneti formátum.

A naplók az összegyűjtött és idő szerint rendezett [események folyamatos sorozata (stream)](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/), amik a valamennyi futó folyamat és háttérszolgáltatás kimeneti adatsoraiból (output streams) lettek összegyűjtve. A naplók nyers formájukban tipikusan szöveges formátumot tartalmaznak, ahol minden esemény külön sorban szerepel (habár a kivételek visszakövetése több sorba is kerülhet). A naplóknak nincs meghatározott elejük vagy végük: folyamatosan áramlanak, amíg az alkalmazás üzemel.

**A tizenkét tényezős alkalmazás saját maga sohasem foglalkozik a saját kimeneti adatsorainak (output streams) irányításával vagy tárolásával.**  Nem próbál naplófájlokat írni vagy kezelni. Ehelyett minden futó folyamat a saját eseménysorát (event stream) pufferelés nélkül kiírja a szabványos kimeneti eszközre (`stdout`).  A helyi fejlesztés során a fejlesztő a saját terminálja előtt fogja megtekinteni ezt az adatsort (stream), hogy figyelemmel kísérje az alkalmazás viselkedését.

A tesztelési vagy az üzemeltetési telepítéseknél minden folyamat adatsorát (stream) a futtatókörnyezet rögzíti, összevonva az alkalmazás összes többi adatsorával (stream), egy vagy több végső célállomás felé irányítva megtekintéshez és hosszú távú archiváláshoz. Ezek az archívumok nem láthatók és konfigurálhatók az alkalmazás által, helyette teljes egészében a futtatókörnyezet kezeli őket. Ehhez nyílt forráskódú naplóforgalom írányító eszközök állnak rendelkezésre (mint a [Logplex](https://github.com/heroku/logplex) és a [Fluentd](https://github.com/fluent/fluentd)).

Az alkalmazás eseményeinek adatsorát (stream) irányíthatjuk állományba, vagy valós időben figyelhetjük terminálablakban. A legfontosabb, hogy az adatsort (stream) elküldhetjük egy naplóindexelő és elemző rendszerbe, mint a [Splunk](http://www.splunk.com/), vagy egy általános célú adattárház eszközbe, mint a[Hadoop/Hive](http://hive.apache.org/). Ezek a rendszerek nagy erőt és rugalmasságot biztosítanak egy alkalmazás időbeli viselkedésének vizsgálatához, ideértve:

* Meghatározott múltbeli események keresése.
* A trendek tágabb nézőpontból történő ábrázolása (mint például a percenkénti kérések száma).
* Aktív riasztás a felhasználó által létrehozott szabálynak megfelelően (például egy riasztás jön létre, ha a percenkénti hibák száma meghalad egy bizonyos küszöbértéket).
