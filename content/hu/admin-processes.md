## XII. Adminisztratív folyamatok
### A fejlesztés, a tesztelés és az üzemeltetés annyira hasonlónak megtartva, amennyire ez egyáltalán lehetséges

A [folyamatösszeállítás](./concurrency) a folyamatok együttese, amelyek az alkalmazás mindennapi üzleti tevékenységei használnak (például webes kérések kiszolgálására) az alkalmazás futása közben.  Ezen kívül a fejlesztők gyakran egyszeri adminisztratív vagy karbantartási feladatokat szeretnek végezni az alkalmazásban, például:

* az adatbázis migrációk végrehajtása (mint például `manage.py migrate` a Django-nál, `rake db:migrate` a Rails használatakor).
* a konzol (vagy másnéven [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) parancssor) használata tetszőleges kód futtatásához vagy az alkalmazás éles adatbázisán az adatmodell vizsgálatához.  A legtöbb nyelv biztosít REPL eszközt az értelmező alkalmazás parancssori paraméterek nélküli futtatásával (mint a `python` vagy `perl`) vagy egyes esetekben erre külön parancs van (az `irb` a Rubyhoz, vagy `rails console` a Rails-hez).
* Az alkalmazás kódtárában tárolt egyszer használatos scriptek futtatása (például: `php scripts/fix_bad_records.php`).

Az egyszeri adminisztrációs folyamatokat ugyanabban a környezetben kell futtatni, mint az alkalmazás rendszeres [hosszan futó folyamatait](./processes).  Ugyanazt a [kódbázist](./codebase) és [konfigurációt](./config) használó [üzembehelyezésén](./build-release-run) futtatva, mint amit az üzembehelyezés egyéb folyamatai használnak.  Az adminisztrációs scripteket/kódokat az alkalmazással együtt kell szállítani a szinkronizációs problémák elkerülése érdekében.

Az összes folyamattípusnál ugyanazt a [függőségeket elkülönítő megoldást](./dependencies) kell használni.  Például, ha a Ruby webes folyamata a `bundle exec thin start` parancsot használja, akkor az adatbázis migrációnak a `bundle exec rake db:migrate` parancsot kell használnia.  Hasonlóan, a Virtualenv-et használó Python programnak a saját üzembehelyezésű `bin/python` köyvtárat kall használnia mind a Tornado webkiszolgáló indításához mind a `manage.py` felügyeleti folyamathoz.

A tizenkét tényezős fejlesztés szilárdan támogatja azokat a programozási nyelveket, amelyek alapértelmezetten rendelkeznek REPL (Read-Eval-Print Loop) parancssorral, és amelyek könnyen lehetővé teszik az egyszeri szkriptek futtatását.  Helyi üzembehelyezés esetén a fejlesztők közvetlenül az alkalmazás könyvtárában található parancssorból hívhatnak meg egyszeri adminisztrációs folyamatokat.  Éles környezetben a fejlesztők használhatnak ssh-t vagy használhatják az adott üzembehelyezés végrehajtási környezete által biztosított egyéb távoli parancsvégrehajtási mechanizmusokat az ilyen folyamatok futtatásához.
