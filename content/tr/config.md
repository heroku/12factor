## III. Yapılandırma
### Ortamda yapılandırma depolama

Bir uygulamanın *yapılandırması* muhtemelen [dağıtımlar](./codebase) arasındaki değişikliktir(kademelendirme, ürün, geliştirici ortamları vb.). Bunları içerir:

* Veri tabanını ele alan kaynaklar, önbellek ve diğer [destek servisleri](./backing-services)
* Amazon S3 ve Twitter gibi dış servisler için kimlik bilgileri
* Dağıtımlar için standart sunucu ismi gibi her dağıtım için değerler

Uygulamalar bazen  yapılandırmayı koddaki sabitler gibi saklar. Bu on iki faktörün, **yapılandırmayı koddan mutlak ayırmayı** gerektiren bir ihlalidir. Yapılandırma dağıtımlar arasında önemli derecede değişime uğrar, kod uğramaz.

Bir uygulamanın tüm yapılandırmaları koddan doğru bir biçimde çıkarılıp çıkarılmadığına dair bir litot testi, herhangi bir kimlik bilgilerinden ödün vermeksizin kod tabanının her an açık kaynak yapıp yapamayacağına karar verir.

Bu *yapılandırma* tanımlamasının, [Spring](http://spring.io/)'de [kod modullerinin bağlantısında](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) olduğu gibi ve Rails'de `config/routes.rb` gibi dahili uygulama yapılandırmasını **içermediğini** unutmayın. Bu tip yapılandırma dağıtımlar arasında değişiklik göstermez ve bu kod içinde en iyi şekilde gerçekleştirilmiştir.

Yapılandırmaya diğer bir yaklaşım  Rails'deki `config/database.yml` gibi gözden geçirme kontrolünde kontrol edilmemiş yapılandırma dosyalarının kullanımıdır. Bu kod deposundaki kontrol edilmiş sabitlerin kullanımındaki büyük bir gelişmedir, fakat hala zayıflıkları vardır: Depoda, yapılandırma dosyalarının kontrolünde hata kolay yapılabilir; Yapılandırma dosyalarının farklı yerlerde ve farklı formatlarda dağılmış olması için bir eğilim vardır, bu durum bütün yapılandırmayı bir yerde görmeyi ve yönetmeyi zorlaştırır. Bu formatların özel dil veya çatı olma eğilimi vardır.

**On iki faktör uygulamalarında yapılandırma *ortam değişkenlerinde* kaydedilir**(sıklıkla *env vars* veya *env* olarak kısaltılır). Ortam değişkenleri herhangi bir kod değişikliği olmadan, dağıtımlar arasında kolay değişebilir; Yapılandırma dosyalarının aksine, kod deposunda yanlışlıkla kontrol edilme şansı az; ve özel yapılandırma dosyalarının veya Java sistem özellikleri gibi yapılandırma mekanizmalarının aksine, onlar dil ve işletim sisteminden etkilenmez.

Yapılandırma yönetiminin diğer bir açısı da gruplandırmadır. Bazen uygulamalar, Rails'deki `geliştirme`, `test` ve `üretim` ortamları gibi belirli dağıtımlardan sonra adlandırılmış, adlandrılmış guruplar içinde yapılandırılır(genellikle "environments" olarak adlandırılır). Bu method temiz bir ölçüm yapmaz: uygulamanın daha fazla dağıtımı oluştuğu sürece, yeni ortam isimleri gereklidir, `staging` veya `qa` gibi. Projeler ilerde geliştikçe, geliştiriciler `joes-staging` kendi özel ortam değişkenlerini ekleyebilir, dağıtım yönetimini çok hassas yapan yapılandırmanın birleşimsel infilakıyla sonuçlanır.

On iki faktör uygulamasında ortam değişkenleri parçacıklı kontrol edilirler, her biri diğer ortam değişkenlerine karşı suffix/prefix olarak gelmez ayrı tanımlanır. Asla "environments" olarak beraber gruplandırılamaz, fakat onun yerine her bir dağıtım için bağımsız yönetilir. Bu, uygulamayı yaşam süresi boyunca daha fazla dağıtıma genişletmeyi sorunsuzca büyüten bir modeldir.
