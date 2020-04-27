## VI. Süreç
### Uygulamayı bir veya daha fazla bağımsız süreç olarak çalıştırma

Uygulama bir veya birden fazla *süreç* olarak çalıştırma ortamında çalıştırılır.

En basit senaryoda, kod bağımsız bir betiktir, çalışma ortamı, dil çalışma zamanı yüklenmiş, geliştiricilerin yerel laptopudur ve süreç komut satırı aracılığıyla başlatılır (Örneğin, `python my_script.py`). Diğeri spekturumun sonunda, çok yönlü uygulamanın ürün dağıtımı birden fazla [süreç tipi kullanabilir, sıfır veya daha fazla çalışan süreci somutlaştırabilir](./concurrency).

**On iki faktör süreçleri durumsuz ve [paylaşımsızdır](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Devamlılığa ihtiyaç duyan herhangi bir veri kapsamlı [destek servisinde](./backing-services) saklanmalıdır, genel olarak bir veri tabananında.

Süreçlerin bellek uzayı ve dosya sistemi, kısa tek işlemli önbellek olarak kullanılabilir. Örneğin, büyük bir dosya indirirken, çalıştırırken, işlem sonuçlarını veri tabanında saklarken. On iki faktör uygulaması, bellek veya önbellekteki depolanmış hiçbir şeyin gelecekteki istek veya işlerde erişilebilir olacağını hiçbir zaman varsaymaz, çalışan her bir tipin bir çok süreciyle birlikte, gelecek isteğin farklı süreç tarafından sunulma şansı yüksektir. Sadece bir süreç çalıştırıldığında bile, tekrar başlatma (kod dağıtımı, yapılandırma değişikliği veya çalışma ortamı sürecin farklı fiziksel adrese tekrar yerleştirimi tarafından tetiklenir) genellikle bütün yerel (bellek ve dosya sistemi v.b gibi) durumları temizler.

Varlık paketleyicileri ( [Jammit](http://documentcloud.github.com/jammit/) veya [django-compressor](http://django-compressor.readthedocs.org/) gibi), derlenmiş varlıklar için önbellek olarak dosya sistemi kullanılır. On iki faktör uygulaması [derleme aşaması](./build-release-run) boyunca,  [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) gibi, bu derlemeyi yapmayı tercih eder, çalışma zamanında yapmaktansa.

Bazı web sistemleri ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) dayanır, bu, kullanıcı oturum verisini uygulama sürecinin belleğinde saklar ve aynı sürece yönlendirilecek olan gelecek istekleri aynı ziyaretçiden bekler. Sticky sessions on iki faktörü ihlal eder ve asla kullanılmamalıdır veya buna güvenmemelidir. Oturum durum verisi  [Memcached](http://memcached.org/) veya [Redis](http://redis.io/) gibi bitiş süresi öneren veri deposu için iyi bir adaydır.
