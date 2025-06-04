## IX. Sekali Pakai
### Maksimalkan kekokohan dengan startup cepat dan shutdown yang anggun 

**[procss](./processes) dua belas faktor app adalah *sekali pakai*, artinya dapat dimulai dan dihentikan seketika.** hal ini menfasilitasi peningkatan elastis, deployment cepat untuk [code](./codebase) atau perubahan [config](./config), dan kekokohan dari deploy produksi.

proses harus berusaha untuk **meminimalkan waktu startup**. idealnya, sebuah proses akan memakan beberapa detik dari waktu launch diekskeusi hingga proses bangun dan siap untuk menerima request atau pekerajan. waktu startup yang singkat menyediakan kelincahan lebih untuk proses [release](./build-release-run) dan meningkat; dan membantu kekekohan, karena manajer proses dapat lebih mudah untuk memindahkan proses ke mesin fisik baru ketika terjamin.

proses **shut down secara anggun ketika menerima sinyal [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM)** dari manajer proses. untuk proses web, shutdown anggun diperoleh dengan berhenti mendengar di port layanan (yang akan menolak request baru), memungkinkan request saat ini untuk selesai, dan exit. secara implisit di mocel ini HTTP request adalah pendek (tidak lebih dari beberapa detik(, atau pada kasus long polling, klien harus secara seamlessly berusaha untuk rekoneksi ketika koneksi hilang.

untuk proses worker, shutdown anggun diperoleh dengan mengembalikan pekerjaan saat ini ke antrian kerja. sebagai contoh, pada [RabbitMQ](http://www.rabbitmq.com/) worker mengirim [`NACK`] (http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack); pada [Beanstalkd](https://beanstalkd.github.io), job dikembalikan ke antrian secara otomatais ketiak seuat worker terputus. sistem lock seperti [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) perlu memastikan untuk melepas lock dari catatan job. secara implisit di model ini semua job [reentrant](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29), yang diperoleh dengan membungkus hasil ke dalam sebuah transaksi, atau membuat operasi [idempotent](http://en.wikipedia.org/wiki/Idempotence).

Proses juga harus **kokoh terhadap kematian tiba-tiba**, pada kasus kegagalan hardware. walaupun hal ini jarnag terjadi dibandingkan shutdown dengan `SIGTERM`, hal ini masih dapat terjadi. Pendekatan yang diekomenadia adlaah menggunakan antiran backend kokoh, seperti Beanstalkd, yang mengembalikan job ke antrian ketika klien terputus atau time out. bagaimana pun, duabelas faktor app dirancang untuk menangani terminasi yang tidak terdiduga dan tidak anggun. [Crash-only design](http://lwn.net/Articles/191059/) ambil konsep ini untuk [logical conclusion](http://docs.couchdb.org/en/latest/intro/overview.html).


