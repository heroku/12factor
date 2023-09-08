## VI. Procesy
### Uruchamiaj aplikację jako jeden lub więcej bezstanowych procesów

Aplikacja jest uruchamiana w środowisku wykonawczym w postaci jednego lub kilku *procesów*.

W najprostszym przypadku kod aplikacji jest samodzielnym skryptem, środowiskiem wykonawczym jest laptop developera z wsparciem dla języka programowania, a proces jest uruchamiany za pomocą linii komend (na przykład `python my_script.py`). Innym razem wdrożenie produkcyjne mocno rozwiniętej aplikacji może wymagać wielu [różnych rodzajów procesów](./concurrency).

**Wg zasad 12factor, procesy są bezstanowe i [niewspółdzielące](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Jakiekolwiek dane wymagające zapisu muszą być zmagazynowane w "trwałej" [usłudze wspierającej](./backing-services), najczęściej będącą bazą danych.

Przestrzeń adresowa lub system plików procesu mogą być używane jako tymczasowy cache dla pojedynczych operacji. Przykładem jest pobieranie dużych plików, działanie na nich, a następnie zapisywanie wyników operacji w bazie danych. Aplikacja dwunastu aspektów nigdy nie zakłada, że jakiś fragment informacji zapisany w pamięci lub dysku będzie dostępny w przyszłości podczas jakiegokolwiek zapytania -- wraz z wieloma aktywnymi procesami rośnie szansa, że przyszłe zapytanie zostanie obsłużone przez zupełnie inny proces. Nawet w przypadku pojedynczego procesu, restart (spowodowany przez deployment kodu, zmianę konfiguracji lub przeniesienie procesu do innej fizycznej lokalizacji przez środowisko wykonawcze) zazwyczaj usunie wszystkie dane z lokalnego stanu aplikacji (system plików, pamięć podręczna).

Narzędzie do pakowania plików, z których korzysta aplikacja (takie jak [Jammit](http://documentcloud.github.com/jammit/) lub [django-compressor](http://django-compressor.readthedocs.org/)) używają systemu plików jako cache dla skompilowanych zasobów.  Wg 12factor taka kompilacja powinna mieć miejsce podczas [etapu budowy aplikacji](./build-release-run), jak to się dzieje np. w [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html).

Niektóre systemy sieciowe polegają na tzw. ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- oznacza to, że sesja użytkownika jest zapisywana tymczasowo w pamięci procesu aplikacji, zakładając, że kolejne zapytania dotyczące użytkownika będą kierowane do tego samego procesu. "Sticky sessions" są złamaniem zasad aplikacji 12factor i nigdy nie powinny być używane jako źródło informacji. Dane sesji nadają się bardziej do zapisu w magazynie oferującym wygasanie danych w czasie, jak np. [Memcached](http://memcached.org/) czy [Redis](http://redis.io/).

