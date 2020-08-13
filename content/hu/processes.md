## VI. Folyamatok
### Az alkalmazást egy vagy több állapot nélküli folyamatként futtassuk

Az alkalmazás a futtatókörnyezetben egy vagy több *folyamatként* fut.

A legegyszerűbb esetben maga a kód egy különálló script, a futtatókörnyezet pedig a feljesztő helyi laptopja rajta a nyelvi környezettel és a folyamatot parancssorból indítjuk (például így:`python my_script.py`). A skála másik végén egy kifinomult rendszer éles telepítése több [folyamattípust használhat, létrehozva nulla vagy több folyamatot.](./concurrency).

**A 12 tényezős alkalmazásfejlesztés folyamatai állapotmentesek és [nem osztanak meg semmit](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Minden nem átmeneti adatnak állapotnyilvántartó [háttérszolgáltatásban](./backing-services) a helye, tipikusan valamilyen adatbázisban.

A memóriaterületet vagy az állományrendszert rövid egy-tranzakciós átmeneti gyorsítótárként (cache) használhatjuk. Például, letöltünk egy nagy állományt, feldolgozzuk és az eredményt tároljuk az adatbázisban. A tizenkét tényezős alkalmazás sosem tételezi fel, hogy akár gyorsítás céljából valami a memóriában vagy lemezre mentve elérhető a jövöben egy másik kérés kiszolgálásakor vagy egy jövőbeni feladat végrehajtásakor  - mivel minden folyamattípusból több létezhet, és nagy a valószínűsége, hogy a jövőbeni kérést már egy másik folyamat fogja kiszolgálni. Még akkor is, ha csak egy folyamatunk van, az újraindítás (ezt kiválthatja új kód telepítés, konfiguráció változás, vagy éppen a futtatókörnyezet áthelyezheti a folyamatot egy másik fizikai elérésre) általában mindent helyi állapotot (mint például a memória és az állományrendszer) eltöröl.

Az Asset csomagolók, mint a [django-assetpackager](http://code.google.com/p/django-assetpackager/) az állományrendszert használják a lefordított elemek gyorsítótárazásához. A tizenkét tényezős alkalmazásfejlesztés jobban szereti, 
ha ezeket a fordításokat az [előállítási szakasz](/build-release-run) során tesszük meg. Vannak olyan Asset csomagolók, mint a [Jammit](http://documentcloud.github.com/jammit/) és a [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) amiket konfigurálhatunk annak érdekében, hogy az Assetek csomagolását az előállítási szakasz során végezzék el.

Egyes webes rendszerek ["post-it munkamenetek"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence)-re támaszkodnak -- vagyis gyorsítótárazzák a felhasználó munkamenetének az adatait az alkalmazás folyamatához rendelt memóriában, és elvárják, hogy az azonos látogató jövőbeni kéréseit ugyanehhez a folyamathoz irányítsuk. Ez ellenkezik a tizenkét-tényezős alkalmazásfejlesztés elveivel, ilyet sosem szabad használni vagy sosem szabad erre a működésre támaszkodni. A munkamenet állapotának adataihoz a jó jelölt egy olyan adatbázis, ami lejárati időt is kínál az adatokhoz, ilyen például a [Memcached](http://memcached.org/) vagy a [Redis](http://redis.io/).
