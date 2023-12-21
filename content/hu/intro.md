Bevezetés
=========

A modern korban a szoftvert általában szolgáltatásként szállítják: *webalkalmazásként* vagy *szoftverszolgáltatásként* (SaaS, Software as a Service). A tizenkét tényezős alkalmazásfejlesztés egy megközelítés ilyen szoftverszolgáltatás (SaaS) létrehozására, ami:

* A telepítések automatikussá tételéhez **deklaratív** formátumot használ, így csökkentve a legkisebbre az új fejlesztők projekthez csatlakozásának idejét és költségét;
* **átlátható kapcsolata (clean contract)** van a futtató operációs rendszerrel, így kínálva **maximális hordozhatóságot** a különböző üzemeltetési környezetek között;
* Alkalmas a modern **felhős környezetbe** történő **üzembehelyezésre (deployment)**, megszüntetve a szervereknek valamint a rendszerek adminisztrációjának a szükségességét;
* A legkisebbre csökkenti a fejlesztés és az üzemeltetés közötti **eltávolodást**(divergence), a legnagyobb rugalmasság érdekében elérhetővé teszi a **szünetmentes üzembehelyezést (continouos deployment)**;
* És az eszközök, a környezet vagy a fejlesztési gyakorlat jelentős változtatása nélkül **felfelé méretezhető (scale up)**.

A tizenkét tényezős alkalmazásfejlesztési megközelítés bármilyen programnyelven írt alkalmazáshoz felhasználható, és ez a háttérszolgáltatások (adatbázis, várakozósor, memória gyorsítótárazás, stb.) tetszőleges kombinációját használhatja.
