## V. Derleme, Sürüm, Çalıştırma
### Derleme ve çalıştırma aşamalarını tam olarak ayırma

Bir [kod tabanı](./codebase) üç aşamada dağıtıma dönüşebilir:

* *Derleme aşaması* kod deposunun *derleme* olarak bilinen çalıştırılabilir pakette çeviren bir dönüşümdür.Dağıtım süreci tarafından belirlenen bir commit'deki kodun versiyonunu kullanırken, derleme aşaması sağlayıcı [bağımlılıkları](./dependencies)  getirir ve binary'leri derler.
* *Sürüm aşaması*, derleme aşaması tarafından üretilmiş derlemeyi alır ve dağıtımı şu anki [yapılandırmasıyla](./config) birleştirir. Son durumda oluşan *sürüm* derleme ve yapılandırmanın ikisinide içerir ve çalışma ortamındaki doğrudan çalıştırma için hazırdır.
* *Çalıştırma evresi* (aynı zamanda "runtime" olarak bilinir) seçili sürümün karşılığındaki uygulamanın [süreçlerini](./processes) bazı setlerini başlatarak, çalıştırma ortamındaki uygulamayı çalıştırır.

![Kod, sürüm oluşturmak için yapılandırmayla birleşmiş derlemeye dönüşür.](/images/release.png)

**On iki faktör uygulamaları derleme,sürüm ve çalıştırma aşamaları arasında mutlak ayırmayı kullanır.** Örneğin, koddaki değişiklikleri derleme aşamasına geri döndürmenin bir yolu olmadığı için çalışma zamanında kodda değişiklik yapmak imkansızdır.

Dağıtım araçları genel olarak sürüm yönetim araçlarını önerir, en dikkat çekeni bir önceki sürüme geri dönme yeteneğidir. Örneğin, [Capistrano](https://github.com/capistrano/capistrano/wiki) dağıtım aracı sürümleri, şu anki sürümün şimdiki sürüm dizinine bir sembolik link olduğu, `releases` adlı alt dizinde depolar. `rollback` komutu, bir önceki sürüme hızlı geri dönüşü kolaylaştırır.

Her sürüm her zaman sürümlerin zaman damgası gibi (`2011-04-06-20:32:17` gibi) özel sürüm ID'sine veya artış numarasına (`v100` gibi) sahip olmalıdır. Sürümler yalnızca eklemeli bir defterdir ve bir kere oluşturulduğu zaman dönüştürülemez. Herhangi bir değişiklik yeni bir sürüm oluşturmalıdır.

Derlemeler, herhangi bir zamanda yeni kod dağıtıldığında uygulama geliştiricileri tarafından başlatılır. Çalışma zamanı yürütmesi, kontras tarafından, sunucu tekrar çalıştırılması veya çökmüş süreçlerin süreç yöneticisi tarafından tekrar başlatılması gibi durumlarda otomatik olarak olabilir. Bunun sonucunda, çalıştırma evresi, gecenin bir yarısında çalışan geliştiriciler yokken uygulamanın çalışmasını engelleyen problemler uygulamanın bozulmasına yol açabildiği için, olabildiği kadar az sayıda hareketli bölüm olarak tutulmalıdır. Derleme evresinde, hatalar  dağıtımı çalıştıran geliştiriciler için her zaman ön planda olduğu için daha fazla karış olabilir.
