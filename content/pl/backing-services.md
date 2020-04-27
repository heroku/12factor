## IV. Usługi wspierające
### Traktuj usługi wspierające jako przydzielone zasoby

Usługą wspierającą jest każda, z której aplikacja korzysta przez sieć jako część normalnego działania. Zaliczamy do nich np. magazyny danych (takie jak [MySQL](http://dev.mysql.com/) albo [CouchDB](http://couchdb.apache.org/)), systemy wysyłania/kolejkowania wiadomości (takie jak [RabbitMQ](http://www.rabbitmq.com/) czy [Beanstalkd](https://beanstalkd.github.io)), usługi SMTP do zewnętrznej wysyłki emaili (np. [Postfix](http://www.postfix.org/)) oraz systemy cachowania pamięci (np. [Memcached](http://memcached.org/)).

Usługa wspierająca taka jak baza danych jest zazwyczaj zarządzana przez tych samych programistów, którzy zajmują się wdrażaniem aplikacji. Dodatkowo aplikacja może również korzystać z usług oferowanych przez osoby trzecie. Do przykładów zaliczają się usługi SMTP ([Postmark](http://postmarkapp.com/)),usługi zbierające metryki ([New Relic](http://newrelic.com/) czy [Loggly](http://www.loggly.com/)), usługi przechowywania danych (takie jak [Amazon S3](http://aws.amazon.com/s3/)), czy również usługi dostępne przez publiczne API (jak np. [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), lub [Last.fm](http://www.last.fm/api)).

**Aplikacje 12factor nie rozróżniają usług lokalnych od zewnętrznych.** Dla aplikacji wszystkie są załączonymi zasobami, dostepnymi przez adres URL lub inny standard zdefiniowany w [konfiguracji](./config). Przy [wdrożeniu](./codebase) aplikacji nie może być problemów ze zmianą lokalnej bazy MySQL na oferowaną przez zewnętrznego usługodawcę (np. [Amazon RDS](http://aws.amazon.com/rds/)) bez żadnych zmian w kodzie aplikacji. Podobnie lokalny serwer SMTP może być zamieniony na zewnętrzną usługę SMTP (taką jak Postmark) bez zmian kodu. W obu przypadkach zmiana powinna wystąpić jedynie w konfiguracji aplikacji.

Każda usługa jest traktowana jako *zasób*. Zasobem będzie np. baza MySQL; dwie bazy danych (używane do [shardingu](https://en.wikipedia.org/wiki/Shard_(database_architecture)) w warstwie aplikacji) kwalifikują się jako dwa odrębne zasoby. Aplikacja 12factor traktuje te bazy danych jako *załączone zasoby*, co wskazuje, że nie są z nią trwale powiązane.

<img src="/images/attached-resources.png" class="full" alt="Produkcyjne wdrożenie aplikacji korzystajace z czterech usług wspierających." />

Zasoby mogą być dołączane i odłączane jeśli zajdzie taka potrzeba. W momencie gdy baza danych aplikacji z powodu usterek sprzętowych nie działa poprawnie, administrator może przełączyć bazę danych aplikacji na nowy serwer odtworzoną z ostatniego zapisu przywracania danych. Obecna produkcyjna baza może więc zostać przełączona bez żadnych zmian w kodzie aplikacji.

