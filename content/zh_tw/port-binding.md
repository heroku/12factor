## VII. 端口綁定
### 通過端口綁定(*Port binding*)來提供服務

網路應用有時會運行於伺服器的容器之中。例如 PHP 經常作為 [Apache HTTPD](http://httpd.apache.org/) 的一個模組來運行，正如 Java 運行於 [Tomcat](http://tomcat.apache.org/) 。

**12-Factor 應用完全自我加載** ，不依賴於任何網路伺服器就可以創建一個面向網路的服務。網路應用 **通過端口綁定來提供服務** ，並監聽發送至該端口的請求。

本地環境中，開發人員通過類似`http://localhost:5000/`的地址來訪問服務。在線上環境中，請求統一發送至公共域名而後路由至綁定了端口的網路進程。

通常的實作思路是，將網路伺服器類庫通過 [依賴聲明](./dependencies) 載入應用。例如，Python 的 [Tornado](http://www.tornadoweb.org/), Ruby 的[Thin](http://code.macournoyer.com/thin/) , Java 以及其他基於 JVM 語言的 [Jetty](http://www.eclipse.org/jetty/)。完全由 *用戶端* ，確切的說應該是應用的代碼，發起請求。和運行環境約定好綁定的端口即可處理這些請求。

HTTP 並不是唯一一個可以由端口綁定提供的服務。其實幾乎所有服務器軟件都可以通過進程綁定端口來等待請求。例如，使用 [XMPP](http://xmpp.org/) 的 [ejabberd](http://www.ejabberd.im/)  ， 以及使用 [Redis 協議](http://redis.io/topics/protocol) 的 [Redis](http://redis.io/) 。

還要指出的是，端口綁定這種方式也意味著一個應用可以成為另外一個應用的 [後端服務](/backing-services) ，調用方將服務方提供的相應 URL 當作資源存入 [配置](/config) 以備將來調用。
