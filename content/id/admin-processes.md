## XII. Proses administrasi
### Jalankan administrasi/manajemen sebagai proses satu kali

[Formasi proses](./concurrency) adalah larik proses yang digunakan untuk melakukan bisnis reguler aplikasi (seperti menangani permintaan web) saat dijalankan. Secara terpisah, pengembang sering kali ingin melakukan tugas administratif atau pemeliharaan satu kali untuk aplikasi, seperti:

* Menjalankan migrasi basis data (misal. `manage.py migrate` di Django, `rake db:migrate` di Rails).
* Menjalankan konsol (juga dikenal sebagai shell [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop)) untuk menjalankan kode arbitrer atau memeriksa model aplikasi terhadap database langsung. Sebagian besar bahasa menyediakan REPL dengan menjalankan juru bahasa tanpa argumen apa pun (misal. `python` atau `perl`) atau dalam beberapa kasus memiliki perintah terpisah (misal. `irb` untuk Ruby, `rails console` untuk Rails).
* Menjalankan skrip satu kali yang dilakukan ke dalam repo aplikasi (misal. `php scripts/fix_bad_records.php`).

Proses admin satu kali harus dijalankan di lingkungan yang identik dengan [proses yang berjalan lama](./proses) reguler aplikasi. Mereka menjalankan [release](./build-release-run), menggunakan [codebase](./basis kode) dan [config](./config) yang sama dengan proses apa pun yang dijalankan terhadap rilis itu. Kode admin harus dikirimkan bersama kode aplikasi untuk menghindari masalah sinkronisasi.

Teknik [dependency isolation](./dependensi) yang sama harus digunakan pada semua jenis proses. Misalnya, jika proses web Ruby menggunakan perintah `bundle exec thin start`, maka migrasi basis data harus menggunakan `bundle exec rake db:migrate`. Demikian pula, program Python yang menggunakan Virtualenv harus menggunakan `bin/python` vendor untuk menjalankan server web Tornado dan proses admin `manage.py` apa pun.

Dua belas faktor sangat menyukai bahasa yang menyediakan shell REPL di luar kotak, dan yang membuatnya mudah untuk menjalankan skrip satu kali. Dalam penerapan lokal, pengembang menjalankan proses admin satu kali dengan perintah shell langsung di dalam direktori checkout aplikasi. Dalam penerapan produksi, pengembang dapat menggunakan ssh atau mekanisme eksekusi perintah jarak jauh lainnya yang disediakan oleh lingkungan eksekusi penerapan tersebut untuk menjalankan proses tersebut.
