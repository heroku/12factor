## III. Konfiguracja
### Trzymaj konfigurację w środowisku

*Konfiguracja* aplikacji jest wszystkim co może się różnić pomiędzy jej [wdrożeniami](./codebase) (staging, produkcja, środowisko developerskie, etc).  W jej skład wchodzą:

* Referencje zasobów dla bazy danych, Memcached, i innych [usług wspierających](./backing-services)
* Dane uwierzytelniające to zewnętrznych usług takich jak Amazon S3 czy Twitter
* Wartości różne dla każdego wdrożenia, jak np. kanoniczna nazwa hosta

Aplikacja czasem przechowuje konfigurację jako stałe w kodzie źródłowym. Niestety jest to złamanie dwunastu aspektów wg których konfiguracja musi być **ściśle oddzielona od kodu aplikacji**.

Wskaźnikiem, czy aplikacja swoją konfigurację ma wydzieloną od kodu jest to, czy aplikację można udostępnić open source w każdym momencie bez narażania danych uwierzytelniających.

Należy pamiętać, że definicja "konfiguracji" **nie** zawiera wewnętrznych ustawień aplikacji takich jak np. `config/routes.rb` w Railsach lub [code modules are connected](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) w [Springu](http://spring.io/).  Ten typ konfiguracji nie zmienia się pomiędzy wdrożeniami, więc najlepszym  miejscem jest dla niego kod aplikacji.

Innym podejściem do konfiguacji jest korzystanie z plików, które nie znajdują się w repozytorium i nie są wersjonowane, jak np. `config/database.yml` w Railsach. Jest to duże usprawnienie względem używania stałych wartości, które są zapisywane w repozytorium. Minusem tego rozwiązania jest możliwość przypadkowego umieszczenia pliku konfiguracyjnego w repo. Ponadto występuje tendencja do rozrzucania takich plików w różnych miejscach i różnych formatach, co czyni je trudnymi do znalezienie i zarządzania z jednego miejsca.

**Aplikacja dwunastu aspektów przechowuje konfigurację w *zmiennych środowiskowych*** (czasem nazywane z języka angielskiego *env vars* lub *env*). Zmienne środowiskowe są łatwe do zmiany pomiędzy wdrożeniami bez zmiany kodu aplikacji. W odróżnieniu od plików konfiguracyjnych jest mała szansa by zostały umieszczone przypadkowo w repozytorium. Ich kolejną zaletą jest to, że nie są powiązane z językiem programowania, frameworkiem, jak np. Java System Properties, czy też systemem operacyjnym.

Kolejnym zagadnieniem zarządzania konfiguracją jest jej grupowanie. Czasem aplikacje gromadzą konfigurację w grupach (czasem nazywane "środowiskami") nazywanych od nazwy wdrożenia, takie jak `development`, `test`, oraz `production` w Railsach. Ta metoda nie skaluje się bezproblemowo. Im więcej różnych wdrożeń, tym więcej potrzeba nazw, jak np. `staging` czy `qa`. Wraz z rozwojem projektu programiści mogą dodawać swoje specjalne konfiguracje, jak `staging-józefa`. Efektem tego mogą być niezliczone kombinacje nazw plików konfiguracyjnych, co dość utrudnia zarządzanie wdrożeniami aplikacji.

W aplikacji spełniającej dwanaście aspektów, zmienne środowiskowe służą do precyzyjnej kontroli poszczególnych ustawień, w pełni odróżniając się od siebie. Nigdy nie są zgrupowane w "środowiskach", a niezależnie zarządzane dla każdego wdrożenia. Taki model skaluje się bez problemu, nawet jeśli aplikacja będzie potrzebowała w przyszłości więcej zróżnicowanych wdrożeń.
