## VII. 端口绑定
### 通过端口绑定(*Port binding*)来提供服务

互联网应用有时会运行于服务器的容器之中。例如 PHP 经常作为 [Apache HTTPD](http://httpd.apache.org/) 的一个模块来运行，正如 Java 运行于 [Tomcat](http://tomcat.apache.org/) 。

**12-Factor 应用完全自我加载** 而不依赖于任何网络服务器就可以创建一个面向网络的服务。互联网应用 **通过端口绑定来提供服务** ，并监听发送至该端口的请求。

本地环境中，开发人员通过类似`http://localhost:5000/`的地址来访问服务。在线上环境中，请求统一发送至公共域名而后路由至绑定了端口的网络进程。

通常的实现思路是，将网络服务器类库通过 [依赖声明](./dependencies) 载入应用。例如，Python 的 [Tornado](http://www.tornadoweb.org/), Ruby 的[Thin](http://code.macournoyer.com/thin/) , Java 以及其他基于 JVM 语言的 [Jetty](http://www.eclipse.org/jetty/)。完全由 *用户端* ，确切的说应该是应用的代码，发起请求。和运行环境约定好绑定的端口即可处理这些请求。

HTTP 并不是唯一一个可以由端口绑定提供的服务。其实几乎所有服务器软件都可以通过进程绑定端口来等待请求。例如，使用 [XMPP](http://xmpp.org/) 的 [ejabberd](http://www.ejabberd.im/)  ， 以及使用 [Redis 协议](http://redis.io/topics/protocol) 的 [Redis](http://redis.io/) 。

还要指出的是，端口绑定这种方式也意味着一个应用可以成为另外一个应用的 [后端服务](./backing-services) ，调用方将服务方提供的相应 URL 当作资源存入 [配置](./config) 以备将来调用。
