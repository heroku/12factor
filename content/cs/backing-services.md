## IV. Podpůrné služby
### Nakládejte s podpůrnými službami jako s připojenými zdroji.

*Podpůrná* služba je jakákoliv služba, kterou aplikace konzumuje přes síť jako součást svého normálního běhu. Příklady zahrnují databáze (jako například [MySQL](http://dev.mysql.com/) nebo [CouchDB](http://couchdb.apache.org/)), messaging/queueing systémy (jako jsou [RabbitMQ](http://www.rabbitmq.com/) nebo [Beanstalkd](https://beanstalkd.github.io)), SMTP služby pro odchozí emaily (jako [Postfix](http://www.postfix.org/)) a  cachovací systémy (jako je [Memcached](http://memcached.org/)).

Podpůrné služby, jako například databáze, jsou obvykle spravovány stejnými systémovými inženýry jako samotné nasazení aplikace. K těmto lokálně spravovaným službám může aplikace navíc využívat služby provozované a spravované třetí stranou. To mohou být například SMTP služby (jako je [Postmark](http://postmarkapp.com/)), služby na sbírání metrik (jako [New Relic](http://newrelic.com/) nebo [Loggly](http://www.loggly.com/)), datová uložistě (jako [Amazon S3](http://aws.amazon.com/s3/)) a dokonce i služby přístupné přes API (jako jsou například [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/) nebo [Last.fm](http://www.last.fm/api)).

**Kód twelve-factor aplikace nedělá rozdíly mezi lokální službou a službou třetí strany.** Z pohledu aplikace jsou to připojené zdroje přístupné přes URL nebo jiné přístupové/přihlašovací údaje uložené v [konfiguraci](./config). Nasazení twelve-factor aplikace by mělo být schopné vyměnit lokální MySQL databázi za databázi spravovanou třetí stranou (jako je například [Amazon RDS](http://aws.amazon.com/rds/)) bez jakýchkoliv změn v aplikačním kódu. Obdobně může být lokální SMTP server nahrazen SMTP službou třetí strany (jako Postmark) bez změn v kódu. V obou případech se změní pouze přístupové a přihlašovací údaje v konfiguraci.

Každá podpůrná služba je *zdroj*. Například MySQL databáze je zdroj, dvě MySQL databáze (použité pro sharding na aplikační úrovni) kvalifikujeme jako dva různé zdroje. Twelve-factor aplikace nakládá s těmito databázemi jako *připojenými zdroji*, což naznačuje i jejich volné spojení se souvisejícím nasazením.

<img src="/images/attached-resources.png" class="full" alt="Produkční nasazení připojené k podpůrným službám." />

Zdroje je možné připojovat a odpojovat z nasazení dle libosti. Například pokud je databáze z důvodu hardwarových problémů nestabilní, systémový inženýr může rozběhnout nový databázový server z aktuální zálohy. Aktuální produkční databáze pak může být odpojena a nová databáze připojena na její místo, vše beze změn v kódu.
