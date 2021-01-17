## X.Geliştirme/Üretim Eşitliği
### Geliştirme, test etme ve canlı yayın ortamının birbirine olabildiğince benzer olması

Tarihsel olarak, geliştirme ortamı (geliştiricinin uygulamanın yerel [dağıtımına](./codebase) anlık düzenlemeler yaptığı) ve canlı yayın (uygulamanın son kullanıcılar tarafından erişilen çalışan dağıtımı) arasında önemli aralıklar olurdu. Bu aralıklar üç alanda belirtilir:

* **Zaman aralığı:** bir geliştirici kod üzerinde günler, haftalar hatta aylar boyunca bile çalışabilir.
* **Çalışan aralığı:** Geliştiriciler kod yazar, operasyon mühendisleri dağıtımını sağlar.
* **Araçların aralığı:** Geliştiriciler Apache, MySQL ve Linux kullanırken; canlı yayında Nginx, SQLite, ve OS X gibi teknolojiler kullanıyor olabilir.

**On iki faktör uygulaması, geliştirme ve canlı yayın aralığını küçük tutarak, [sürekli dağıtım](http://avc.com/2011/02/continuous-deployment/) için tasarlanmıştır.** Yukarda tanımlanan üç aralığa bakarsak:

* Zaman aralığını küçültme: bir geliştirici kod yazabilir ve bu kodu saatler veya hatta dakikalar sonra dağıtmış olabilir.
* Eleman aralığını küçültme: kodu yazan geliştiriciler, kodu dağıtmakla ve canlı yayındaki davranışını izlemekle yakından ilişkilidir.
* Araçların aralığını küçültme: geliştirmeyi ve canlı yayını olabildiği kadar benzer tut.

Üstekileri bir tablo olarak özetlersek:

<table>
  <tr>
    <th></th>
    <th>Geleneksel uygulama</th>
    <th>On iki faktör uygulaması</th>
  </tr>
  <tr>
    <th>Dağıtımlar arasındaki zaman</th>
    <td>Haftalar</td>
    <td>Saatler</td>
  </tr>
  <tr>
    <th>Kod yazarları ve kod dağıtımcıları</th>
    <td>Farklı insanlar</td>
    <td>Aynı insanlar</td>
  </tr>
  <tr>
    <th>Geliştirme ve canlı yayın ortamı</th>
    <td>Farklı</td>
    <td>Olabildiğince benzer</td>
  </tr>
</table>

Uygulamanın veritabanı, kuyruk sistemi veya önbellek gibi [yardımcı servisleri](./backing-services), geliştirme/canlı yayın eşitliğinin önemli olduğu bir alandır. Birçok dil, farklı tipteki servislerin *uyarlayıcılarını* (adaptörlerini) içeren, yardımcı servislere ulaşımı kolaylaştıran kütüphaneler önerir. Bazı örnekler aşağıdaki tabloda vardır.

<table>
  <tr>
    <th>Tip</th>
    <th>Dil</th>
    <th>Kütüphane</th>
    <th>Uyarlayıcı</th>
  </tr>
  <tr>
    <td>Veritabanı</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Kuyruk</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Önbellek</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Bellek, dosya sistemi, Memcached</td>
  </tr>
</table>

Geliştiriciler, canlı yayında daha ciddi ve sağlam yardımcı servisleri kullanırken, bazen kendi yerel ortamlarında hafif yardımcı servisleri kullanmak isterler. Örneğin, yerelde SQLite, canlı yayında ise PostgreSQL kullanılır, veya yerelde geçici depolama (İng. cache) için süreç belleği, canlı yayında ise Memcached kullanılır.

**On iki faktör geliştiricisi**, uyarlayıcılar teorik olarak yardımcı servislerdeki herhangi bir farklılığı soyutluyor olsa bile, **geliştirme ve canlı yayın arasında faklı yardımcı servisi kullanma isteğine karşı direnir.** Yardımcı servisler arasındaki farklılıklar, küçük uyumsuzlukların ortaya çıkmasına, yerelde çalışan ve testleri geçen kodun, canlı yayında başarısız olmaya neden olmasına sebep olabilir. Bu tür hatalar, sürekli dağıtıma köstek olan bir sürtünme yaratır. Bu sürtünme maliyeti ve sonraki devamlı dağıtımın azaltılması, bir uygulamanın ömrünün toplamı düşünüldüğünde oldukça yüksektir.

Hafif yerel servisler eskiye göre daha az çekicidir. Memcached, PostgreSQL ve RabbitMQ gibi modern yardımcı servisleri, [Homebrew](http://mxcl.github.com/homebrew/) ve [apt-get](https://help.ubuntu.com/community/AptGet/Howto) gibi modern paket sistemleri sayesinde kolayca yüklenebilir ve çalıştırılabilir. Alternatif olarak, [Chef](http://www.opscode.com/chef/) ve [Puppet](http://docs.puppetlabs.com/) gibi ortam hazırlayıcı araçlar, ve [Vagrant](http://vagrantup.com/) ve [Docker](https://www.docker.com/) gibi hafif sanal ortam sağlayıcıları, geliştiricilerin canlı yayın ortamına çok benzeyen yerel ortamda çalışabilmelerini sağlar. Bu sistemlerin yüklenmesi ve kullanımının maliyeti, geliştirme ve canlı yayın eşitliği ve sürekli dağıtımın faydasıyla karşılaştırıldığında oldukça düşüktür.

Farklı yardımcı servislerin uyarlayıcıları hala kullanışlıdır, çünkü yeni yardımcı servislere bağlanmayı nispeten zahmetsiz yapar. Ama uygulamanın bütün dağıtımları (geliştirme, test, canlı yayın ortamları) her bir yardımcı servisinin aynı tip ve versiyonunu kullanmalıdır.
