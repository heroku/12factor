## V. Előállítás, telepítés, üzemeltetés
### Egyértelműen válasszuk külön a forráskód futtathatóvá alakítását (BUILD), telepítését (RELEASE) és telepített alkalmazásunk üzemeltetését (RUN)

A [kódbázis](./codebase) három szakaszban formálódik át (nem fejlesztői környezetbe) telepített alkalmazássá:

* Az *előállítási szakasz* az a transzformáció, amikor a forráskód kódtára átalakul futtatható alkalmazássá, amit *build*-nek hívunk. A forráskódnak vesszük azt a változatát, amit a fejlesztési eljárás elhelyezett a kódtárban, hozzávesszük a [függőségeket](./dependencies) és elkészítjük futtatható alkalmazást valamint a szükséges hozzávalókat (képek, egyéb bináris állományok, stb.)
* A *telepítési szakaszban* vesszük az előállítási szakaszban előállított futtatható alkalmazást, és kombináljuk az aktuális telepítési [konfigurációval](./config). Az eredményül kapott kiadás, amit hívunk *release*-nek is, tartalmazza a futtatható állományokat plusz a megfelelő konfigurációt, és azonnal alkalmas arra, hogy a futtatókörnyezetben futtassuk.
* Az *üzemeltetési szakaszban* (nevezzük "runtime"-nak is) a választott kiadást használva az alkalmazás megfelelő [folyamataiból](./processes) indítva futtatjuk az alkalmazást a végrehajtási környezetben.

![A kódból alkalmazás lesz, amit a konfigurációval kombinálunk a kiadás létrehozásához.](/images/release.png)

**A 12 tényezős alkalmazásfejlesztés élesen elkülöníti tehát az előállítási, telepítési és az üzemeltetési szakaszokat.** Például kizárja, hogy valaki a végrehajtásban lévő kódon változtasson, mivel ezt követően lehetetlen ezeket a változtatásokat a fordítási szakaszba visszaküldeni.

Általában a telepítési segédeszközök kínálnak kiadási verziókat kezelő eszközöket is, legalábbis lehetőséget adnak arra, hogy egy telepített változatról visszaálljunk egy korábban telepítettre. Például a [Capistrano](https://github.com/capistrano/capistrano/wiki) a kiadási változatokat a  `releases` nevű mappában tárolja, ahol az éppen aktuális változat egy szimbolikus link a megfelelő könyvtárra. A `rollback` parancs így egyszerűen vissza tud állni az előző kiadási változatra.

Minden kiadási változatnak egyedi azonosítóval (ID) kell rendelkeznie, mint például a készítésének időpontja (vagyis `2011-04-06-20:32:17`) vagy egy folyamatosan növekvő szám (mint a `v100`). A kiadási változatok összesége tulajdonképpen egy folyamatosan bővülő főkönyv. A kiadási változatok létrejöttük után már nem változhatnak. Bármilyen változáshoz új kiadást (release) kell készíteni.

A fordítási szakaszt az alkalmazás fejlesztői kezdeményezik, amikor új kódot tárolnak be a kódtárba. A végrehajtás pont fordítva: automatikus indítható, ha a szerver újraindul vagy az összeomlott folyamatatot a folyamatkezelő újraindította. Ezért aztán a végrehajtásnak olyan kevés elemből kell állnia, amennyire csak lehetséges, hiszen az éjszaka közepén kialakuló probléma esetén a fejlesztők nem állnak mindig rendelkezésre. A fordítási folyamat már lehet összetett, mivel a hiba visszaszáll a fejlesztőre, aki az adott változatért felel.

