## V.  Buduj, publikuj, uruchamiaj
### Oddzielaj etap budowania od uruchamiania

[Codebase](./codebase) jest przetwarzany we wdrożenie w trzech etapach (poza lokalnym środowiskiem).

* Podczas *etapu budowania* kod z repozytorium konwertowany jest do wykonywalnej paczki tzw. *buildu*. Używając wersji kodu zdefiniowanej przez commit w procesie deploymentu, w tym etapie pobiera i dołącza się do projektu [zależności](./dependencies) oraz kompiluje niezbędne zasoby.
* Podczas *etapu publikacji* aplikacji używany jest build stworzony w poprzednim etapie i konfigurowany na podstawie [ustawień](./config) obecnego wdrożenia.  Stworzony w ten sposób *release* zawiera zbudowane źródło kodu, jego konfigurację i jest gotowy do uruchomienia w wybranym środowisku.
* *Etap uruchamiania* (znany również jako "runtime") startuje aplikację w środowisku wykonawczym przez uruchomienie zestawu [procesów](./processes) w oparciu o wcześniej przygotowany release.

![Kod staje się buildem, jeśli zostanie połączony z konfiguracją by stworzyć release](/images/release.png)

**Aplikacja 12factor ściśle rozgranicza etapy budowy, publikacji i uruchomiania**  Kiedy aplikacja została już uruchomiona, nie można zmienić jej kodu w inny sposób niż zbudować ją na nowo na podstawie wcześniej naniesionych zmian.

Narzędzia do obsługi wdrożeń zazwyczaj oferują moduły do zarządzania releasami, w tym możliwość do powrotu do poprzedniej wersji (rollback). Np. narzędzie [Capistrano](https://github.com/capistrano/capistrano/wiki) przechowuje releasy w podkatalogu `releases`, gdzie obecna wersja opublikowanej aplikacji jest symlinkowana do jednej z wersji przechowywanej w katalogu Capistrano. Komenda `rollback` pozwala na szybką zmianę  wersji opublikowanej aplikacji na jedną z poprzednich.

Każdy release powinien zawsze posiadać unikalny identyfikator, jak np. data publikacji aplikacji (taka jak `2011-04-06-20:32:17`) lub inkrementowany numer (np. `v100`). Do rejestru opublikowanych wersji aplikacji można jedynie dodawać jej nowe wersje, jego zawartość nie może być zmieniana w żaden inny sposób.

Aplikacja może zostać zbudowana gdy developer zdecyduje o wdrożeniu zmian do kodu. Uruchomienie aplikacji może natomiast nastąpić automatycznie po restarcie serwera lub jednego z procesów aplikacji po błędzie krytycznym. Dlatego też etap uruchamiania aplikacji powinien być jak najbardziej jednolity minimalizując równocześnie ryzyko wystąpienia problemów ze startem aplikacji - mogą one spowodować zaprzestanie działania aplikacji np. w nocy, kiedy to nie ma żadnego developera "pod ręką". Etap budowy aplikacji może być bardziej złożony, ponieważ ewentualne błędy są zawsze widoczne dla developera, który nadzoruje ten proces.
