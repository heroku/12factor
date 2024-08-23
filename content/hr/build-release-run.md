## V. Izgradnja, izdavanje, pokretanje
### Strogo razdvojite stadije izgradnje i pokretanja

[Baza izvornog kôda](./codebase) pretvara se u (nerazvojnu) implementaciju kroz tri stadija:

* *Stadiij izgradnje* je transformacija koja pretvara repo kôda u izvršni paket poznat kao *izgradnja*. Koristeći verziju kôda na commitu navedenom u procesu implementacije, stadij izgradnje dohvaća od dobavljača [zavisnosti](./dependencies) i stvara binarne datoteke i imovinu.
* *Stadij izdavanja* uzima izgradnju proizvedenu stadijem izgradnje i spaja je s trenutnom [konfiguracijom](./config) implementacije. Rezultirajuće *izdanje* sadrži i izgradnju i konfiguraciju te je spremno za trenutno izvršavanje u izvršnom okruženju.
* *Stadij pokretanja* (također poznata kao "runtime") pokreće aplikaciju u izvršnom okruženju, pokretanjem nekog skupa [procesa](./processes) aplikacije prema odabranom izdanju.

![Kôd postaje izgradnja koja se kombinira s konfiguracijom za stvaranje izdanja.](/images/release.png)

**Dvanaestofaktorska aplikacija koristi strogo razdvajanje između stadija izgradnje, izdavanja i pokretanja.** Na primjer, nemoguće je unijeti promjene u kôd tijekom izvođenja jer ne postoji način da se te promjene prenesu natrag u stadij izgradnje.

Alati za implementaciju obično nude alate za upravljanje izdanjima, posebice mogućnost vraćanja na prethodno izdanje. Na primjer, alat za implementaciju [Capistrano](https://capistranorb.com/) pohranjuje izdanja u poddirektorij pod nazivom `releases`, gdje je trenutno izdanje simbolička poveznica na trenutni direktorij izdanja. Njegova naredba `rollback` olakšava brzi povratak na prethodno izdanje.

Svako izdanje uvijek treba imati jedinstveni identifikator izdanja, kao što je vremenska oznaka izdanja (kao što je `2011-04-06-20:32:17`) ili rastući broj (kao što je `v100`). Skup izdanja je namijenjen samo za dodavanje i izdanje se ne može mijenjati nakon što je stvoreno. Svaka promjena mora stvoriti novo izdanje.

Izgradnje pokreću razvijatelji aplikacije svaki put kad se implementira novi kôd. Za razliku od toga, pokretanje može se dogoditi automatski tijekom izvršavanja u slučajevima kao što je ponovno pokretanje poslužitelja ili srušeni proces kojeg ponovno pokreće upravitelj procesa. Stoga bi se stadij izvršavanja trebao zadržati na što manje pokretnih dijelova, budući da problemi koji sprječavaju pokretanje aplikacije mogu uzrokovati da se pokvari usred noći kada nema razvijatelja. Stadij izgradnje može biti složeniji, budući da su pogreške uvijek u prvom planu za razvijatelja koji pokreće implementaciju.
