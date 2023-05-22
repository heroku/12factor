## X. Paritet razvoja/produkcije
### Održavajte razvoj, uprizorenje i produkciju što sličnijim

Povijesno gledano, postojale su značajne praznine između razvoja (razvijatelj koji uživo uređuje lokalnu [implementaciju](./codebase) aplikacije) i produkcije (pokrenuta implementacija aplikacije kojoj pristupaju krajnji korisnici). Te se praznine manifestiraju u tri područja:

* **Vremenski jaz**: razvijatelj može raditi na kôdu za koji su potrebni dani, tjedni ili čak mjeseci da krene u implementaciju.
* **Jaz među osobljem**: razvijatelji pišu kôd, operativni inženjeri ga implementiraju.
* **Jaz među alatima**: razvijatelji možda koriste stog poput Nginxa, SQLitea i OS X-a, dok produkcijska implementacija koristi Apache, MySQL i Linux.

**Dvanaestofaktorska aplikacija dizajnirana je za [kontinuiranu implementaciju](https://avc.com/2011/02/continuous-deployment/) tako da je jaz između razvoja i produkcije malen.** Gledajući tri opisane praznine iznad:

* Učinite vremenski razmak malenim: razvijatelj može napisati kôd i imati ga implementiranog satima ili čak samo nekoliko minuta kasnije.
* Učinite jaz među osobljem malenim: razvijatelji koji su napisali kôd usko su uključeni u njegovu implementaciju i promatranje njegovog ponašanja u produkciji.
* Učinite jaz među alatima malenim: održavajte razvoj i produkciju što sličnijima.

Sumirajući gore navedeno u tablicu:

|   | Tradicionalna aplikacija | Dvanaestofaktorska aplikacija |
| - | ------------------------ | ----------------------------- |
| Vrijeme između postavljanja | Tjedni | Sati |
| Autori kôda i implementatori kôda | Različiti ljudi | Isti ljudi |
| Razvojna i produkcijska okruženja | Divergentna | Što je moguće sličnija |

[Potporne usluge](./backing-services), kao što su baza podataka aplikacije, sustav za upravljanje redovima čekanja ili predmemorija, jedno je područje u kojem je važan paritet razvoja/produkcije. Mnogi jezici nude knjižnice koje pojednostavljuju pristup potpornoj usluzi, uključujući *adaptere* za različite vrste usluga. Neki primjeri su u donjoj tablici.

| Vrsta | Jezik | Knjižnica | Adapteri |
| ----- | ----- | --------- | -------- |
| Baza podataka | Ruby/Rails | ActiveRecord | MySQL, PostgreSQL, SQLite |
| Red čekanja | Python/Django | Celery | RabbitMQ, Beanstalkd, Redis |
| Predmemorija | Ruby/Rails | ActiveSupport::Cache | Memorija, datotečni sustav, Memcached |

razvijatelji ponekad pronalaze veliku privlačnost u korištenju lagane pozadinske usluge u svojim lokalnim okruženjima, dok će se ozbiljnija i robusnija pomoćna usluga koristiti u produkciji. Na primjer, korištenje SQLitea lokalno i PostgreSQL-a u produkciji; ili lokalnu procesnu memoriju za predmemoriju u razvoju i Memcached u produkciji.

**Dvanaestofaktorski razvijatelj odolijeva porivu za korištenjem različitih potpornih usluga između razvoja i produkcije**, čak i kada adapteri teoretski apstrahiraju sve razlike u potpornim uslugama. Razlike između potpornih usluga znače da se pojavljuju male nekompatibilnosti, što uzrokuje neuspjeh u produkciji kôda koji je radio i prošao testove u razvoju ili uprizorenju. Ove vrste pogrešaka stvaraju trenje koje destimulira kontinuiranu implementaciju. Trošak ovog trenja i naknadnog prigušenja kontinuirane implementacije iznimno je visok kada se promatra u zbroju tijekom životnog vijeka aplikacije.

Lagane lokalne usluge manje su uvjerljive nego što su nekada bile. Moderne potporne usluge kao što su Memcached, PostgreSQL i RabbitMQ nije teško instalirati i pokrenuti zahvaljujući modernim sustavima pakiranja, kao što su [Homebrew](https://brew.sh/) i [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Alternativno, deklarativni alati za osiguravanje resursa kao što su [Chef](https://www.chef.io/products/chef-infra) i [Puppet](https://puppet.com/docs/) u kombinaciji s laganim virtualnim okruženjima kao što su [Docker](https://www.docker.com/) i [Vagrant](https://www.vagrantup.com/) omogućuju razvijateljima pokretanje lokalnih okruženja koja su usko približna produkcijskim okruženjima. Troškovi instaliranja i korištenja ovih sustava su niski u usporedbi s prednostima pariteta razvoja/produkcije i kontinuirane implementacije.

Adapteri za različite potporne usluge i dalje su korisni jer čine prijenos na nove potporne usluge relativno bezbolnim. No, sve implementacije aplikacije (okruženja razvijatelja, uprizorenje, produkcija) trebaju koristiti istu vrstu i verziju svake od potpornih usluga.
