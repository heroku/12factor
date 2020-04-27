## XII. Yönetici Süreci
### Yönetici/yönetim görevlerini tek seferlik işlem olarak çalıştırma

[Süreç oluşumu](./concurrency) uygulama çalışırken uygulamanın sıradan işlerini (web isteklerini idare etmek gibi) yapmakta kullanılan süreçlerin bir dizisidir. Ayrı olarak, geliştiriciler çoğunlukla uygulamanın bir kereye mahsus yönetimsel veya bakım görevlerini yapmayı dileyecekler, şunun gibi:

* Veri tabanı göçü çalıştırmak (Django'da `manage.py migrate`, Rails'de `rake db:migrate`).
* Konsolu ([REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) kabuğu olarakta bilinir), rastgele kodu çalıştırmak veya canlı veritabanına karşılık uygulamanın modellerini denetlemek için çalıştırmak. Çoğu dil hiç bir arguman olmadan (`python` veya `perl`), yorumlayıcı veya bazı durumlarda ayrı komutlarla (Ruby için  `irb`, Rails için `rails console`) çalıştırarak bir REPL sağlar.
* Uygulamanın deposuna commit'lenmiş betikleri çalıştırmak (`php scripts/fix_bad_records.php`).

Bir kerelik yönetici süreçleri uygulamanın sıradan [uzun çalışan süreçleri](./processes)  gibi aynı ortamlarda çalışmalıdır. Onlar herhangi bir sürecin çalıştığı gibi [sürüme](./build-release-run) karşı aynı [kod tabanı](./codebase) ve [yapılandırmayı](./config) kullanarak çalışır. Yönetici uygulama kodunu senkronizasyon sorunundan kaçınmak için yüklemelidir.

Aynı [bağımlılık yalıtımı](./dependencies) teknikleri bütün süreç yönetiminde kullanılmalıdır. Örneğin, eğer Ruby web süreçleri `bundle exec thin start` komutunu kullanıyorsa, veri tabanı göçü `bundle exec rake db:migrate` komutu kullanmalıdır. Aynı durumda, Virtualenv kullanan bir Python programı, Tornado web sunucusu ve herhangi bir  `manage.py` yönetici süreçlerinin ikisini de çalıştırabilmek için `bin/python` kullanmalıdır. 

On iki faktör, REPL kabuğunu kural dışı sağlayan ve tek seferlik betikleri çalıştırmayı kolaylaştıran dilleri fazlasıyla destekler. Yerel dağıtımda, geliştiriciler uygulamanın kontrol dizinindeki açık kabuk komutuyla tek seferlik yönetici süreçlerini çalıştırır. Ürün dağıtımında, geliştiriciler bu gibi bir süreci çalıştırmak için ssh veya dağıtımın çalışma ortamı tarafından sağlanan diğer uzak komut çalıştırma mekanizmasını kullanabilir.
