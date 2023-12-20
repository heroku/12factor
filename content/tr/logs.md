## XI. Günlükler
### Günlüklere olay akışı gibi davranma

*Günlükler* çalışan bir uygulamanın davranışlarını izleyebilme imkanı sağlar. Sunucu tabanlı ortamlarda genellikle diskteki bir dosyaya yazılırlar (ve bunlara log dosyası denir); ama bu sadece bir çıktı formatıdır.

Günlükler, bütün çalışan süreçler ve destek servislerinin çıktı akışlarından kümelenmiş, zaman sıralı olayların [akışıdır](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/). Günlükler en ham haliyle her bir satırda bir olay içeren yazı formatındadır (ancak hata kayıtlarındaki detaylar birden fazla satıra yayılabilir). Günlüklerin belirlenmiş bir başlangıcı ve sonu yoktur, uygulama işlediği sürece akış devam eder.

**On iki faktör uygulaması çıkış akışlarının depolaması veya yönlendirilmesiyle ilgilenmez.** Log dosyalarına yazmayı, ya da log dosyalarını yönetmeyi denememelidir. Bunun yerine, her çalışan süreç kendi olay akışını tamponlamadan (İng. buffer) `stdout`'a yazar. Yerel geliştirme süresince, geliştirici uygulamanın davranışını gözlemlemek için terminallerinde bu akışı inceleyebilirler.

Test ve canlı yayın dağıtımlarında her bir sürecin akışı çalışma ortamı tarafından yakalanır, diğer bütün akışlarla birleştirilir, ve görüntüleme ve uzun dönem arşivleme için bir veya daha fazla son hedeflerine yönlendirilirler. Bu arşivsel hedefler uygulama tarafından görülebilir veya yapılandırılabilir değildir, tamamen çalışma ortamı tarafından yönetilirler. Açık kaynak log yönlendiricileri ([Logplex](https://github.com/heroku/logplex) ve [Fluentd](https://github.com/fluent/fluentd) gibi) bu amaç için kullanılabilir.

Bir uygulamanın olay akışı dosyaya yönlendirilebilir veya terminalden gerçek zamanlı olarak izlenebilir. En önemlisi, akış [Splunk](http://www.splunk.com/) gibi log saklama ve analiz sistemine veya [Hadoop/Hive](http://hive.apache.org/) gibi genel amaçlı bir veri depolama sistemine gönderilebilir. Bu sistemler uygulamanın zaman içindeki davranışlarında gözlem yapmak için büyük güç ve esneklik sağlar. Örneğin:

* Geçmişteki spesifik olayları bulmak.
* Eğilimlerin geniş aralıklı grafikleri (her bir dakika için olan istekler gibi).
* Kullanıcı tanımlı davranışları algılayıp aktif uyarı sağlama (Bir dakikadaki hataların miktarı belirli bir alt sınırı geçtiği zaman olan uyarı gibi).
