## III. Konfig
### Simpan konfig di Environment

Konfig milik suatu app merupakan segalamnya yang akan berbeda setiap [deploys](./codebase)(staging, production, developer environments, dll). Hal ini termasuk :

* Resource yang menangani basisdata, memcached, dan lainnya [backing services](./backing-services)
* kredensila ke layanan eksternal seperti Amazon S3 atau Twitter
* Setiap nilai per deploy seperti hostname untuk deploy

App seringkali menyimpan konfig sebagai konstan di kode. Hal ini merupakan pelanggaran dari duabelas-faktor, yang membutuhkan **pemisahan tegas untuk konfig dari kode**. konfig secara substantif beragam untuk semua deploy, sedangkan kode tidak.

Sebuah tes litmus untuk mengetahui apakah sebuah app memiliki konfig yang telah dikeluarkan dari kode dengan cara jika codebase bisa dijadikan open source saat itu juga, tanpa membuka kredensial apa pun.

Catatan untuk definisi "config" **tidak** termasuk konfig internal aplikasi, seperti `config/routes.rb` di rails atau or bagaimana [modul kode tersambung](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) pada [Spring](http://spring.io/).  Tipe config yang tidak bervariasi untuk deploy, sehingga lebih baik dilakukan di dalam kode.

pendekatan lain untuk konfig adlaah menggunakan file konfig yang tidak dimasukkan ke dalan kendali revisi, seperti `config/database.yml` pada Rails. Hal ini merupakan peningkatan besar daripada menggunakan constant yang dimasukkan ke dalam repo kode, namun memiliki kelemahan: mudah untuk memasukan file konfig ke repo; ada kecenderungan untuk file konfig tersebar di berbagai tempat dengan berbagai format, membuat hal tersebut sulit untuk melihat dan mengatur semua konfig di satu tempat. lebih jauh lagi, format seringkali spesifik untuk bahasa pemrograman dan framework tertentu.


**Dua belas-faktor app menyimpan konfig dalam *variable Environment*** (sering disingakt *env vars* atau *env*). Evn vars mudah untuk diubah diantara deploy tanpa harus mengubah kode; tidak seperti file konfig, ada sedikit kesempatan untuk dimasukkan tidak sengaja ke kode; tidak seperti file custom konfig, atau mekanisme konfig lain seperti Java System Properties, mereka bersifat agnostik untuk bahasa pemrograman dan sistem operasi.

Aspek lain dari manajemen konfig adalah grouping, seringkali app menjatah sekumpulan konfig ke dalam grup bernama (disebut juga "environments") dinamakan untuk deploy spesifik, seperti `development`, `test`, dan `production` environments dalam Rails. Metode ini tidak meningkat dengan bersih: saat deploy dari app tercipat, nama environment baru dibutuhkan, seperti `staging` or `qa`. saat proyek tumbuh lebih jauh, developer mungkin menambahkan enviroments spesial seperti `joes-staging`, yang berdamapak pada ledakan kombinatorail dari konfig yang membuat pengaturan deploy dari app sangat rapuh.

Di Dua belas-faktor app, env vars adalah kontrol granular, setiap dari itu ortogonal ke env vars lain. Mereka tidak di-grup bersama seperti "environments", namun diatur secara independen untuk setiap deploy. model ini meningkat cepat saat app secara alamiah membesar ke deploy yang lebih banyak dalam daur hidupnya.

