## XI. Günlükler
### Günlüklere olay akışı gibi davranma

*Günlükler* çalışan bir uygulamanın davranışının görünür olmasını sağlar. Sunucu tabanlı ortamlarda genellikle diskteki bir dosyaya yazılırlar("logfile"); ama bu sadece çıktı formatındadır.

Günlükler, bütün çalışan süreçler ve destek servislerinin çıktı akışlarından kümelenmiş, zaman sıralı olayların [akışıdır](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/). Günlükler ilk formda her bir satır için bir olay olacak şekilde yazı formatındadır(Bununla birlikte istisnalardaki geri dönüşleri birden fazla satırda ölçebilir). Günlükler başta ve sonda düzeltilmemiş ama akış, uygulama işlediği sürece devam eder.

**On iki faktör uygulaması çıkış akışlarının depolaması veya yönlendirilmesiyle ilgilenmez.** Günlük dosyalarını yazma ve yönetme yapmamalıdır. Bunun yerine, her çalışan süreç kendi olay akışını tamponlamadan `stdout`'a yazar. Yerel geliştirme süresince, geliştirici uygulamanın davranışını gözlemlemek için terminallerinin önplanında bu akışı inceleyecekler.

Evreleme ve ürün dağıtımlarında herbir sürecin akışı çalışma ortamı tarafından yakalanmış diğer uygulamadaki, diğer bütün akışlarla birlikte sıralanmış, görüntüleme ve uzun dönem arşivleme için bir veya daha fazla son hedeflerine yönlendirilmiş olacaklar. Bu arşivsel hedefler uygulama tarafından görülebilir veya yapılandırılabilir değildir, bunun yerine tamamen çalışma ortamı tarafından yönetilirler. Açık kaynak günlük yönlendiricileri ([Logplex](https://github.com/heroku/logplex) ve [Fluentd](https://github.com/fluent/fluentd) gibi) bu amaç için erişilebilirdir.

Bir uygulama için olay akışı dosyaya yönlendirilebilir veya terminalden gerçek zamanlı kuyruklama aracılığla izlenebilir. En önemlisi, akış  [Splunk](http://www.splunk.com/) gibi günlük numaralandırma ve analiz sistemine veya [Hadoop/Hive](http://hive.apache.org/) gibi genel amaçlı veri depolama sistemine gönderilebilir. Bu sistemler uygulamanın zamanla olan davranışlarında iç gözlem yapmak için büyük güç ve esnekliğe izin verir. Bunları içerir:

* Geçmişteki özel olayları bulmak.
* Eğilimlerin geniş aralıklı grafikleri(her bir dakika için olan istekler gibi).
* Kullanıcı tanımlı kestirme yollara göre aktif uyarma(Bir dakikadaki hataların niceliği belirli bir alt sınırı geçtiği zaman olan uyarı gibi).
