## I. Kódbázis
### Egy kódbázis kódtárban kezelve, több telepítés

A tizenkét tényezős alkalmazást minden esetben verziókövető rendszerrel kezelünk, mint a [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), vagy [Subversion](http://subversion.apache.org/). A verziókövető adatbázist és másolatát *kódtárnak* hívjuk.

A *kódbázis* egy tetszőleges kódtár (központosított verziókövetési rendszernél, mint a Subversion), vagy bármilyen csoportja a kódtáraknak, amik a kezdő commit-et megosztják (decentralizált verziókövető rendszerek esetén, mint a Git)

![Egy kódbázis több telepítéshez tartozik](/images/codebase-deploys.png)

Egy alkalmazáshoz mindig pontosan egy kódbázis tartozik:

* Ha több kódbázis van, akkor az nem lehet egy alkalmazás. Ebben az esetben elosztott rendszerről beszélünk több összetevővel. Ilyenkor tekintsünk minden összetevőt egy-egy alkalmazásnak, és ezek az alkalmazások külön-külön már alkalmasak arra, hogy a 12 tényezős alkalmazásfejlesztés követelményeinek megfeleljenek.
* Ha több alkalmazás ugyanazt a kódot megosztja (például ugyanazt a függvényt használják, ugyanazt a konstans/modell kódot tartalmazzák stb.), akkor ezek az alkalmazások megsértik a 12 tényezős alkalmazásfejlesztés előírásait. Ebben az esetben a megoldás az, hogy a megosztott kódot például egy könyvtárba ki kell szervezni, és az egyes alkalmazások közötti [függőségek feloldásának mechanizmusával](./dependencies) felhasználni ahol szükség van rá.

Minden kódbázishoz tehát pontosan egy alkalmazás tartozik, azonban ezt az alkalmazást több környezetben és változatban is lehet telepíteni. A *telepítés* az alkalmazásnak egy futó példánya. Ilyen például az éles üzemeltetési (produkciós) környezet, különböző tesztelési környezetek. Emellett minden fejlesztő gépére kerül egy-egy fejlesztői másolat is az alkalmazásból.

A kódbázis azonos minden példánynál akkor is, ha nem minden telepítés azonos kód verzióból készült. A fejlesztőknél lehetnek olyan módosítások, amiket a tesztelési környezet(ek)re még nem telepítettünk, és a tesztkörnyezeteken is olyan változatot tesztelünk, aminek nem minden változása van az éles telepítésben. De minden telepítés ugyanazt a kódbázist (kódtárat) használja, innen ismerjük fel, hogy ezek ugyanannak az alkalmazásnak a különböző telepítései.
