## VI. Procesi
### Izvršavajte aplikaciju kao jedan ili više procesa bez stanja

Aplikacija se izvršava u izvršnom okruženju kao jedan ili više *procesa*.

U najjednostavnijem slučaju, kôd je samostalna skripta, izvršno okruženje je lokalno prijenosno računalo razvijatelja s instaliranim interpreterom i standardnom bibliotekom jezika, a proces se pokreće putem naredbenog retka (na primjer, `python my_script.py`). S druge strane spektra, produkcijska implementacija sofisticirane aplikacije može koristiti mnoge [vrste procesa, instancirane u nula ili više pokrenutih procesa](./concurrency).

**Dvanaestofaktroski procesi su bez stanja i [ništa ne dijele međusobno](https://en.wikipedia.org/wiki/Shared_nothing_architecture).** Svi podaci koji moraju postojati moraju se pohraniti u [potpornu uslugu](./backing-services), uobičajeno bazu podataka.

Memorijski prostor ili datotečni sustav procesa može se koristiti kao kratka predmemorija za jednu transakciju. Na primjer, preuzimanje velike datoteke, rad s njom i pohranjivanje rezultata operacije u bazu podataka. Dvanaestofaktorska aplikacija nikada ne pretpostavlja da će sve što je predmemorirano u memoriji ili na disku biti dostupno u budućem zahtjevu ili poslu -- s velikim brojem pokrenutih procesa svake vrste, velike su šanse da će budući zahtjev poslužiti drugi proces. Čak i kada se izvodi samo jedan proces, ponovno pokretanje (pokrenuto implementacijom kôda, promjenom konfiguracije ili izvršnim okruženjem koje premješta proces na drugu fizičku lokaciju) obično će izbrisati svo lokalno (npr. memoriju i datotečni sustav) stanje.

Alati za pakiranje imovine poput [django-assetpackager](https://code.google.com/archive/p/django-assetpackager/) koriste datotečni sustav kao predmemoriju za prevedenu imovinu. Dvanaestofaktorska aplikacija radije obavlja ovo prevođenje tijekom [stadija izgradnje](./build-release-run). Alati za pakiranje imovine kao što su [Jammit](https://documentcloud.github.io/jammit/) i [Rails asset pipeline](https://guides.rubyonrails.org/asset_pipeline.html) mogu se konfigurirati za pakiranje imovine tijekom stadija izgradnje.

Neki web sustavi oslanjaju se na ["ljepljive sesije"](https://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- to jest, predmemoriranje podataka korisničke sesije u memoriju procesa aplikacije i očekivanje da će budući zahtjevi istog posjetitelja biti preusmjereni na isti proces. Ljepljive sesije su kršenje metodologije dvanaest faktora i nikada se ne smiju koristiti niti se na njih oslanjati. Podaci o stanju sesije dobar su kandidat za pohranu podataka koja nudi vremenski istek, kao što je [Memcached](https://memcached.org/) ili [Redis](https://redis.io/).
