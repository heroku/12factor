## VI. Proses
### Eksekusi app sebagai satu proses atau lebih  yang nirstatus

App dieksekusi dalam lingkungan ekeskusi sebagai satu *proses* atau lebih.

Dalam kasus sederhana, kode adalah script yang berdiri sendiri, lingkungan eksekusi adalah developer laptop dengan runtime bahasa pemrograman yang terpasang, dan proses dilaunch melalui command line (sebagai contoh, `python my_script.py`). di sisi lain dari spektrum, suatu deploy produksi sebuah app rumit  mungkin menggunakan banyak [tipe proses, yang diinstansiasi ke dalam 0 atau lebih proses yang berjalan](./concurrency).

** proses dua belas faktor nirstatus dan [tidak berbagi apapun](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** setiap data yang perlu untuk bertahan harus disimpan dalam [layanan beking](./backing-services) yang berstatus, umumnya sebuah basisdata.

ruang memori dari filesystem dari proses dapat digunakan sebagai awal, cache transaksi tunggal. sebagai contoh mengunduh suatu file bear, mengoperasikannya, dan menyimpan hasil dari operasi dalam basisdata. duabelas faktor app tidak pernah megnasumsikan apapun yang di-cache di memori atau disk akan tersedia pada request di masa yang akan datang atau job -- dengan proses yang banyak dari setiap tipe berjalan, ada kesempatan yang besar bahwa request di masa yang akan datang akan dilayani oleh proses yang berbeda. Bahkan saat hanya menjalankan satu proses, sebuah restart (ditrigger oleh code deploy, perubahan konfig, ataua relokasi proses oleh lingkungan eksekusi ke lokasi fisik yang berbeda) akan mengahpus semua state lokal (contoh, memori dan filesystem)

Pemaket asset seperti [django-assetpackager](http://code.google.com/p/django-assetpackager/) menggunakan filesystem sebagai cache untuk asset yang terkompilasi. duabelas faktor app lebih memilih untuk mengkompilasi selama [tahap build](/build-release-run). pemaket asset seperti [Jammit](http://documentcloud.github.com/jammit/) dan [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) dapat dikonfigurasi untuk memaket asset selama tahap build

Beberapa sistem web bergantung pada ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- yang merupakan, men-cache user sessipn data pada memori dari proses app dan berharap request di masa akan datang dari visitor yang sama akan diroute ke proses yang sama. sticky session adlaah pelanggaran untuk duabelas faktor dan tidak boleh digunakan atau bergantung padanya. session state data adalah kandidat baik untuk datastore yang menyediakan time-expiration seperti [Memcached](http://memcached.org/) or [Redis](http://redis.io/).
