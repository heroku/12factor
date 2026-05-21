## VII. Ikatan port
### Ekspor layanan melalui ikatan port

aplikasi web seringkali dieksekusi dalam sebuah kontainer webserver. contohnya, aplikasi PHP berjalan sebagai modul dalam [Apache HTTPD](http://httpd.apache.org/),atau aplikasi Java berjalan dalam [Tomcat](http://tomcat.apache.org/).

**duabelas faktor app terkontain tunggal secara komplit** dan tidak bergantung pada injeksi runtime dari sebuah webserver ke dalam lingkungan eksekusi untuk menciptakan layanan web. web app **mengeskpor HTTP sebagai sebuah layanan dengan mengikat port** dan mendengarkan request yang datang ke port tersebut.

Pada lingkungan pengembangan lokal, developer mengunjungi URL layanan seperti `http://localhost:5000/` untuk mengakses layanan yang diekspor oleh app. pada deployment, layer routing menagnani permintaan routing dari hostname publik ke web proses yang terikat port.

Hal ini umumnya diimplementasi menggunakan [dependency declaration](./dependencies) ke sebuah library webserver di app, seperti [Tornado](http://www.tornadoweb.org/)  untuk Python, [Thin](http://code.macournoyer.com/thin/) untuk Ruby, atau [Jetty](http://www.eclipse.org/jetty/) untuk Java dan bahasa pemrograman berbasis JVM. ini terjadi seluruhanya di *user space* yang berada dalam jangkauan kode aplikasi. kontarak dengan lingkungan eksekusi adalah pengikatan port untuk melayani permintaan.

HTTP tidak hanya layanan yang dapat diekspor ke ikatan port. hampir semua jenis software server dapat dijalankan melalui ikatan ke sebuah port dan menunggu permintaan masukan. contohnya  [ejabberd](http://www.ejabberd.im/) (speaking [XMPP](http://xmpp.org/)), dan [Redis](http://redis.io/) (speaking the [Redis protocol](http://redis.io/topics/protocol)).

Catatan bahwa pendekatan ikatan port berarti satu app dapat menjadi [beking layanan](./backing-services) untuk app lain, dengan menyediakan URL ke beking sebagai penanganan sumber daya pada [config](./config) untuk app yang memakai. 
