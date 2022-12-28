## V. Build, release, run
### Pisahkan dengan ketat antara tahap build dan run

A [codebase](./codebase) ditransformasikan ke dalam deploy (non-development) melalui tiga tahap:

* *tahap build* adalah transformasi yang mengkonversi sebuah repo kode ke sebuah bundel executable yang disebut sebagai sebuah *build* menggunakan sebuah versi dari code yang dicommit spesifik oleh proses deployment, tahap build mengambil vendors [dependencies](./dependencies) dfan mengkompilasi binaries dan asset.
* *tahap release* mengambil build yang diproduksi pada tahap build dan mengkombinasikan dengan deploy [config](./config). yang menghasilkan *release* yang terdiri dari build dan config dan siap untuk diekekusi pada lingkungan eksekusi.
* *tahap run* (disebut juga sebagai "runtime") menjalankan app pada lingkungan eksekusi, dengan men-launch beberapa set dari [processes](./processes) app dari release terpilih.

![kode menjadi sebuah build, yang dikombinasikan dengan config untuk menciptakan sebuah release](/images/release.png)


**duabelas faktor app menggunakan pemisahan ketat antara build, release, dan run** sebagai contoh, tidak mungkin untuk membaut perubahan pada kode saat runtime, karena tidak ada cara untuk menularkan perubahan tersebut seperti di tahap build.

kakas deployment biasanya menyediakan kakas manajamen, yang sering digunakan adalah kemampuan untuk kemabli ke release sebelumnya. sebagai contoh, kakas [Capistrano](https://github.com/capistrano/capistrano/wiki) menyimpan releqase ke dalam sebuah subdirectory bernama `releases`, yang mana release saat ini adalah symlink ke direktori release saat ini. perintah `rollback` membuat hal tersebut mudah untuk kembali ke release sebelumnya.

Setiap release harus memiliki ID release yang unik, seperti timestamp dari release (seperti `2011-04-06-20:32:17`) atau angka yang meningkat (seperti `v100`). release adalah jurnal yang hanya bisa ditambah dan release tidak bisa diubah sekali itu diciptakan. perubahan harus menciptakan release yang baru.

Build diinisiasi oleh developer app setiap kali kode baru dideploy. eksekusi runtime, kontransya, dapat terjadi otomatis dalam beberapa kasus misalkan seperti pada reboot server, atau process crash saat direstart oleh process manager, tahap run sebisa mungkin terdiri dari bagian bergerak sesedikit mungkin, karena persoalan yang mencegah app dari berjalan normal dapat terjadi di tengah malam saat tidak ada developer yang dapat hadir. tahap build dapat menjadi lebih kompleks, karena error selalu ada di foreground untuk developer yang melakukan deploy.

