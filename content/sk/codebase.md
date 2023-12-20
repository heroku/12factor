## I. Zdrojový kód
### Jeden zdrojový kód vo verzionovacom systéme, veľa nasadení

Dvanásť faktorová aplikácia je vždy uložená vo verzionovacom systéme ako napríklad [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), alebo [Subversion](http://subversion.apache.org/). Kópia databázy verzionovacieho systému sa nazýva *repozitár kódu*, často skrátene *repozitár* alebo len *repo*.

*Zdrojový kód* je akýkoľvek repozitár (v centralizovanom verzionovacom systéme ako napr. Subversion), alebo akákoľvek skupina repozitárov, ktoré majú spoločný koreňový commit (v decentralizovanm verzionovacom systéme ako napr. Git).

![Jeden zdrojový kód má viacero nasadení](/images/codebase-deploys.png)

Vždy existuje korelácia jedna k jednej medzi zdrojovým kódom a aplikáciou:

* Ak je to viacero zdrojových kódov, nie je to aplikácia -- je to distribuovaný systém. Každý komponent v distribuovanom systéme je aplikácia, a každá môže osobitne spĺňať dvanásť faktorov.
* Viaceré aplikácie zdieľajúce jeden kód je porušenie dvanástich faktorov. Riešenie je oddelenie zdieľaného kódu do knižníc, ktoré sa pripoja pomocou [správy závislostí](./dependencies).

Každá aplikácia má len jeden zdrojový kód, ale nasadení jednej aplikácie bude viacero. *Nasadenie* je bežiaca inštancia aplikácie.  Typicky je to produkčný web a jeden alebo viacero testovacích webov. Navyše, každý developer má kópiu bežiacej aplikácie vo svojom vlastnom vývojovom prostredí, z ktorých každé sa ráta ako nasadenie.

Zdrojový kód je rovnaký na všetkých nasadeniach, aj keď samozrejvie rôzne verzie môžu byť aktívne na rôznych nasadeniach. Napríklad, developer má niekoľko commitov, ktoré nie sú nasadené na testovacom prostredí a na testovacom prostredí sú commity, ktoré ešte nie sú na produkcii.  Ale všetky zdieľajú jeden zdrojový kód a dá sa teda povedať, že sú rôznymi nasadeniami jednej aplikácie.
