## VII. Port Bağlama
### Port bağlama yolu üzerinden dışarı aktarma

Web uygulamaları bazı zamanlar web sunucu taşıyıcıları içinde çalıştırılırlar. Örneğin, PHP uygulamaları modül olarak [Apache HTTPD](http://httpd.apache.org/) içinde veya Java uygulamaları [Tomcat](http://tomcat.apache.org/) içinde çalıştırılabilirler.

**On iki faktör uygulama tamamen bağımsız** ve web dönüştürme servisi oluşturmak için çalışma ortamı içindeki web sunucunun çalışma zamanlı enjeksiyonuna dayanmaz. Bu web uygulaması port bağlama tarafından HTTP'yi servis olarak dışa aktarır ve o porta gelen istekleri dinler.

Yerel geliştirme ortamında, geliştiriciler `http://localhost:5000/` gibi servis URL'ini, onların duygulamaları tarafından dışa aktarılan servise erişmek için ziyaret ederler. Dağıtımda, yönlendirme katmanı dışa bakan makine adından port bağımlı web süreçlerine gelen yönlendirme isteklerini ele alır.

Bu tipik olarak, uygulamaya web sunucusu kütüphanesi eklemek için bağımlılık tanımlaması kullanılarak geliştirilmiştir, Python için [Tornado](http://www.tornadoweb.org/), Ruby için [Thin](http://code.macournoyer.com/thin/) veya Java ve diğer JVM-tabanlı diller için [Jetty](http://jetty.codehaus.org/jetty/). Bu uygulamanın kodu içinde *kullanıcı alanında* gerçekleşir. Çalışma ortamıyla olan anlaşma isteklere hizmet veren bir porta bağlıdır.

HTTP port bağlama ile dışarı aktarılabilen tek servis değildir. Nerdeyse herhangi bir sunucu yazılım tipi port için süreç bağlama aracılığıyla çalışır ve gelen istekleri bekler. Örnekler [ejabberd](http://www.ejabberd.im/) ([XMPP](http://xmpp.org/) ile haberleşir) ve [Redis](http://redis.io/) ([Redis protocol](http://redis.io/topics/protocol) ile haberleşir) içerir.

Port bağlama yaklaşımı bir uygulamanın,tüketici uygulama için yapılandırmadaki kaynak olanağı gibi destek uygulamasına URL sağlayarak diğer bir uygulamanın [destek servisi](./backing-services) olabileceği anlamına geldiğini de unutmayın.
