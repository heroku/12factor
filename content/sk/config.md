## III. Konfigurácia
### Konfigurácia uložená v prostredí

*Konfigurácia* aplikácie je všetko, čo sa líši medzi [nasadeniami](./codebase) (staging, produkcia, vývojárske prostredie, atď).  To zahŕňa:

* Pripojenia k databázam, Memcached a iným [podporným službám](./backing-services)
* Prihlasovacie údaje k externým službám ako Amazon S3 alebo Twitter
* Špeciálne hodnotu Per-nasadenie values such ako napríklad kanonické názvy hostov.

Aplikácia si niekedy ukladá konštanty v kóde. Toto je porušenie dvanástich faktorov, ktoré vyžaduje **striktné oddelenie konfigurácie od kódu**.  Konfigurácia sa medzi nasadeniami podstatne odlišuje, kód nie.

Litmusovým testom správneho oddelenia konfigurácie, je to či by mohla byť v ktoromkoľvek momente open-sourcovaná bez úniku prihlasovacích údajov.

Všimnite si, že definícia "konfigurácie" **nezahŕňa** internú konfiguráciu aplikácie, ako napríklad `config/routes.rb` v Rails, alebo [prepojenie modulov](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) v [Spring](http://spring.io/).  Tento typ konfigurácie sa medzi nasadeniami nelíši, a preto je najlepšie ho nechať v kóde.

Ďalšou možnosťou, ako pristupovať ku konfiguráciám je mať konfiguračné súbory, ktoré nie sú uložené v revíznom systéme, ako napríklad `config/database.yml` v Rails.  Je to obrovské zlepšenie oproti konštantám uloženým v repozitári, ale stále má slabosť: je veľmi jednoduché omylom tento súbor uložiť do repozitára; je tendencia mať konfiguračné súbory na rôznych miestach a v rôznych formátoch, a preto je ťažké ich spravovať z jedného miesta. Navyše, tieto formáty zvyknú byť špecifické pre jazyk alebo framework.

**Dvanásť faktorová aplikácia konfiguráciu ukladá v *premenných prostredia*** (často skrátané na *env vars* alebo *env*).  Premenné prostredia sa dajú jednoducho meniť pri nasadeniach bez potreby zmeny v kóde; na rozdiel od konfiguračných súborov je minimálna šanca, že ich niekto omylom uloží do repozitára; a narozdiel od rôznych konfiguračných súborov, alebo iných konfiguračných mechanizmov ako napr. Java System Properties, premenné prostredia sú nezávislé na jazyku alebo OS.

Ďalším pohľadom na správu konfigurácie je zoskupovanie.  Niekedy aplikácie zoskupia konfigurácie do pomenovaných skupín (často nazývaných called "prostredia") a sú pomenované podľa jednotlivých typov nasadení, ako napríklad `development`, `test`, a `production` prostredia v Rails.  Tento spôsob je náročné škálovať čistým spôsobom: ako pribúdajú ďalšie typy nasadení, je potrebné vytvárať nové názvy prostredí, ako napríklad `staging` alebo `qa`.  Ako projekt ďalej rastie, developeri môžu pridávať ďalšie vlastné špeciálne prostredia ako `joes-staging`, a výsledkom je kombinatorická explózia konfiguračných prostredí a tým sa stáva spravovanie nasadení veľmi citlivé.

V dvanásť faktorovej aplikácii sú premenné prostredia granulárne nastavenia, každé ortogonálne k inej premennej prostredia.  Nikdy sa nezoskupujú spolu do pomenovaných "prostredí", ale namiesto toho sú nezávisle spravované pre každé nasadenie.  Tento model sa plynule škáluje počas prirodzeného rastu aplikácie ako pribúdajú ďalšie typy nasadení.
