## XII. Yönetim Süreçleri
### Yönetim görevlerini tek seferlik süreçler olarak çalıştırma

[Süreç formasyonu](./concurrency) uygulama çalışırken uygulamanın sıradan işlerini (web isteklerini idare etmek gibi) yapmakta kullanılan süreçlerin bir dizisidir. Ayrı olarak, geliştiriciler çoğunlukla uygulamanın bir kereye mahsus yönetimsel veya bakım görevlerini yapmayı dileyecekler. Örneğin:

* Veri modelindeki (İng. migrations) değişiklikleri veritabanına yansıtmak (Django'da `manage.py migrate`, Rails'de `rake db:migrate`).
* Herhangi bir kodu çalıştırmak veya canlı yayın veritabanındaki verileri denetlemek için konsolu ([REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) kabuğu olarak da bilinir) çalıştırmak. Çoğu dil hiçbir argüman olmadan (`python` veya `perl`), veya bazı durumlarda ayrı komutlarla (Ruby için `irb`, Rails için `rails console`) bir REPL sağlar.
* Uygulamanın kod deposundaki betikleri çalıştırmak (`php scripts/fix_bad_records.php`).

Tek sefer çalıştırılması gereken yönetsel işlere ait süreçler de, uygulamanın uzun süre çalışan sıradan [süreçleri](./processes) ile birebir aynı ortamda, aynı [sürümdeki](./build-release-run) [kod tabanı](./codebase) ve [yapılandırmayı](./config) kullanarak çalışmalıdır. Uyum sorunu yaşamamak için, uygulamanın yönetimini sağlayan kod da uygulama ile birlikte geliştirilmeli ve yayınlanmalıdır.

Aynı [bağımlılık yalıtımı](./dependencies) teknikleri bütün süreç tiplerinde kullanılmalıdır. Örneğin, eğer Ruby web süreçleri `bundle exec thin start` komutunu kullanıyorsa, veritabanı göçü de `bundle exec rake db:migrate` komutu kullanmalıdır. Aynı durumda, Virtualenv kullanan bir Python programı, Tornado web sunucusu ve herhangi bir `manage.py` yönetici süreçlerinin ikisini de çalıştırabilmek için `bin/python` kullanmalıdır.

On iki faktör, REPL kabuğunu kendisi sağlayan ve tek seferlik betikleri çalıştırmayı kolaylaştıran dilleri fazlasıyla destekler. Yerel dağıtımda, geliştiriciler uygulamanın dizininde doğrudan komut satırında tek seferlik yönetici süreçlerini çalıştırır. Canlı yayın dağıtımında ise, geliştiriciler bu gibi bir süreci çalıştırmak için ssh veya dağıtımın çalışma ortamı tarafından sağlanan diğer uzak komut çalıştırma mekanizmasını kullanabilir.
