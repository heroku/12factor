## III. Yapılandırma
### Yapılandırma ayarlarını ortam değişkeni saklama

Bir uygulamanın *yapılandırma ayarları* [dağıtımlar](./codebase) arasında farklı olma ihtimali olan her şeydir. Örneğin:

* Veritabanlarının, önbellekleme servislerinin ve diğer [yardımcı servislerin](./backing-services) erişim bilgileri
* Amazon S3 ve Twitter gibi dış servisler için kimlik bilgileri
* Dağıtımlar için standart sunucu ismi gibi dağıtım-öncesi değerler

Uygulamalar bazen yapılandırma ayarlarını kod içerisinde saklar. Bu on iki faktörün, **yapılandırmayı koddan mutlak ayrımını** gerektiren kuralın ihlalidir. Yapılandırma ayarları dağıtımlar arasında değişir, ama kod değişmez.

Bir uygulamanın herhangi bir kimlik bilgisinin gizliliğini ihlal etmeden açık kaynak yapılabilip yapılamayacak olması, tüm yapılandırmaları koddan doğru bir biçimde çıkarılıp çıkarılmadığını belirleyebilecek bir litmus testidir.

Bu *yapılandırma ayarı* tanımının, [Spring](http://spring.io/)'de [kod modüllerinin bağlantısında](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) olduğu gibi ve Rails'deki `config/routes.rb` gibi dahili uygulama yapılandırmasını **içermediğini** unutmayın. Bu tip yapılandırmalar, dağıtımlar arasında değişiklik göstermeyeceği için, kod içinde gerçekleştirilmeleri mantıklıdır.

Yapılandırmaya diğer bir yaklaşım da Rails'deki `config/database.yml` gibi dosyaların versiyon kontrol sistemine dahil edilmeden kullanımıdır. Bu, kod deposuna dahil edilmiş sabitler kullanmaya göre büyük bir gelişimdir, fakat hala zayıflıkları vardır: Bu dosyaların yanlışlıkla versiyon kontrol sistemine dahil edilme olasılığı oldukça yüksektir. Yapılandırma dosyalarının farklı yerlerde ve farklı formatlarda dağılmış olması eğilimi mevcuttur, ve bu durum bütün yapılandırmayı bir yerde görmeyi ve yönetmeyi zorlaştırır. Dahası, bu formatlar genelde dil veya çatı için özelleşmiştir.

**On iki faktör uygulamalarında yapılandırma *ortam değişkenlerinde* kaydedilir** (sıklıkla *env vars* veya *env* olarak kısaltılır). Ortam değişkenleri herhangi bir kod değişikliği olmadan, dağıtımlar arasında kolay değişebilir; Yapılandırma dosyalarının aksine, kod deposuna yanlışlıkla dahil edilme ihtimali düşüktür; ve özel yapılandırma dosyalarının veya Java sistem özellikleri gibi yapılandırma mekanizmalarının aksine, onlar dil ve işletim sisteminden etkilenmez.

Yapılandırma yönetiminin diğer bir açısı da gruplandırmadır. Bazen uygulamalar, Rails'deki `geliştirme`, `test` ve `canlı` ortamları gibi belirli dağıtımlardan sonra adlandırılmış gruplar içinde yapılandırılır. Bu yöntem temiz bir şekilde ölçeklenemez. Çünkü uygulamanın daha fazla dağıtımı oluştukça, yeni ortam isimleri gerekli olur, `staging` veya `qa` gibi. Projeler ilerde geliştikçe, geliştiriciler `joes-staging` kendi özel ortam değişkenlerini ekleyebilir. Bu da yapılandırma dosyalarının hızla artmasıyla sonuçlanarak dağıtım yönetimini oldukça kırılganlaştırır.

On iki faktör uygulamasında ortam değişkenleri parçacıklı kontrol edilirler, birbirlerinden bağımsızlardır. Asla gruplandırılmazlar, onun yerine her bir dağıtım için bağımsız olarak yönetilirler. Bu, uygulamayı yaşam süresi boyunca daha fazla dağıtıma genişletmeyi sorunsuzca ölçeklendiren bir modeldir.
