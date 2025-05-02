## X. keseimbangan Dev/prod 
### Jaga Development, Pengujian, dan produksi semirip mungkin 

Secara historis, terdapat jurang antara development ( seorang developer mengedir di sebuah local [deploy](./codebase) dari app) dan produksi (sebuah deploy berjalan dari app yang diakses oleh end user). gap ini termanifest di tiga area :
* ** jurang waktu ** : seorang developer membutuhkan waktu kerja berhari-hari, berminggu-minggu, atau bahkan berbulan-bulan untuk mencapai produksi
* ** jurang personel ** : Developers menulis kode, enjiner operasi mendeploy kode tersebut.
* ** jurang kakas ** : developer mungkin menggunakan stack seperti Nginx, SQLite, dan OS X, sedangkan produksi mendeploy dengan Apache, MySQL, dan Linux.

**app dua belas faktor didesain untuk [continuous deployment](http://avc.com/2011/02/continuous-deployment/) dengan membuat jurang antara development dan produksi kecil. ** dengan melihat tiga jurang yang disebutkan sebelumnya "

* membuat jurang waktu kecil : seorang developer mungkin menulis dan mendeploy dalam hitungan jam dan bahkan menit kemudian.
* membuat jurang personal kecil : seorang developer menulis kode dengan secara dekat ikut dalam deploy dan melihat perubahan perilaku kode di produksi.
* membuat jurang kakas kecil  : jaga development dan produksi semirip mungkin.


Rangkuman hal di atas ke dalam tabel :

<table>
  <tr>
    <th></th>
    <th>App tradisional</th>
    <th>App dua belas faktor</th>
  </tr>
  <tr>
    <th>Waktu antar deploy</th>
    <td>Minggu</td>
    <td>Jam</td>
  </tr>
  <tr>
    <th>Code authors vs code deployers</th>
    <td>Orang yang berbeda</td>
    <td>orang yang sama</td>
  </tr>
  <tr>
    <th>Dev vs production environments</th>
    <td>Berbeda</td>
    <td>semirip mungkin</td>
  </tr>
</table>

[Layanan beking](./backing-services), seperti basis data app, sistem antrian, atau cache, adalah satu area di mana keseimbangan dev/prod penting. banyak bahasa pemrograman menyediakan libraries yang menyederhanakan akses ke layanan beking, termasuk *adapters* untuk tipe layanan yang berbeda. beberapa contohanya ada di tabel berikut.



<table>
  <tr>
    <th>Tipe</th>
    <th>Bahasa pemrograman</th>
    <th>Library</th>
    <th>Adapters</th>
  </tr>
  <tr>
    <td>basis data</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Antrian</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Developers seringkali menemukan godaan untuk menggunakan layanan bkeing yang ringan pada lingkungan lokal, sembari layanan beking yang lebih serius dan kokoh akan digunakan di produksi. sebagai contoh, menggunakan SQLite lokal dan postgresql di produlsi; atau local process memory untuk caching di development dan memcached di produksi.

** dua belas faktor developer menahan godaan untuk menggunakan layanan beking yang berbeda antara development dan produksi** bahkan ketika adapters secara teoritis mengabstraksi perbedaan layanan beking. perebdaan antara layanan beking berarti terdapat ketidakkompatibel tumbuh, menyebabkan kode yang berjalan dan lolos tes pada development atau pengujian akan gagal di produksi. tipe error ini menciptakan firksi yang mengurangi continuous deployment. harga dari friksi ini dan hambatan dari continuous deployment akan sangat tinggi ketika ikut menghitung agregat selama masa hidup dari aplikasi.

layanan lokal ringan semakin tidak menarik. layanan beking modern seperti memcached, postgresql, dan RabbitMQ tidak sulit untuk dipasang, untungnya sudah disediakan sistem packaging modern, seperti such as [Homebrew](http://mxcl.github.com/homebrew/) dan [apt-get](https://help.ubuntu.com/community/AptGet/Howto). terdapat alternatif pula untuk provisioning seperti [Chef](http://www.opscode.com/chef/) dan [Puppet](http://docs.puppetlabs.com/) yang dikombinasikan dengan lingkungan virtual ringan [Docker](https://www.docker.com/) dan [Vagrant](http://vagrantup.com/) yang dapat berjalan di lingkungan lokal yang memungkinkan developer memperoleh lingkungan pengembangan yang mendekati lingkungan produksi. biaya untuk memasang dan menggunakan sistem ini lebih rendah dibandingkan dengan keuntungan dari keseimbangan dev/prod dan continuous deployment.

adapters untuk layanan beking yang berbeda masih digunakan, karena mereka membuat port ke layanan beking baru relatif tidak sulit.  tapi semua deploy dari app (developer environments, staging, production) harus menggunakan layanan beking dengan tipe dan versi yang sama.


