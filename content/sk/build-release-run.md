## V. Build, release, run
### Jasne oddelené fázy build, release a run

[Kód](./codebase) sa transformuje do (nevývojárskeho) nasadenia troma krokmi:

* *Krok build* transformuje kód v repozitári na vykonateľný balík nazývaný *build*.  Použitím verzie kódu v čase commitu špecifikovaného nasadzovacím procesom, krok build stiahne [závislosti](./dependencies) a skompiluje binárky a assets.
* *Krok release* zoberie build vytvorený predchádzajúcim krokom a skombinuje ho s aktuálnou [konfiguráciou](./config) pre dané nasadenie.  Výsledok *release* obsahuje build a konfiguráciu pripravené na okamžité vykonanie v exekučnom prostredí.
* *Krok run* (alebo "runtime") spustí aplikáciu v exekučnom prostredí naštartovaním aplikačných [procesov](./processes) voči danému release.

![Kód sa stane buildom, ktorý sa skombinuje s konfiguráciou a vytvorí sa release.](/images/release.png)

**Dvanásť faktorová aplikácia striktne oddeľuje fázy build, release a run.**  Napríklad: je nemožné spraviť zmeny v kóde počas jeho behu, keďže neexistuje spôsob, ako by sa tieto zmeny dostali späť do fázy build.

Nástroje na nasadzovanie zvyčajne ponúkajú spôsoby na správu release, hlavne teda možnosť vrátiť sa na predchádzajúci release.  Napríklad [Capistrano](https://github.com/capistrano/capistrano/wiki) si ukladá release v podpriečinku s názvom `releases`, kde je aktuálny release symlink na priečinok s aktuálnym releasom.  Tento príkaz `rollback` umožňuje jednoducho a rýchlo vrátiť sa na predchádzajúci release.

Každý release by mal vždy mať unikátne release ID, ako napríklad timestamp release (napríklad `2019-04-06-20:32:17`) alebo inkrementálne číslo (napr. `v100`).  Releasy sú záznamy, ktoré iba pribúdajú a release sa nedá zmeniť potom jeho vytvorení.  Každá zmenu musí vytvoriť nový release.

Buildy inicializujú developeri aplikácie kedykoľvek sa nasadzuje nový kód. Vykonávanie behu sa na rozdiel od buildov vykonáva automaticky v prípade reštartu servera, alebo pri reštarte padnutého procesu správcom procesov.  Preto by fáza spustenia mala mať čo najmenej pohyblivých častí, keďže problémy, ktoré so spustením aplikácie môžu nastať v strede noci, keď developeri nie sú k dispozícii.  Fáza build môže byť komplexnejšia, keďže chyby sú vždy viditeľné developerom, ktorí spustili nasadenie.

