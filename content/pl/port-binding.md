## VII. Przydzielanie portów
### Udostępniaj usługi przez przydzielanie portów

Zdarza się, że aplikacje internetowe uruchamiane są w ramach serwera web. Napisane w PHP np. działają jako moduł [Apache HTTPD](http://httpd.apache.org/), natomiast aplikacje w Javie mogą być uruchomiane wewnątrz serwera aplikacji, np. [Tomcat](http://tomcat.apache.org/).

**Aplikacja 12factor nie posiada zewnętrznych zależności** co czyni ją niezależną wobec innych modułów znajdujących się na serwerze. Aplikacja internetowa **udostępniać będzie np. HTTP w formie usługi przez przydzielenie portu**. Umożliwia jej to obsługę zapytań przychodzących do wybranego portu.

Aby skorzystać z usługi udostępnionej przez aplikację, developer może otworzyć adres URL jak np. `http://localhost:5000/`. W przypadku aplikacji wdrożonej w środowisku produkcyjnym zapytania do udostępnionej publicznie nazwy hosta są obsługiwane przez warstwę nawigacji. Kierowane są one później do procesu sieciowego udostępnionego na danym porcie.

Kwestię obsługi takich zapytań można rozwiązać dodając bibliotekę webservera jako kolejną [zewnętrzną zależność](./dependencies), jak np. [Tornado](http://www.tornadoweb.org/) w Pythonie, [Thin](http://code.macournoyer.com/thin/) w Ruby, lub [Jetty](http://www.eclipse.org/jetty/) dla Javy i innych języków opierających się na JVM. Obsługa zapytania jest całkowicie oprogramowana przez kod aplikacji, natomiast kontraktem ze środowiskiem wykonawczym jest przydzielenie portu w celu obsłużenia tego zapytania.

HTTP nie jest jedyną usługą, którą możną eksportować przez przydzielenie portu. Niemal każdy rodzaj oprogramowania serwerowego może być uruchomiony przez przydzielenie portu na którym jest uruchomiony proces i oczekiwać na przychodzące zapytania. Do przykładów należą [ejabberd](http://www.ejabberd.im/) (komunikujący się przez [XMPP](http://xmpp.org/)), oraz [Redis](http://redis.io/) (komunikujący się przez [Redis protocol](http://redis.io/topics/protocol)).

Warto również zauważyć, że przez przydzielnie portu aplikacja może pełnić funkcję [usługi wspierającej](./backing-services) dla innej aplikacji przez udostępnienie swojego adresu URL jako adres zasobu w [konfiguracji](./config) tejże aplikacji.
