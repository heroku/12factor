## XI. Logs
### Perlakukan logs sebagai aliran event

*Logs* menyediakan kemampuan melihat perilaku dari app yg sedang berjalan. di lingkungan berbasis server umumnya di tulis ke suatu file pada disk (a "logfile"); tapi hanya dapat sebuah format output.

Logs adalah aliran [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) dari kumpulan, even berurutan berdasarakan waktu dikumpulkan ke aliran output dari semua proses berjalan dan layanan beking. log dalam bentuk mentah umumnya sebuah format tesk dengan satu even setiap line (walaupun backtrace dari eksepsi mungkin berbentuk beberapa line). logs tidak memiliki awal atau akhir yg pasti, tapi mengalir secara kontinu selama app beroperasi.

**Sebuah app 12 faktor tidak pernah memikirkan dengan routing atau penyimpanan dari aliran output** sudah seharusnya tidak mencoba untuk menulis atau mengatur logdile. sebaliknya, setiap proses yg berjalan menulis event aliran masing2, tidak dibuffer ke `stdout`. saat pengembangan lokal, developer akan menampilkan aliran ini ke foreground dari terminal mereka untuk meng-observe perilaku app.

Pada staging atau deploy produksi, setiap aliran proses akan meng-capture oleh lingkungan eksekusi, dikumpulkan bersama dengan semua stream dari app, dan di route ke satu atau lebih destinasi akhir untuk menampilkan dan arsip jangka panjang. tujuan arsip tidak terlihat atau dapat dikonfigurasi dari app, sebaliknya diatur sepenuhnya oleh lingkungan eksekusi. router log open source (seperti [Logplex](https://github.com/heroku/logplex) and [Fluentd](https://github.com/fluent/fluentd)) tersedia untuk tujuan ini.

Aliran event untuk sebuah app dapat dirutekan ke sebuah file, atau ditonton melalui tail realtime dari sebuah termninal. secara signifikan, aliran dapat dikirim ke sistem log indexing dan analysis seperti [Splunk](http://www.splunk.com/), atau sistem gudang data general purpose seperti [Hadoop/Hive](http://hive.apache.org/).  sistem ini memungkinkan kekuatan dan fleksibilitas untuk mengintrospeksi perilaku app setiap waktu, termasuk:

* Menemukan peristiwa tertentu di masa lalu.
* Grafik tren skala besar (seperti permintaan per menit).
* Peringatan aktif menurut heuristik yang ditentukan pengguna (seperti peringatan ketika jumlah kesalahan per menit melebihi ambang batas tertentu).
