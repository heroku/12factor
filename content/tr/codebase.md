## I. Kod Tabanı
### Bir çok dağıtım kod tabanı gözden geçirme kontrolünde izlenmeli

On iki faktör bir uygulama her zaman [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/) veya [Subversion](http://subversion.apache.org/) gibi bir sürüm takip sistemiyle izlenir. VEritabanının gözden geçirme sisteminin bir kopyası *kod deposu* olarak bilinir. *kod repo* ya da sadece *repo* olarak kısaltılır.

Bir *kod tabanı* herhangi tek bir depo(Subversion gibi merkezi gözden geçirme kontrol sistemi) ya da kök işleyicini paylaşan bir takım repodur(Git gibi merkezi olmayan gözden geçirme kontrol sistemi).

![Bir kod tabanı bir çok dağıtımla eşlenir](/images/codebase-deploys.png)

Kod tabanı ve uygulama arasında bire-bir ilişki her zaman vardır:

* Eğer birden fazla kod tabanı varsa bu bir uygulama değil, dağıtık sistemdir. Dağıtık sistemdeki her bileşen bir uygulamadır ve her biri on iki faktörle bireysel olarak uyumlu olmalıdır.
* Aynı kodu paylaşan birden fazla uygulama, on iki faktörü ihlal eder. Burada çözüm, paylaşılan kodun [bağımlılık yöneticisi](./dependencies) aracılığıyla dahil edilebilecek kütüphanelere dönüştürülmesidir.


Uygulamanın sadece bir kod tabanı vardır fakat birden fazla dağıtımı olacaktır. Bir *dağıtım*, uygulamanın çalışan bir örneğidir. Ayrıca her geliştiricinin kendi yerel geliştirme ortamında çalışan bir kopyası vardır ve bunların her biri aynı zamanda dağıtım olarak nitelendirilirler.

Sürümler her bir dağıtımda etkin olabilir fakat kod temeli tüm dağıtımlarda aynıdır. Örneğin, geliştiricilerin henüz uygulamaya eklenmemiş commitleri olabilir. Bu nedenle hepsi ayrı dağıtım olarak tanımlanır ama kod tabanı aynıdır.
