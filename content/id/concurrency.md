## VIII. Konkurensi
### Meningkat melalui model proses 

Suatu program komputer, sekali dijalankan, akan direpresentasikan dengan satu atau lebih proses. aplikasi web telah menjadi salah satu variasi dari bentuk eksekusi proses, contohnya proses PHP berjalan sebagai proses anak dari Apache, dimulai sesui permintaan berdasarkan kebutuhan volume request. Proses Java menggunakan pendekatan yang berbeda, dengan JVM menyediakan proses besar yang me-reserve suatu large block dari system resource (CPU dan memory ) pada startup, dengan konkurensi diatur secara internal melalui thread. di kedua kasus, proses yang berjalan hanya minimal terlihat ke developer dari app.

![skala diekspresikan dengan proses yang berjalan,  workload yang berbeda-beda diekspresikan dengan tipe proses.]
(/images/process-types.png)

**Pada dua belas faktor app, proses merupakan masyarakat kelas satu** proses pada dua belas faktor app merujuk pada [the unix process model for running service daemons](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/). Menggunakan model ini developer dapat mengarstik app untuk menangani workload yang beragam dengan men-assign setiap tipe dari pekerjaan ke sebuah *tipe proses*. contohnya, permintaan HTTP dapat ditangani dengan sebuah proses web, dan task yang berjalan panjang di latar belakang oleh proses pekerja.

ini tidak mengeluarkan proses individual dari menangani multiplexing internal, melalui thread dalan runtime VM, atau model async/event yagn ditemukan pada kakas seperti [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/), atau [Node.js](http://nodejs.org/). namun setiap VM individual dapat tumbuh sangat besar (skala vertical), sehingga aplikasi harus dapat mengembang ke banyak proses berjalan di banyak mesin fisik.

Model proses benar bersrinar ketika saat untuk meningkat. [share-nothing, horizontally partitionable nature of twelve-factor app processes](./processes) berarti menambah konkurensi tambahan sebagai operasi yang sederhana dan dapat diandalkan. array dari tipe proses dan nomor dari proses tiap tipe yang disebut sebagai *process formation*. 

dua belas faktor app proses [Seharusnya tidak akan pernah daemonize](http://dustin.github.com/2010/02/28/running-processes.html) atau menulis PID files. sebaliknya, bergantung pada proses manager di sistem operasi (seperti [systemd](https://www.freedesktop.org/wiki/Software/systemd/), manajer proses tersebar pada cloud platform, atau kakas seperti [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) pada pengembangan) untuk mengatur [output streams](./logs), merespon proses yang crash, dan menagani restart dan shutdown yang diinisiasi user.


