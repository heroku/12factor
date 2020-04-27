## IV. Destek servisi
### Destek servislerine ekli kaynak olarak davranma

Bir *destek servisi* uygulamanın kendi normal işleminin bir parçası olarak ağ üzerinden tüketim yapan bir servistir. Örnekler veri deposu([MySQL](http://dev.mysql.com/) veya [CouchDB](http://couchdb.apache.org/) gibi), mesajlama/kuyruklama sistemleri( [RabbitMQ](http://www.rabbitmq.com/) veya [Beanstalkd](https://beanstalkd.github.io)), giden email için SMTP servisi([Postfix](http://www.postfix.org/) gibi) ve önbellekleme sistemleri([Memcached](http://memcached.org/) gibi) içerir.

Destek servisleri, veri tabanı gibi, uygulamaların çalışma zamanlı dağıtımlarında olduğu gibi benzer sistem yöneticileri tarafından geleneksel olarak yönetilirler. Bu yerel yönetilen servislere ilave olarak, uygulama üçüncü parti uygulamalar tarafından onaylanmış ve yönetilmiş servislere sahip olabilirler. Örnekler SMTP servisleri([Postmark](http://postmarkapp.com/) gibi), Metrik toplama servisleri( [New Relic](http://newrelic.com/) veya [Loggly](http://www.loggly.com/) gibi), binary servisler([Amazon S3](http://aws.amazon.com/s3/) gibi) ve API-erişilebilir tüketici servisleri bile [Twitter](http://dev.twitter.com/), [Google Maps](http://code.google.com/apis/maps/index.html), ve [Last.fm](http://www.last.fm/api) gibi)  içerir.

**On iki faktör uygulaması için bu kod, yerel ve üçüncü parti servisler arasında ayrım yapmaz.** Uygulamada, her ikiside ek kaynaktır, [yapılandırmada](./config) saklanmış yer belirleyici/kimlik bilgileri ve URL aracılığıyla erişilir. On iki faktör uygulamasının bir dağıtımı, uygulama kodunda hiçbir değişiklik olmadan üçüncü parti([Amazon RDS](http://aws.amazon.com/rds/) gibi) tarafından yönetilenle yerel MySQL veritabanı silebilmelidir. Aynı şekilde bir yerel SMTP servisi(Postmark gibi), kod değişikliksiz bir üçüncü parti SMTP servisiyle değiş tokuş yapılabilir. Her iki durumda da, kaynak sadece değişmesi gereken yapılandırmada ele alınır.

Her bir belirgin destek servisi bir *kaynaktır*. Örneğin, bir MySQL veritabanı(Uygulama katmanında parçalanma için kullanılmış) bir kaynaktır; iki MySQL veritabanı iki belirgin kaynak olarak nitelendirilir. On iki faktör uygulaması veritabanlarına, bağlı oldukları dağıtımlara gevşek bağlaşımlarını belirten *ek kaynak* olarak davranır.

<img src="/images/attached-resources.png" class="full" alt="A production deploy attached to four backing services." />

Kaynaklar dağıtımlara istenilen zamanda eklenilip çıkartılabilir. Örneğin, eğer uygulamanın veritabanı donanım sorununa göre yanlış davranıyorsa, uygulamanın yöneticisi son yedeklemeden geri yüklenmiş yeni bir veri tabanı sunucusunu döndürebilir. Şuanki veritabanı ekten çıkarılmış olabilir ve yeni veri tabanı eklenmiş olabilir, hiç bir kod değişikliği olmadan.
