## VI. Procesy
### Execute the app as one or more stateless processes

Aplikácia sa vykonáva v exekučnom prostredí ako jeden alebo viac *procesov*.

V najjednoduchšom prípade je kód jednoduchý skript, exekučné prostredie je laptop developera s nainštalovaným kompilátorom/interpretrom jazyka, a proces sa spúšta z príkazového riadka (napríklad, `python my_script.py`).  Na druhej strane spektra, produkčné nasadenie sofistikovanej aplikácie môže mať viacero [typov procesov, inštancovaných do jedného alebo viacerých procesov](./concurrency).

**Dvanásť faktorové procesy sú bezstavové a [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Akékoľvek dáta, ktoré treba zachovať, musia byť uložené v stavovej [podpornej službe](./backing-services), typicky databáze.

Priestor pamäte alebo súborového systému procesu sa môže použiť ako krátka cache pre jednu transakciu.  Napríklad, stiahnutie veľkého súboru, práca nad ním a uloženie výsledkov operácie do databázy.  Dvanásť faktorová aplikácia nikdy neočakáva, že by bolo čokoľvek nacachované v pamäti alebo na disku pre budúce požiadavky alebo úlohy -- je vysoká šanca, že pri viacerých bežiacich procesoch bude ďalšia požiadavka vykonaná iným procesom. Aj keď beží len jeden process, reštart (spustený nasadením kódu, zmenou konfigurácie, alebo exekučným prostredím premiestni proces na iné fyzické miesto) zvyčajne vymaže všetky lokálne (napr. pamäť a súborový systém) stavy.

Balíčkovače ako napríklad [django-assetpackager](http://code.google.com/p/django-assetpackager/) používajú súborový systém ako cache na kompilované súbory.  Dvanásť faktorová aplikácia preferuje túto kompiláciu počas [fázy build](/build-release-run). Balíčkovače [Jammit](http://documentcloud.github.com/jammit/) a [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) sa dajú nakonfigurovať, tak, že zabalia súbory počas fázy build.

Niektoré webové systémy sa spoliehajú na ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- teda cachovanie údajov o používateľskom sedení v pamäti procesu a očakávajú, že ďalšie požiadavky od daného návštevníka budú presmerované na ten istý proces.  Sticky sessions sú porušením dvanástich faktorov a nemali by sa nikdy používať ani na ne spoliehať.  Stav sedenia je dobrým kandidátom pre úložisko, ktoré poskytuje vypršanie po čase, ako napr. [Memcached](http://memcached.org/) alebo [Redis](http://redis.io/).
