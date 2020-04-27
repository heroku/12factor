## III. Konfiguracja
### Przechowuj konfigurację w środowisku

*Konfiguracja* to jedyny element, który może się różnić pomiędzy [wdrożeniami](./codebase) aplikacji (staging, produkcja, środowisko developerskie, etc). W jej skład wchodzą:

* Ustawienia połączeń do baz danych, Memcached, i innych [usług wspierających](./backing-services)
* Dane uwierzytelniające zewnętrznych usług takich jak Amazon S3 czy Twitter
* Wartości różne dla każdego wdrożenia, jak np. kanoniczna nazwa hosta

Aplikacja czasem przechowuje konfigurację jako stałe wartości w kodzie źródłowym. Niestety jest to złamanie zasady 12factor wg której konfiguracja jest **ściśle oddzielona od kodu aplikacji**.

Dowodem na to, czy aplikacja posiada swoją konfigurację oddzieloną od kodu jest to, czy można ją udostępnić na zasadach open source bez równoczesnego udostępniania np. danych uwierzytelniających.

Należy pamiętać, że definicja "konfiguracji" **nie** dotyczy wewnętrznych ustawień aplikacji takich jak np. plik `config/routes.rb` w Railsach lub to jak [są połączone moduły kodu](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) w [Springu](http://spring.io/). Konfiguracja tego typu nie zmienia się pomiędzy wdrożeniami co sprawia, że najbardziej odpowiednim miejscem do jej przechowywania jest kod aplikacji.

Innym podejściem do konfiguacji jest korzystanie z plików, które nie znajdują się w repozytorium i nie są wersjonowane, jak np. `config/database.yml` w Railsach. Jest to duże usprawnienie względem używania stałych wartości, które są zapisywane w repozytorium. Minusem tego rozwiązania jest możliwość przypadkowego umieszczenia pliku konfiguracyjnego w repo. Ponadto można spotkać się z tendencją do rozrzucania takich plików w różnych katalogach i różnych formatach, co czyni je trudnymi do znalezienia i zarządzania z jednego miejsca.

**Aplikacja 12factor przechowuje konfigurację w *zmiennych środowiskowych*** (czasem nazywane z języka angielskiego *env vars* lub *env*). W tej sytuacji można łatwo modyfikować zmienne środowiskowe pomiędzy wdrożeniami bez zmiany kodu aplikacji. W odróżnieniu do plików konfiguracyjnych istnieje mała szansa by zostały umieszczone przypadkowo w repozytorium. Ich kolejną zaletą jest to, że nie są powiązane z językiem programowania, frameworkiem, jak np. Java System Properties, czy też systemem operacyjnym.

Kolejnym zagadnieniem zarządzania konfiguracją jest jej grupowanie. Czasem aplikacje gromadzą konfigurację w grupach (czasem nazywane "środowiskami") nazywanych od nazwy wdrożenia, takie jak `development`, `test`, czy `produkcja` w Railsach. Ten sposób organizacji jest niestety nieskalowalny. Im więcej różnych wdrożeń, tym większa potrzeba nazw, jak np. `staging` czy `qa`. Wraz z rozwojem projektu programiści mogą dodawać swoje specjalne konfiguracje, jak `staging-józefa`. Efektem tego mogą być niezliczone kombinacje nazw plików konfiguracyjnych, co utrudniać będzie zarządzanie wdrożonymi aplikacji.

W aplikacji 12factor zmienne środowiskowe służą do precyzyjnej kontroli poszczególnych ustawień, posiadając różne, nie mylące się ze sobą nazwy. Nigdy nie są zgrupowane w "środowiskach", tylko niezależnie ustawiane dla każdego wdrożenia. Taki model konfiguracji skaluje się bez problemu, nawet jeśli aplikacja będzie potrzebowała w przyszłości więcej zróżnicowanych wdrożeń.
