## VII. Port Bağlama
### Port bağlama yolu üzerinden dışarı aktarma

Web uygulamaları bazen web sunucu taşıyıcıları içinde çalıştırılırlar. Örneğin, PHP uygulamaları modül olarak [Apache HTTPD](http://httpd.apache.org/) içinde veya Java uygulamaları [Tomcat](http://tomcat.apache.org/) içinde çalıştırılabilirler.

**On iki faktör uygulama tamamen kendi kendine yeterlidir** ve web'e açılan bir servis sunmak için çalıştırma ortamına başka bir web sunucusu enjekte edilmesini beklemez. Bu web uygulaması servisini HTTP üzerinden bir porta bağlanarak sunar ve o porta gelen istekleri dinler.

Yerel geliştirme ortamında, geliştiriciler uygulamanın servislerine ulaşmak için `http://localhost:5000/` gibi bir URL'yi ziyaret eder. Dağıtımda, bir yönlendirme katmanı halka açık bir adrese gelen istekleri karşılayıp porta bağlanmış web süreçlerine aktarırlar.

Uygulamalar web sunucusu özelliği edinmek için genellikle [bağımlılık tanımlaması](./dependencies) kullanarak Python için [Tornado](http://www.tornadoweb.org/), Ruby için [Thin](http://code.macournoyer.com/thin/) veya Java ve diğer JVM-tabanlı diller için [Jetty](http://jetty.codehaus.org/jetty/) gibi kütüphaneler kullanırlar. Bu, *kullanıcı alanında* yani uygulamanın kodu içinde gerçekleşir. Çalışma ortamıyla olan anlaşma isteklere hizmet veren bir porta bağlanmaktır.

HTTP, port bağlama ile dışarı aktarılabilen tek protokol değildir. Nerdeyse her sunucu yazılım tipi bir porta bağlanarak ve gelen istekleri dinleyerek çalışabilir. Örnekler [ejabberd](http://www.ejabberd.im/) ([XMPP](http://xmpp.org/) ile haberleşir) ve [Redis](http://redis.io/)'i ([Redis protocol](http://redis.io/topics/protocol) ile haberleşir) içerir.

Ayrıca not edilmelidir ki, porta bağlanma yaklaşımı, bir uygulamanın başka bir uygulamaya [yardımcı servis](./backing-services) olmasını sağlayabilir. Bunu, uygulamanın servise bağlanabileceği bir URL sağlayarak yapar.
