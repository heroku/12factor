## XII. Adminisztratív folyamatok
### Futtassuk az adminisztrációs és felügyeleti feladatokat egyszer futó folyamatokként

A [folyamat formátuma](./concurrency)  pedig legyen olyan folyamatok együttese, amit az alkalmazás rendszeres üzleti folyamatai (például webes kérések kiszolgálására) is használnak. Ezen kívül a fejlesztők gyakran egyszeri adminisztrációs vagy karbantartási feladatokat is szeretnének végrehajtani, mint például:

* Adatbázis migrációk végrehajtása (mint például `manage.py migrate` a Django-nál, `rake db:migrate` a Rails használatakor).
* Konzol használata (vagy másnéven [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) tetszőleges kód futtatásához vagy akár az alkalmazás adatmodelljének használatához az éles adatbázis vizsgálata közben. A legtöbb nyelv biztosít REPL eszközt az értelmező alkalmazás parancssori paraméterek nélküli futtatásával (mint a `python` vagy `perl`) egyes esetekben pedig erre külön parancs van (az `irb` a Rubyhoz, `rails console` vagy a Rails-hez).
* Az egyszer használatos scripteket az alkalmazás kódtárában kell tárolni (egy php példa: `php scripts/fix_bad_records.php`).

Az egyszeri adminisztrációs folyamatokat ugyanolyan környezetben kell futtatni, mint az alkalmazás rendszeres, [hosszan futó folyamatait](./processes).  Ugyanazt a [kódbázist](./codebase) és [konfigurációt](./config) használó [telepítésen](./build-release-run) futtatva, mint amit a telepítés egyéb folyamatai használnak.  Az adminisztrációs scripteket/kódokat az alkalmazással együtt kell szállítani a szinkronizációs problémák elkerülése érdekében.

Ugyanazt az [elkülönítési megoldást](./dependencies) kell használni minden folyamattípusnál.  Például, ha a Ruby webes folyamata a `bundle exec thin start` parancsot használja, akkor az adatbázis migrációnak `bundle exec rake db:migrate`-et kell használnia.  Hasonlóan, a Virtualenv-et használó Python programnak a saját telepítésű `bin/python` köyvtárát kall használnia a Tornado webkiszolgáló indításához ugyanúgy ahogy `manage.py` felügyeleti folyamathoz.

A tizenkét tényezős fejlesztés határozottan támogatja azokat a nyelveket, amik alapból kínálnak REPL környezetet és megkönnyítik az egyszeri adminisztrációs scriptek futtatását. A fejlesztők a saját gépükön az egyszeri admin scripteket egyből az alkalmazás munkakönyvtárából tudják parancssorban futtatni. Éles telepítés esetén a fejlesztők ilyen folyamatok futtatásához ssh-t vagy más, a telepítés futtatási környezete által biztosított távoli parancsvégrehajtási megoldást használhatnak.
