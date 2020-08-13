## XI. Naplók
### Kezeljük a naplókat esemény-folyamatként

A *Naplók* a futó alkalmazás működésébe nyújtanak betekintést. Szerver alapú környezetben gyakran a lemezen egy állományba írják őket ("naplóállomány"); de ez csak egy kimeneti formátum.

A naplók valamennyi futó folyamat és háttérszolgáltatás kimeneti adataiból összegyűjtött és idő szerint rendezett [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/).   A naplók nyers állapota tipikusan szöveges formátum ahol minden esemény külön sorban szerepel (akkor is, ha a kivételekből származó veremtartalom több sorba is kerülhet). A naplóknak nincs meghatározott elejük vagy végük hanem folyamatosan keletkeznek egészen addig, amíg az alkalmazás üzemel.

**A tizenkét tényezős alkalmazás saját maga sosem foglalkozik a saját kimeneti adatfolyamának irányításával vagy tárolásával.**  Nem szabad naplófájlokat írnia vagy kezelnie. Helyette minden futó folyamat a saját eseményeit gyorsítótár nélkül kiírja a sztenderd kimenetre `stdout`.  A fejlesztés alatt a fejlesztő a saját képernyője előtt ülve fogja nézni, hogy megfigyelje az alkalmazás viselkedését.

A tesztelési vagy az üzemeltetési telepítéseknél minden folyamat adatfolyamát a végrehajtási környezet rögzít, összevonva az alkalmazás összes többi adatfolyamával, megtekintésre és hosszútávú archiválásra egy vagy több végcél felé irányítva.Ezek az archívumok nem láthatók és konfigurálhatók az alkalmazásból, helyette teljes egészében a futtatókörnyezet kezeli őket. Ehhez nyílt forráskódú napló forgalom írányító eszközök állnak rendelkezésre (mint a [Logplex](https://github.com/heroku/logplex) és a [Fluentd](https://github.com/fluent/fluentd)).

Az alkalmazás eseményeinek adatfolyamát irányíthatjuk állományba, vagy valós időben figyelhetjük terminálablakban. A legfontosabb, hogy az adatfolyamot elküldhetjük egy naplóindexelő és elemző rendszerbe, mint a [Splunk](http://www.splunk.com/),vagy egy általános célú adattárház eszközbe, mint a[Hadoop/Hive](http://hive.apache.org/). Ezek a rendszerek elegendő teljesítményt és rugalmasságot biztosítanak az alkalmazások időbeli viselkedésének megismeréséhez, ideértve:

* Meghatározott múltbeli események keresése.
* A trendek tágabb nézőpontból történő ábrázolása (mint a percenkénti kérések száma).
* Aktív riasztás a felhasználó által létrehozott figyelésnek megfelelően (például egy riasztás jön létre, ha a percenkénti hibák száma meghalad egy bizonyos küszöbértéket).
