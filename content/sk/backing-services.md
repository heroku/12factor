## IV. Podporné služby
### Spravovanie podporných služieb ako pripojených zdrojov

*Podporná služba* je akákoľvek služba, ktorú aplikácia konzumuje cez sieť ako súčasť je normálneho behu.  Príklady zahŕňajú databázy (ako napr. [MySQL](http://dev.mysql.com/) alebo [CouchDB](http://couchdb.apache.org/)), messaging/queueing systémy (napr.  [RabbitMQ](http://www.rabbitmq.com/) alebo [Beanstalkd](https://beanstalkd.github.io)), SMTP služby pre odchádzajúce emaily (napr. [Postfix](http://www.postfix.org/)), a cachovacie systémy (napr. [Memcached](http://memcached.org/)).

Podporné služby ako databázy sú tradične spravované tými istými systémovými administrátormi ako nasadenia aplikácie.  Popri lokálne spravovaných službách, može mať aplikácia služby spravované tretími stranami.  Príklady zahŕňajú SMTP služby (napr. [Postmark](http://postmarkapp.com/)), služby na zbieranie metrík (napr. [New Relic](http://newrelic.com/) alebo [Loggly](http://www.loggly.com/)), úložiskové služby (napr. [Amazon S3](http://aws.amazon.com/s3/)), alebo dokonca služby prístupné cez API (napr. [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), alebo [Last.fm](http://www.last.fm/api)).

**Kód v dvanásť faktorovej aplikácii nerozlišuje medzi službou lokálnou a od tretej strany.**  Pre aplikáciu sú obidve pripojené zdroje, prístupné cez URL alebo iné prístupové/prihlasovacie údaje uložené v [konfigurácii](./config).  [Nasadenie](./codebase) dvanásť faktorovej aplikácie by malo byť schopné vymeniť lokálnu MySQL databázu s databázou spravovanou treťou stranou (napr. [Amazon RDS](http://aws.amazon.com/rds/)) bez akýchkoľvek zmien v kóde aplikácie.  Podobne, lokálny SMTP server môže by vymenený SMTP službou od tretej strany (napr. Postmark) bez zmeny v kóde.  V obidvoch prípado sa zmenia len prístupové a prihlasovacie údaje v konfigurácii.

Každá podporná služba je osobitným *zdrojom*.  Napríklad, MySQL databáza je zdroj; dve MySQL databázy (používané na sharding na úrovni aplikácie) sú dva rôzne zdroje.  Dvanásť faktorová aplikácie považuje tieto databázy ako *pripojené zdroje*, čo znamená ich voľné spojenie so súvisiacim nasadením.

<img src="/images/attached-resources.png" class="full" alt="Produkčné nasadenie pripojené ku štyrom podporným službám." />

Zdroje je možné pripájať a odpájať od nasedení podľa ľubovôle.  Napríklad, ak je databáza z dôvodu hardvérových problémov nestabilná, správca aplikácie môže rozbehnúť nový databázový server zo zálohy.  Aktuálna produkčná databáza môže byť odpojená a nový databáza pripojená -- všetko bez zmien v kóde.
