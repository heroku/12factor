## X. Jednolitość środowisk
### Utrzymuj środowisko developerskie, stagingowe i produkcyjne tak podobne jak tylko możliwe

Z doświadczenia wiadomo, że od zawsze istniały różnice pomiędzy środowiskiem developerskim (developer pracujący nad swoją lokalną wersją [kodu](./codebase) aplikacji) a produkcyjnym (działająca aplikacja dostępna dla użytkowników. Ze względu na ich charakter, możemy wymienić trzy rodzaje różnic:

* **Różnica czasowa:** Developer może pracować nad kodem przez dni, tygodnie, miesiące zanim ostatecznie pojawi się on w wersji produkcyjnej.
* **Różnica odpowiedzialności**: Developer tworzy kod aplikacji, natomiast kto inny wdraża go na produkcję.
* **Różnica narzędzi**: Developer może używać narzędzi takich jak Nginx, SQLite i systemu OS X, natomiast wersja produkcyjna będzie opierać się na Apache, MySQL i systemie Linux.

**Aplikacja 12factor jest zaprojektowana tak by można ją było [bez przerwy wdrażać na produkcję](http://avc.com/2011/02/continuous-deployment/) minimalizując różnice pomiędzy środowiskami.** Mając na uwadze powyższe różnice, można sobie z nimi radzić na różne sposoby:

* Zmniejsz czas deploymentu: czas wdrożenia kodu napisanego przez developera powinien być mierzony w godzinach, a nawet w minutach.
* Przenieś odpowiedzialność: developer piszący kod powinien być zaangażowany we wdrożenia aplikacji na produkcję.
* Stosuj ten sam zestaw narzędzi: utrzymuj wszystkie środowiska w których działa aplikacja tak podobne jak to możliwe.

Podsumowując w formie tabeli:

<table>
  <tr>
    <th></th>
    <th>Tradycyjna aplikacja</th>
    <th>Aplikacja 12factor</th>
  </tr>
  <tr>
    <th>Czas pomiędzy wdrożeniami</th>
    <td>Tygodnie</td>
    <td>Godziny</td>
  </tr>
  <tr>
    <th>Tworzenie kodu vs wdrażanie kodu</th>
    <td>Różne osoby</td>
    <td>Te same osoby</td>
  </tr>
  <tr>
    <th>Środowisko developerskie vs produkcyjne</th>
    <td>Mocno różniące się</td>
    <td>Jak najbardziej zbliżone</td>
  </tr>
</table>

Zachowanie podobieństw między wdrożeniami jest ważne w przypadku [usług wspierających](./backing-services) takich jak baza danych aplikacji, system kolejkowania czy też cache. Wiele języków oferuje biblioteki, które upraszczają korzystanie z usług wspierających w tym *adaptery* do usług różnego typu. Kilka przykładów w tabeli poniżej:

<table>
  <tr>
    <th>Typ</th>
    <th>Język</th>
    <th>Biblioteka</th>
    <th>Adaptery</th>
  </tr>
  <tr>
    <td>Baza danych</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Kolejka</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Pamięć, system plików, Memcached</td>
  </tr>
</table>

Czasami zdarza się, że developerzy w swoim lokalnym środowisku wolą korzystać z "lżejszych" wersji różnych usług, na produkcji natomiast używając bardziej zaawansowanych narzędzi. Przykładem takiej sytuacji jest używanie lokalnie SQLite, a PostgreSQL na produkcji. Podobnie wygląda też użycie pamięci podręcznej procesu na środowisku developerskim do cachowania pamięci, zamiast Memcached znajdującego się na produkcji.

**Developer postępujący zgodnie zasadami 12factor opiera się pokusie używania usług różniących się pomiędzy środowiskami**, nawet wtedy, gdy adaptery teoretycznie ukrywają różnice w implementacji pod warstwą abstrakcji. Z powodu różnic pomiędzy usługami wspierającymi mogą pojawić się niezgodności, powodując, że kod, który działał i był testowany lokalnie lub na stagingu, przestanie funkcjonować na produkcji. Pojawianie się tego typu błędów negatywnie wpływa na proces ciągłego wdrażania aplikacji. Czas stracony na wykrywaniu takich błędów i w konsekwencji awarii podczas wdrażania aplikacji może sporo kosztować, zwłaszcza gdy podobne problemy będą się z czasem gromadzić.

Lekkie wersje usług w obecnych czasach nie są już tak atrakcyjne jak kiedyś. Nowoczesne usługi takie jak Memcached, PostgreSQL oraz RabbitMQ nie są trudne do instalacji w lokalnym środowisku, dzięki narzędziom jak [Homebrew](http://mxcl.github.com/homebrew/) i [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Innym rozwiązaniem są narzędzia do deklaratywnego [provisioningu](https://en.wikipedia.org/wiki/Provisioning) takie jak [Chef](http://www.opscode.com/chef/) czy [Puppet](http://docs.puppetlabs.com/) połączone z lekkimi środowiskami wirtualnymi jak np. [Vagrant](http://vagrantup.com/). Pozwala ono developerom na uruchamianie lokalnych środowisk, które są bardzo zbliżone do produkcyjnych. Koszt instalacji i używania takich rozwiązań jest stosunkowo niski, biorąc pod uwagę korzyści płynące z utrzymywania jednolitych środowisk i procesu ciągłego wdrażania aplikacji.

Adaptery dla różnych usług wspierających są wciąż użyteczne, gdyż dzięki nim zmiana usługi jest relatywnie łatwa. Należy jednak pamiętać, że wszystkie wdrożenia aplikacji (środowiska developerskie, stagingowe, produkcyjne) powinny używać tych samych typów i wersji usług wspierających.
