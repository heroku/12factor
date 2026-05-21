## XI. Zapisnici
### Tretirajte zapisnike kao tokove događaja

*Zapisnici* pružaju uvid u ponašanje pokrenute aplikacije. U okruženjima temeljenim na poslužitelju oni se obično zapisuju u datoteku na disku ("zapisnička datoteka"); ali ovo je samo izlazni format.

Zapisnici su [tok](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) agregiranih, vremenski poredanih događaja prikupljenih iz izlaznih tokova svih pokrenutih procesa i potpornih usluga. Zapisnici u svom sirovom obliku obično su tekstualni format s jednim događajem po retku (iako tragovi iz iznimki mogu obuhvaćati više redaka). Zapisnici nemaju fiksni početak ili kraj, već kontinuirano protiču sve dok aplikacija radi.

**Dvanaestofaktorska aplikacija nikada se ne bavi usmjeravanjem ili pohranom svog izlaznog toka.** Ne bi trebala pokušavati pisati ili upravljati datotekama zapisnika. Umjesto toga, svaki pokrenuti proces upisuje svoj tok događaja, bez međuspremnika, u `stdout`. Tijekom lokalnog razvoja, razvijatelj će vidjeti ovaj tok u prvom planu svog terminala kako bi promatrao ponašanje aplikacije.

U probnim ili produkcijskim implementacijama, tok svakog procesa bit će uhvaćen od strane izvršnog okruženja, poredan zajedno sa svim ostalim tokovima iz aplikacije i preusmjeren na jedno ili više konačnih odredišta radi pregleda i dugoročnog arhiviranja. Ova arhivska odredišta nisu vidljiva aplikaciji niti ih može konfigurirati, a umjesto toga njima u potpunosti upravlja okruženje izvršavanja. U tu svrhu dostupni su usmjerivači zapisnika otvorenog kôda (kao što su [Logplex](https://github.com/heroku/logplex) i [Fluentd](https://github.com/fluent/fluentd)).

Tok događaja za aplikaciju može se preusmjeriti u datoteku ili nadgledati preko tail-a u stvarnom vremenu u terminalu. Što je najvažnije, tok se može poslati u sustav indeksiranja i analize zapisnika kao što je [Splunk](https://www.splunk.com/) ili sustav za skladištenje podataka opće namjene kao što je [Hadoop/Hive](https://hive.apache.org/). Ovi sustavi omogućuju veliku snagu i fleksibilnost za introspekciju ponašanja aplikacije tijekom vremena, uključujući:

* Pronalaženje određenih događaja u prošlosti.
* Grafički prikaz trendova velikih razmjera (kao što su zahtjevi po minuti).
* Aktivno upozorenje prema korisnički definiranoj heuristici (kao što je upozorenje kada količina pogrešaka u minuti prijeđe određeni prag).
