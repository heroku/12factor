## XI. Logi
### Traktuj logi jako strumień zdarzeń

*Logi* zapewniają wgląd w zachowanie działającej aplikacji. W środowiskach korzystających z serwera zazwyczaj są zapisywane na dysku (plik "logfile"); jednak jest to tylko wybrany format zapisu.

 Logi są listą zaagregowanych i uporządkowanych w czasie [zdarzeń](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) zebranych ze strumieni wyjściowych wszystkich uruchomionych procesów i usług wspierających. Logi w swojej pierwotnej formie występują zazwyczaj w formacie tekstowym, gdzie jedno zdarzenie zajmuje jedną linię w pliku (wyjątkiem jest jednak [backtrace](https://en.wikipedia.org/wiki/Stack_trace), który może zajmować wiele linii). Logi nie mają określonego początku ani końca, napływają nieustannie podczas działania aplikacji.

**Aplikacja 12factor nie odpowiada za przekierowywanie i zapis swojego strumienia wyjściowego.** Nie powinna też zapisywać czy zarządzać plikami logów. Zamiast tego, każdy działający proces zapisuje swój niebuforowany strumień zdarzeń do `stdout`. Podczas pracy w lokalnym środowisku developer może obserwować zachowanie aplikacji przeglądając strumień w oknie terminala

We wdrożeniu stagingowym czy produkcyjnym, każdy strumień procesów zostanie przechwycony przez środowisko wykonawcze, dołączony do pozostałych i skierowany do jednego lub wielu miejsc w celu przeglądania i długoterminowego zapisu. Miejsca zapisu nie są widoczne ani konfigurowane przez aplikację - w całości zarządza nimi środowisko wykonawcze. W tym celu można skorzystać z narzędzi do obsługi logów (takich jak [Logplex](https://github.com/heroku/logplex) lub [Fluentd](https://github.com/fluent/fluentd)) dostępnych na licencji open-source.

Strumień zdarzeń aplikacji może być skierowany do pliku lub obserwowany w czasie rzeczywistym przy pomocy komendy `tail` w terminalu. Przeważnie strumień jest wysyłany do systemu indeksowania i analizowania jak np. [Splunk](http://www.splunk.com/), albo do systemu magazynowania danych jak [Hadoop/Hive](http://hive.apache.org/). Wymienione systemy oferują duże możliwości i elastyczność obserwacji i badania zachowań aplikacji w czasie, w tym:

* Wyszukiwanie konkretnych zdarzeń z przeszłości.
* Wizualizację masowych statystyk (np. zapytania na minutę).
* Wysyłanie powiadomień na podstawie wcześniej zdefiniowanych heurystyk (np. o tym, że liczba błędów przekroczyła dozwoloną wartość).
