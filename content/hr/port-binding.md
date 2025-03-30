## VII. Povezivanje na vrata
### Izvezite usluge putem povezivanja na vrata

Web aplikacije se ponekad izvode unutar spremnika web poslužitelja. Na primjer, PHP aplikacije mogu se izvoditi kao modul unutar [Apache HTTPD](https://httpd.apache.org/) ili se Java aplikacije mogu izvoditi unutar [Tomcata](https://tomcat.apache.org/).

**Dvanaestofaktorska aplikacija je potpuno samostalna** i ne oslanja se na ubacivanje web poslužitelja tijekom izvođenja u okruženje izvršenja za stvaranje usluge usmjerene na web. Web aplikacija **izvozi HTTP kao uslugu povezujući se na vrata** i slušanjem zahtjeva koji dolaze na ta vrata.

U lokalnom razvojnom okruženju, razvijatelj posjećuje URL usluge kao što je `http://localhost:5000/` kako bi pristupio usluzi koju izvozi njihova aplikacija. U implementaciji, sloj usmjeravanja obrađuje zahtjeve za usmjeravanje od javnog imena domaćina do web procesa povezanog na vrata.

To se obično implementira korištenjem [deklaracije zavisnosti](./dependencies) za dodavanje biblioteke web poslužitelja u aplikaciju, kao što su [Tornado](https://www.tornadoweb.org/) za Python, [Thin](https://github.com/macournoyer/thin) za Ruby ili [Jetty](https://www.eclipse.org/jetty/) za Javu i druge jezike temeljene na JVM-u. To se u potpunosti događa u *korisničkom prostoru*, odnosno unutar kôda aplikacije. Ugovor s okruženjem za izvršavanje je povezivanje na vrata za posluživanje zahtjeva.

HTTP nije jedina usluga koja se može izvesti korištenjem povezivanja na vrata. Gotovo svaka vrsta poslužiteljskog softvera može se pokrenuti putem procesa koji se povezuje na vrata i čeka dolazne zahtjeve. Primjeri uključuju [ejabberd](https://www.ejabberd.im/) (priča [XMPP](https://xmpp.org/)) i [Redis](https://redis.io/) (priča [Redis protokol](https://redis.io/topics/protocol)).

Također imajte na umu da pristup povezivanjem na vrata znači da jedna aplikacija može postati [potporna usluga](./backing-services) za drugu aplikaciju, pružanjem URL-a potporne aplikacije kao ručke resursa u [konfiguraciji](./config) za aplikaciju koja je koristi.
