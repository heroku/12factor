## I. Kod Tabanı
### Sürüm kontrol sistemi üzerinde tek bir kod tabanı, birden fazla dağıtım

On iki faktör bir uygulama her zaman [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/) veya [Subversion](http://subversion.apache.org/) gibi bir sürüm kontrol sistemiyle izlenir. Bu sürüm kontrol sistemindeki dosya veritabanına kod deposu (İng. code repository) veya kısaca depo (İng. repo) denir.

Bir *kod tabanı*, tek bir depo (Subversion gibi merkezi sürüm kontrol sistemi) ya da kök *commit* paylaşan birden fazla depodan (Git gibi merkezi olmayan sürüm kontrol sistemi) oluşur.

![Bir kod tabanı bir çok dağıtımla eşlenir](/images/codebase-deploys.png)

Kod tabanı ve uygulama arasında her zaman birebir ilişki vardır:

* Eğer birden fazla kod tabanı varsa bu bir uygulama değil, dağıtık sistemdir. Dağıtık sistemdeki her bileşen bir uygulamadır ve her biri on iki faktörle bireysel olarak uyumlu olmalıdır.
* Aynı kodu paylaşan birden fazla uygulama, on iki faktörü ihlal eder. Burada çözüm, paylaşılan kodun [bağımlılık yöneticisi](./dependencies) aracılığıyla dahil edilebilecek kütüphanelere dönüştürülmesidir.

Uygulamanın sadece bir kod tabanı vardır fakat birden fazla dağıtımı olacaktır. Bir *dağıtım*, uygulamanın çalışan bir örneğidir. Bu dağıtımlar genelde bir canlı yayın (İng. production) ve bir veya birkaç test ortamıdır. Ayrıca her geliştiricinin kendi yerel geliştirme ortamında çalışan bir kopyası vardır ve bunların her biri aynı zamanda dağıtım olarak nitelendirilirler.

Dağıtımlarda anlık olarak farklı sürümler etkin olabilir fakat kod tabanı tüm dağıtımlarda aynıdır. Örneğin, bir geliştirici henüz commit'lemediği değişiklikleri çalıştırıyor olabilir, veya test ortamında henüz canlı yayına dağıtılmamış bir sürüm çalışıyor olabilir. Bu nedenle hepsi ayrı dağıtım olarak tanımlanır ama kod tabanı aynıdır.
