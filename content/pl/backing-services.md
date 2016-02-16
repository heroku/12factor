## IV. Usługi wspierające
### Traktuj usługi wspierające jako przydzielone zasoby

Usługą wspierająca to każda, z której aplikacja korzysta przez sieć jako część normalnego działania. Przykłady zawierają magazyny danych (takie jak [MySQL](http://dev.mysql.com/) albo [CouchDB](http://couchdb.apache.org/)), systemy wysyłanie/kolejkowania wiadomości (takie jak [RabbitMQ](http://www.rabbitmq.com/) czy [Beanstalkd](http://kr.github.com/beanstalkd/)), usługi SMTP do zewnętrznej wysyłki emaili (np. [Postfix](http://www.postfix.org/)), oraz systemy cachowania pamięci (np. [Memcached](http://memcached.org/)).

Usługa wspierająca taka jak baza danych jest zazwyczaj zarządzana przez tych samych programistów, którzy zajmują się wdrażaniem aplikacji. Oprócz takich lokalnie zarządzanych usług aplikacja może również korzystać z usług oferowanych przez osoby trzecie. Do przykładów zaliczają się usługi SMTP ([Postmark](http://postmarkapp.com/)),usługi zbierające metryki ([New Relic](http://newrelic.com/) czy [Loggly](http://www.loggly.com/)), usługi  magazynowania zasobów (takie jak [Amazon S3](http://aws.amazon.com/s3/)), czy również usługi dostępne za pomocą publicznego API (jak np. [Twitter](http://dev.twitter.com/), [Google Maps](http://code.google.com/apis/maps/index.html), lub [Last.fm](http://www.last.fm/api)).

**Kod aplikacji dwunastu aspektów nie widzi różnic pomiędzy usługami lokalnymi, a oferowanymi przez zewnętrznych usługodawców** Dla aplikacji wszystkie są załączonymi zasobami, dostepnymi przez adres URL lub inny lokalizator dostępny w [konfiguracji](./config). Przy [wdrożeniu](./codebase) aplikacji nie może być problemów ze zmianą lokalnej bazy MySQL na oferowaną przez zewnętrznego usługodawcę (np. [Amazon RDS](http://aws.amazon.com/rds/)) bez żadnych zmian w kodzie aplikacji. Podobnie lokalny serwer SMTP może być zamieniony na zewnętrzną usługę SMTP (taką jak Postmark) bez zmian kodu. W obu przypadkach zmiana powinna wystąpić jedynie w konfiguracji aplikacji.

Każda osobna usługa jest traktowana jako *zasób*. Zasobem będzie np. baza MySQL, dwie bazy danych (używane do [shardingu](https://en.wikipedia.org/wiki/Shard_(database_architecture)) w warstwie aplikacji) kwalifikują się jako dwa odrębne zasoby. Dwanaście aspektów traktuje te bazy danych jako *załączone zasoby*, co wskazuje, że nie są silnie powiązane z wdrożeniem, do których są załączone. 

<img src="/images/attached-resources.png" class="full" alt="Produkcyjne wdrożenie aplikacji korzystajace z czterech usług wspierających." />

Zasoby mogą być dołączane i odłączane jeśli jest taka potrzeba. Jeśli naza danych aplikacji nie zachowuje się poprawnie z powodu usterek sprzętowych, administrator może przełączyć aplikację by korzystała z nowego serwera bazy danych odtworzonego z ostatniego zapisu przywracania danych. Obecna produkcyjna baza danych może zostać przełączona na nową -- wszystko bez żadnych zmian w kodzie aplikacji.

