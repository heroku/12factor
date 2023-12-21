## I. Kódbázis
### Egy kódbázis verziókezelő alkalmazásban rögzítve, több üzembehelyezés

Egy tizenkét tényezős alkalmazást minden esetben verziókezelő rendszerben rögzítünk, mint a [Git](http://git-scm.com/), a [Mercurial](https://www.mercurial-scm.org/), vagy a [Subversion](http://subversion.apache.org/). A verziókezelő adatbázis másolatát *kódtárnak* hívjuk (code repository, code repo, repo).

A *kódbázis* bármely egyetlen kódtár (repo) (központosított verziókövetési rendszernél, mint a Subversion), vagy bármely olyan csoportja a kódtáraknak (repo), amik a kezdő commit-ot megosztják (decentralizált verziókövető rendszerek esetén, mint a Git).

![Egy kódbázishoz több üzembehelyezés (deploy) tartozik](/images/codebase-deploys.png)

Egy alkalmazáshoz mindig pontosan egy kódbázis tartozik:

* Ha több kódbázis van, akkor az nem lehet egy alkalmazás. Ebben az esetben elosztott rendszerről beszélünk több összetevővel. Ilyenkor tekintsünk minden összetevőt egy-egy alkalmazásnak, és ezek az alkalmazások külön-külön már alkalmasak arra, hogy a 12 tényezős alkalmazásfejlesztés követelményeinek megfeleljenek.
* Ha több alkalmazás ugyanazt a kódot megosztja (például ugyanazt a függvényt használja), akkor ezek az alkalmazások megsértik a 12 tényezős alkalmazásfejlesztés előírásait. Ebben az esetben a megoldás az, hogy a megosztott kódot például egy könyvtárba ki kell szervezni, és az egyes alkalmazások közötti [függőségek feloldásának mechanizmusával](./dependencies) felhasználni ott, ahol szükség van rá.

Minden kódbázishoz tehát pontosan egy alkalmazás tartozik, azonban ezt az alkalmazást több környezetben és változatban is üzembe lehet helyezni (deploy). Az *üzembehelyezés (deploy)* az alkalmazásnak egy futó példánya. Ilyen például egy éles üzemeltetési (produktion) környezet, és egy vagy több különböző tesztelési környezet. Emellett minden fejlesztő gépére kerül egy-egy fejlesztői másolat is az alkalmazásból, amit a fejlesztő futtat, így ezek is üzembehelyezésnek (deploy) számítanak.

A kódbázis azonos minden üzembehelyezésnél (deploy) akkor is, ha nem minden üzembehelyezés (deploy) azonos kód verzióból (commit) készült. A fejlesztőknél lehetnek olyan módosítások (commit), amiket a tesztelési környezet(ek)en még nem helyeztünk üzembe (deploy), és a tesztkörnyezeteken is olyan változatot helyezünk üzembe (deploy), aminek nem minden változása (commit) van az éles üzembehelyezésben (deploy). De minden üzembehelyezés (deploy) ugyanazt a kódbázist (kódtárat, repo) használja, innen ismerjük fel, hogy ezek ugyanannak az alkalmazásnak a különböző üzembehelyezett (deploy) változatai.
