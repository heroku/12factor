## I. Zdrojový kód
### Mějte jeden zdrojový kód ve verzovacím systému a mnoho nasazení.

Twelve-factor aplikace je vždy sledována ve verzovacím systému, jako je například [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/) nebo [Subversion](http://subversion.apache.org/). Kopie verzovací databáze se nazývá *kódový repozitář*, často zkracováno jako *repozitář* nebo jen *repo*.

*Zdrojový kód* je jakýkoliv repozitář (v centralizovaném verzovacím systému jako je Subversion), nebo jakákoliv skupina repozitářů, které mají společný kořenový commit (v decentralizovaném verzovacím systému jako je Git).

![Jeden zdrojový kód má mnoho nasazení](/images/codebase-deploys.png)

Vždy existuje korelace jedna-ku-jedné mezi zdrojovým kódem a aplikací: 

* Pokud existuje více zdrojových kódů, nejedná se o aplikaci, ale o distribuovaný systém. Každá komponenta distribuovaného systému je dílčí aplikace, která může samostatně podléhat twelve-factor metodice.
* Více aplikací sdílejících stejný kód je porušení twelve-factor metodiky. Řešením je oddělení sdíleného kódu do knihovny, která se připojí pomocí [systému na správu závislostí](./dependencies).

Každá aplikace má pouze jeden zdrojový kód, ale nasazení jedné aplikace bude vícero. *Nasazení* je běžící instance aplikace. Typicky je to produkční web a jeden nebo více testovacích webů. Každý vývojář má navíc lokální vývojovou kopii běžící aplikace, každou takovou kopii lze také považovat za nasazení.

Zdrojový kód je stejný ve všech nasazeních, v každém nasazení však mohou být aktivní různé verze. Například vývojář má několik commitů, které ještě nejsou nasazeny v testovacím prostředí a na testovacím prostředí jsou commity, které zatím nejsou na produkci. Všechny verze však sdílejí jeden zdrojový kód a dá se tedy říct, že jsou různými nasazeními téže aplikace.

