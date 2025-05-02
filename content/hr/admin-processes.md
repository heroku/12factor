## XII. Administrativni procesi
### Pokrenite administrativne/upravljačke zadatke kao jednokratne procese

[Formacija procesa](./concurrency) je niz procesa koji se koriste za obavljanje redovnog poslovanja aplikacije (kao što je rukovanje web zahtjevima) dok se ona izvodi. Osim toga, razvijatelji će često htjeti obaviti jednokratne administrativne zadatke ili zadatke održavanja za aplikaciju, kao što su:

* Pokretanje migracija baze podataka (npr. `manage.py migrate` u Djangu, `rake db:migrate` u Railsu).
* Pokretanje konzole (također poznata kao ljuska [REPL](https://en.wikipedia.org/wiki/Read-eval-print_loop)) za pokretanje proizvoljnog kôda ili pregled modela aplikacije u odnosu na aktivnu bazu podataka. Većina jezika pruža REPL pokretanjem tumača bez ikakvih argumenata (npr. `python` ili `perl`) ili u nekim slučajevima imaju zasebnu naredbu (npr. `irb` za Ruby, `rails console` za Rails).
* Pokretanje jednokratnih skripti predanih u repozitorij aplikacije (npr. `php scripts/fix_bad_records.php`).

Jednokratni administrativni procesi trebali bi se izvoditi u identičnom okruženju kao i redoviti [dugotrajni procesi](./processes) aplikacije. Pokreću se u odnosu na [izdanje](./build-release-run), koristeći istu [bazu izvornog kôda](./codebase) i [konfiguraciju](./config) kao i bilo koji proces koji se pokreće u odnosu na to izdanje. Administrativni kôd mora biti isporučen s kôdom aplikacije kako bi se izbjegli problemi sa sinkronizacijom.

Iste tehnike [izolacije zavisnosti](./dependencies) trebale bi se koristiti na svim vrstama procesa. Na primjer, ako Ruby web proces koristi naredbu `bundle exec thin start`, tada bi migracija baze podataka trebala koristiti `bundle exec rake db:migrate`. Isto tako, Python program koji koristi Virtualenv trebao bi koristiti isporučeni `bin/python` za pokretanje i web poslužitelja Tornado i svih `manage.py`-evih administrativnih procesa.

Metodologija dvanaest faktora snažno daje prednost jezicima koji pružaju ljusku REPL od početka korištenja i koji olakšavaju pokretanje jednokratnih skripti. U lokalnoj implementaciji, razvijatelji pozivaju jednokratne administrativne procese izravnom naredbom ljuske unutar direktorija za naplatu aplikacije. U produkcijskoj implementaciji, razvijatelji mogu koristiti ssh ili drugi mehanizam za daljinsko izvršavanje naredbi kojeg nudi izvršna okolina te implementacije za pokretanje takvog procesa.
