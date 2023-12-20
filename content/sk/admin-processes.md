## XII. Admin procesy
### Spúštanie administrátorských/správcovských úloh ako jednorazových procesov

[Process formation](./concurrency) je sada procesov, ktoré tvoria bežnú prevádzku aplikácie (napríklad odpovedanie na požiadavky).  Na rozdiel od toho, vývojári často chcú spraviť jednorazové administratívne alebo údržbové úlohy, ako napríklad:

* Spustenie databázovej migrácie (e.g. `manage.py migrate` v Django, `rake db:migrate` v Rails).
* Spustenie konzoly (alebo tiež [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) aby mohli spúštať ľubovoľný kód alebo skúmať modely aplikácie voči živej databáze.  Väčšina jazykov poskytuje REPL spustením interpretra bez argumentov (napr. `python` alebo `perl`) v niektorých prípadoch majú samostatný príkaz (napr. `irb` pre Ruby, `rails console` pre Rails).
* Spustenie jednorazových skriptov uložených v repozitári aplikácie (napr.. `php scripts/fix_bad_records.php`).

Jednorazové administračné procesy by sa mali spúštať v identickom prostredí ako bežné dlho [bežiace procesy](./processes) aplikácie.  Bežia voči [releasu](./build-release-run), použitím rovnakého [kódu](./codebase) a [konfigurácie](./config) ako ostatné procesy bežiace v rámci releasu. Administračný kód sa musí dodať spolu s kódom aplikácie, aby sa zamedzilo synchronizačným problémom.

Rovnaká technika [izolácie závislostí](./dependencies) by sa mala použiť pre všetky typy procesov.  Napríklad, ak Ruby webový proces používa príkaz `bundle exec thin start`, potom databázová migrácia by mala používať `bundle exec rake db:migrate`.  A podobne Python program používajúci Virtualenv by mal používať `bin/python` rovnako na spúšťania Tornado webservera aj všetkých `manage.py` administračných procesov.

Dvanásť faktorová aplikácia silne preferuje jazyky, ktoré poskytujú REPL shell už v základe, a ktoré jednoducho umožňujú spúštanie jednorazových skriptov.  Vývojári na lokálnom nasadení spúšťajú jednorazové administračné procesy priamym shell príkazom v priečinku aplikácie.  V produkčnom nasadení môžu vývojári použiť ssh alebo iný spôsob vzdialeného spúšťania príkazov, ktorý poskytuje dané exekučné prostredie na spustenie takého procesu.
