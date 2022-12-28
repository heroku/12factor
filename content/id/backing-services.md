## IV. Layanan beking
### Perlakukan layanan beking sebagai sumber daya menempel

Sebuah *Layanan beking* adalah layanan yang app makan melalui jaraingan sebgai bagian dari operasi normalnya. contoh pengikutan datastore (seperti[MySQL](http://dev.mysql.com/) atau [CouchDB](http://couchdb.apache.org/)), sistem layanan/antrian (seperti [RabbitMQ](http://www.rabbitmq.com/) atau [Beanstalkd](https://beanstalkd.github.io)), layanan untuk email keluar (seperti[Postfix](http://www.postfix.org/)), dan sistem cache (seperti [Memcached](http://memcached.org/)).

Layanan beking seperti basisdata diatur secara tradisional oleh system administrator yang sama yang menerapkan app runtime. Layanan ini bisa ditambah secara lokal, app juga dapat memilki layanan yang disediakan oleh pihak ketiga. contoh Layanan SMTP  (seperti[Postmark](http://postmarkapp.com/)), Layanan pengumpulan metrik (seperti [New Relic](http://newrelic.com/) atau [Loggly](http://www.loggly.com/)), layanan aset binary (seperti [Amazon S3](http://aws.amazon.com/s3/)), dan  even layanan API untuk konsumen (seperti[Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), atau [Last.fm](http://www.last.fm/api)).

**kode untuk duabelas faktor app tidak membedakan antara layanan lokal dan pihak ketiga** untuk aplikasi, kedaunya merupakan sumberdaya menempel, diakses menggunakan URL atau locator/kredensial lain yang disimpan di [config](./config). sebuah [deploy](./codebase) dari duabelas faktor app harus dapat menukar local mysql database dengan pihak ketiga (seperti [Amazon RDS](http://aws.amazon.com/rds/)) tanpa perubahan di kode app. sehingga server SMTP lokal dapat ditukar dengan layanan SMTP pihak ketiga (seperti postmark) tanpa perubahan kode. di kedua kasus, hanya pengatur sumber daya pada konfig yang perlu diubah.

setiap layanan beking yang berbeda merupakan *sumber daya*. contohnya, sebuah basis data MySQL adalah sebuah sumber daya; dua database (digunakan untuk sharding di layer aplikasi) dianggap sebagai dua sumber daya yang berbeda. dua belas faktor app memperlakukan kedua basis data sebagai *sumber daya menempel*, yang mengindikasi loose coupling ke tempat deploy yang menempel.

<img src="/images/attached-resources.png" class="full" alt="A production deploy attached to four backing services." />

Sumber daya dapat ditempel and dilepas dari deploy semaunya. contohnya jika basis data berlaku aneh karena masalah hardware, administrator app akan membuat server basis data baru yang berisi restore dari backup paling baru. basis data produksi saat ini dapat dilepas dan basis data baru ditempel -- semuanya tanpa perubahan kode.

