## V. Derleme, yayınlama, çalıştırma
### Derleme ve çalıştırma aşamalarını tam olarak ayırma

Bir [kod tabanı](./codebase) üç aşamada (geliştirme dağıtımı olmayan) dağıtıma dönüşür:

* *Derleme aşaması* kod deposunun *derleme* olarak bilinen çalıştırılabilir bir pakete çevrilmesidir. Dağıtım evresi tarafından seçilen commit'teki kod kullanılır. Sistem, üçüncü parti [bağımlılıkları](./dependencies) toparlar ve çalıştırılabilirleri ve statik dosyaları derler.
* *Yayınlama aşaması*, derleme aşaması tarafından üretilmiş derlemeyi alır ve dağıtımı güncel [yapılandırmasıyla](./config) birleştirir. Son durumda oluşan *yayın* derleme ve yapılandırmanın ikisini de içerir ve çalışma ortamında çalıştırmak için hazırdır.
* *Çalıştırma evresi* (aynı zamanda "runtime" olarak bilinir) seçili yayının karşılığındaki [süreçleri](./processes) başlatarak, çalıştırma ortamındaki uygulamayı çalıştırır.

![Kod, sürüm oluşturmak için yapılandırmayla birleşmiş derlemeye dönüşür.](/images/release.png)

**On iki faktör uygulamalarının derleme, yayınlama ve çalıştırma aşamaları tamamen birbirinden bağımsızdır.** Örneğin, koddaki değişiklikleri derleme aşamasına geri döndürmenin bir yolu olmadığı için çalışma zamanında kodda değişiklik yapmak imkansızdır.

Dağıtım araçları genelde yayın yönetim araçları da sunar. En dikkat çeken yetenekleri ise bir önceki yayına geri dönebilmeleridir. Örneğin, [Capistrano](https://github.com/capistrano/capistrano/wiki) farklı yayınları `releases` adındaki bir alt dizinde depolar. Çalışıyor olan yayın ise bu alt dizinlerden birine oluşturulmuş bir kısayol dosyasıdır. Capistrano'nun `rollback` komutu, kısayol dosyasının işaret ettiği dizini değiştirerek önceki bir yayına dönüş yapmayı kolaylaştırır.

Her yayın zaman damgası gibi (`2011-04-06-20:32:17` gibi) özel bir ID'ye veya her yeni yayında artan bir numaraya (`v100` gibi) sahip olmalıdır. Yayınlar yalnızca eklemeli bir defterdir ve bir kere oluşturulduğu zaman değiştirilemez. Herhangi bir değişiklik yeni bir yayın oluşturmalıdır.

Derlemeler, geliştiricilerin kod değişikliklerini kod depolarına yüklemesiyle başlatılır. Çalıştırma evresi ise, sunucuların yeniden başlatılması veya çökmüş süreçlerin tekrar ayağa kaldırılması gibi durumlarda otomatik olarak gerçekleştirilir. Bu yüzden çalıştırma evresi olabildiği kadar az sayıda hareketli parçaya sahip olmalıdır ki, gecenin bir yarısında, işinin başında olan hiçbir geliştirici yokken bozulmasın. Derleme evresi ise daha karmaşık olabilir, çünkü hatalar dağıtımı çalıştıran geliştiricilerin her zaman önündedir.
