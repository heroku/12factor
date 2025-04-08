## III. Konfiguracija
### Pohranite konfiguraciju u okruženje

*Konfiguracija* aplikacije je sve ono što će vjerojatno varirati između [implementacija](./codebase) (uprizorenje, produkcija, razvojna okruženja itd.). Ovo uključuje:

* Dršku resursa za bazu podataka, Memcached i druge [potporne usluge](./backing-services)
* Vjerodajnice za vanjske usluge kao što su Amazon S3 ili Twitter
* Vrijednosti specifične za pojedinu implementaciju kao što je kanonsko ime domaćina te implementacije

Aplikacije ponekad spremaju konfiguraciju kao konstante u kôdu. Ovo je kršenje metodologije dvanaest faktora, koja zahtijeva **strogo odvajanje konfiguracije od kôda**. Konfiguracija se značajno razlikuje od implementacije do implementacije, kôd ne.

Lakmus test za to da li aplikacija ima sve konfiguracije ispravno izvučene iz kôda je može li se baza izvornog kôda u bilo kojem trenutku učiniti otvorenim kôdom, bez ugrožavanja vjerodajnica.

Imajte na umu da ova definicija "konfiguracije" **ne** uključuje internu konfiguraciju aplikacije, kao što je `config/routes.rb` u Railsu, ili kako su [moduli kôda povezani](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-introduction) u [Springu](https://spring.io/). Ova vrsta konfiguracije se ne razlikuje između implementacije, pa je najbolje da bude izvedena u kôdu.

Drugi pristup konfiguraciji je korištenje konfiguracijskih datoteka koje nisu upisane u upravljanju revizijama, kao što je `config/database.yml` u Railsu. Ovo je veliko poboljšanje u odnosu na korištenje konstanti koje se upisuju u repo kôda, ali još uvijek ima slabosti: lako je greškom upisati konfiguracijsku datoteku u repo; postoji tendencija da konfiguracijske datoteke budu razbacane na različitim mjestima i u različitim formatima, što otežava pregled i upravljanje svim konfiguracijama na jednom mjestu. Nadalje, ovi formati obično su specifični za jezik ili okvir.

**Dvanaestofaktorska aplikacija pohranjuje konfiguraciju u *varijable okruženja*** (često skraćeno na *env vars* ili *env*). Env vars je lako mijenjati između implementacija bez promjene kôda; za razliku od konfiguracijskih datoteka, male su šanse da budu slučajno upisane u repo kôda; i za razliku od prilagođenih konfiguracijskih datoteka ili drugih konfiguracijskih mehanizama kao što su Java System Properties, one su standard koji ne ovisi o jeziku i OS-u.

Drugi aspekt upravljanja konfiguracijom je grupiranje. Ponekad aplikacije gomilaju konfiguriraciju u imenovane grupe (koje se često nazivaju "okruženja") nazvane prema određenim implementacijama, kao što su okruženja `development`, `test` i `production` u Railsu. Ova metoda ne skalira čisto: kako se stvara više implementacija aplikacije, potrebni su novi nazivi okruženja, kao što su `staging` ili `qa`. Kako projekt dalje raste, razvijatelji mogu dodati svoja posebna okruženja kao što je `joes-staging`, što rezultira kombinatornom eksplozijom konfiguracije, što upravljanje implementacijama aplikacije čini vrlo krhkim.

U dvanaestofaktorskoj aplikaciji, env vars su granularne kontrole, svaka potpuno ortogonalna na druge env vars. Nikada se ne grupiraju zajedno kao "okruženja", već se njima samostalno upravlja za svaku implementaciju. Ovo je model koji glatko skaliram prema gore jer se aplikacija prirodno širi na više implementacija tijekom svog životnog vijeka.
