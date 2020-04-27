## XII. Zarządzanie aplikacją
### Uruchamiaj zadania administracyjne jako jednorazowe procesy

[Formacja](./concurrency) jest zestawem procesów używanych przez aplikację podczas jej działania (np. obsługi zapytań z sieci). Do często wykonywanych zadań administracyjnych należą:

* Wykonanie migracji bazy danych (np. `manage.py migrate` w Django, `rake db:migrate` w Railsach).
* Uruchomienie konsoli (znanej również jako powłoka [REPL](http://pl.wikipedia.org/wiki/REPL)) by wykonać fragment kodu lub podejrzeć modele działającej bazy danych. Większość środowisk języków programowania udostępnia REPL poprzez wywołanie interpretera bez dodatkowych argumentów (np. `python` lub `perl`). W innych przypadkach przeznaczone są do tego osobne polecenia (np. `irb` w Ruby, `rails console` w Railsach).
* Wykonywanie pojedynczych skryptów znajdujących się w repozytorium kodu aplikacji (np. `php scripts/fix_bad_records.php`).

Pojedyncze zadania powinny być uruchamiane w identycznym środowisku jak [długoterminowe procesy](./processes) aplikacji. Działają w ramach tego samego [wdrożenia](./build-release-run), używając tego samego [kodu](./codebase) i [konfiguracji](./config) jak każdy inny działający proces. Kod zadania administracyjnego musi zostać dołączony do kodu aplikacji by uniknąć problemów z synchronizacją.

Te same techniki [izolacji zależności](./dependencies) powinny być używane dla wszystkich typów procesów. Dla przykładu, jeśli proces sieciowy Ruby używa polecenia `bundle exec thin start`, wtedy do migracji bazy danych powinno się użyć `bundle exec rake db:migrate`. Podobnie program napisany w Pythonie używający Virtualenv powinien używać dołączonego `bin/python` by uruchomić zarówno webserver Tornado lub `manage.py` do procesów zarządzania.

Aplikacja 12factor zaleca używanie języków programowania, które udostępniają powłokę REPL oraz takich w których można łatwo uruchomić pojedynczy skrypt. W środowisku lokalnym developerzy uruchamiają zadania zarządzające aplikacją poprzez bezpośrednie wywołanie polecenia w konsoli w katalogu roboczym aplikacji. We wdrożeniu produkcyjnym, developer może użyć ssh lub innego mechanizmu służącego do zdalnego wykonywania poleceń, by uruchomić ten sam proces.
