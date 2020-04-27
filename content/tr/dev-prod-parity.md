## X.Geliştirme/Üretim Eşitliği
### Gelişim, evreleme ve üretimi olabildikçe benzer tutma

Tarihsel olarak, geliştirme (bir geliştirici uygulamanın yerel [dağıtımına](./codebase) canlı düzenlemeler yapar) ve ürün (uygulamanın çalışan dağıtımı son kullanıcılar tarafından erişilmiştir) arasında önemli aralıklar vardır. Bu aralıklar üç alanda belirtilir:

* **Zaman aralığı:** bir geliştirici kod üzerinde günler,haftalar hatta aylar boyunca bile ürünü oluşturmak için çalışabilir.
* **Eleman aralığı:** Geliştiriciler kod yazar, ops mühendisleri dağıtır.
* **Araçların aralığı:** Geliştiriciler  ürün dağıtımı Apache, MySQL ve Linux kullanırken; Nginx, SQLite, ve OS X gibi yığınları kullanıyor olabilir.

**On iki faktör uygulaması, geliştirme ve ürün aralığını küçük tutarak, [sürekli dağıtım](http://avc.com/2011/02/continuous-deployment/) için tasarlanmıştır.** Yukarda tanımlanan üç aralığa bakarsak:

* Zaman aralığını küçültme: bir geliştirici kod yazabilir ve bu kodu saatler veya hatta dakikalar sonra dağıtmış olabilir.
* Eleman aralığını küçültme: kodu yazan geliştiriciler, kodu dağıtmakla yakından ilişkilidir ve üründeki davranışını izler.
* Araçların aralığını küçültme: geliştirmeyi ve ürünü olabildiği kadar benzer tut.

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
    <th>Geliştirme ve ürün ortamı</th>
    <td>Farklı</td>
    <td>Olabildiğince benzer</td>
  </tr>
</table>

[Destek servisler](./backing-services); uygulamanın veritabanı, kuyruk sistemi veya önbellek gibi, geliştirme/üretim eşitliğinin önemli olduğu bir alandır. Bir çok dil, farklı tipteki servislerin *uyarlayıcılarını* içeren, destek servislerine ulaşımı kolaylaştıran kütüphanleri önerir. Bazı örnekler aşağıdaki tabloda vardır.

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

Geliştiriciler, üründe ciddi ve sağlam destek servisleri kullanırken, bazen kendi yerel ortamlarında önemsiz destek servislerini kullanmak için istek duyarlar. Örneğin, yerelde SQLite üründe PostgreSQL kullanılır veya geliştirmede depolama için yerel süreç belleği ve üründe de Memcached kullanılır.

**On iki faktör geliştiricisi**, uyarlayıcılar teorik olarak destek servislerindeki herhangi bir farklılığı soyutladığı zaman bile **geliştirme ve ürün arasında faklı destek servisi kullanma isteğine karşı direnir.** Destek hizmetleri arasındaki farklılıklar, küçük uyumsuzlukların ortaya çıkması, kodun işe yaraması ve geliştirme aşamasında testlere geçilmesi veya üretimde başarısız olmaya neden olması anlamına gelir. Bu tür hatalar, sürekli dağıtımın etkisini azaltan bir sürtüşme yaratır. Bu sürtünme maliyeti ve sonraki devamlı dağıtımın azaltılması, bir uygulamanın ömrü süresince toplamda düşünüldüğünde oldukça yüksektir.

Önemsiz yerel servisler bir zamanlar olduğundan daha zorlayıcıdır. Memcached, PostgreSQL ve RabbitMQ gibi modern destek servisleri, [Homebrew](http://mxcl.github.com/homebrew/) ve [apt-get](https://help.ubuntu.com/community/AptGet/Howto) gibi modern paket sistemleri sayesinde yüklemesi ve çalıştırılması zor değildir. Alternatif olarak, [Chef](http://www.opscode.com/chef/) ve [Puppet](http://docs.puppetlabs.com/) gibi bildiri sağlayıcı araçlar önemsiz sanal ortamlarla birleşir, [Vagrant](http://vagrantup.com/) gibi, geliştiricilerin yerel ortamda çalışmalarına izin verir, yaklaşık olarak ürün ortamına benzer. Bu sistemlerin yüklenmesi ve kullanımının maliyeti, geliştirme üretim eşitliği ve sürekli dağıtımın faydasıyla karşılaştırıldığında düşüktür.

Farklı destek servislerinin uyarlayıcıları hala kullanışlıdır, çünkü yeni destek servislerine bağlanmayı nispeten zahmetsiz yapar. Ama uygulamanın bütün dağıtımları (geliştirme ortamları, evreleme, ürün) her bir destek servisinin aynı tip ve versiyonunu kullanmalıdır.
