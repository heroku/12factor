## I. Baza izvornog kôda
### Jedna baza izvornog kôda praćena u upravljanju revizijama, mnogo implementacija

Dvanaestofaktorska aplikacija uvijek se prati u sustavu upravljanja verzija, kao što je [Git](https://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), ili [Subversion](https://subversion.apache.org/). Kopija baze podataka za praćenje revizija poznata je kao *spremište kôda*, često skraćeno na *repo kôda* ili samo *repo*.

*Baza izvornog kôda* je bilo koji pojedinačni repo (u centraliziranom sustavu upravljanja revizija kao što je Subversion), ili bilo koji skup repoa koji dijele korijenski commit (u decentraliziranom sustavu upravljanja revizija kao što je Git).

![Jedna baza izvornog kôda preslikava se na mnoge implementacije.](/images/codebase-deploys.png)

Uvijek postoji korelacija jedan na jedan između baze izvornog kôda i aplikacije:

* Ako postoji više baza izvornog kôda, to nije aplikacija -- to je distribuirani sustav. Svaka komponenta u distribuiranom sustavu je aplikacija i svaka se pojedinačno može uskladiti s metodologijom dvanaest faktora.
* Više aplikacija koje dijele isti kôd predstavlja kršenje metodologije dvanaest faktora. Rješenje je ovdje ugraditi zajednički kôd u knjižnice koje se mogu uključiti putem [upravitelja zavisnosti](./dependencies).

Postoji samo jedna baza izvornog kôda po aplikaciji, ali bit će mnogo implementacija aplikacije. *Implementacija* je pokrenuta instanca aplikacije. Ona je tipično produkcijsko sjedište i jedno ili više probnih sjedišta. Osim toga, svaki razvijatelj ima kopiju aplikacije koja se izvodi u svom lokalnom razvojnom okruženju, a svaka takva se također karakterizira kao implementacija.

Baza izvornog kôda je ista za sve implementacije, iako različite verzije mogu biti aktivne u svakoj implementaciji. Na primjer, razvijatelj ima neke commitove koje još nisu implementirani u uprizorenje; probno sjedište ima neke commitove koji još nisu implemetnirani u produkciju. Ali svi dijele istu bazu izvornog kôda, što ih čini prepoznatljivim kao različite implementacije iste aplikacije.
