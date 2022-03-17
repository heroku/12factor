## VII. 포트 바인딩
### 포트 바인딩을 사용해서 서비스를 공개함

웹앱은 웹서버 컨테이너 내부에서 실행되기도 합니다. 예를 들어, PHP 앱은 [Apache HTTPD](http://httpd.apache.org/)의 모듈로 실행될 수도 있고, Java 앱은 [Tomcat](http://tomcat.apache.org/) 내부에서 실행될 수도 있습니다. 

**Twelve-Factor 앱은 완전히 독립적**이며 웹서버가 웹 서비스를 만들기 위해 처리하는 실행환경에 대한 런타임 인젝션에 의존하지 않습니다. Twelve-Factor 웹 앱은 **포트를 바인딩하여 HTTP 서비스로 공개되며** 그 포트로 들어오는 요청을 기다립니다. 

로컬 개발 환경에서는 `http://localhost:5000`과 같은 주소를 통해 개발자가 애플리케이션 서비스에 접근할 수 있습니다. 배포에서는 라우팅 레이어가 외부에 공개된 호스트명으로 들어온 요청을 포트에 바인딩된 웹 프로세스에 전달 합니다. 

이는 일반적으로 [종속선 선언](./dependencies)에 웹서버 라이브러리를 추가함으로써 구현됩니다. 예를 들어, 파이썬의 [Tornado](http://www.tornadoweb.org/)나 루비의 [Thin](http://code.macournoyer.com/thin/)이나 자바와 JVM 기반 언어들을 위한 [Jetty](http://www.eclipse.org/jetty/)가 있습니다. 이것들은 전적으로 *유저 스페이스* 즉, 애플리케이션의 코드 내에서 처리됩니다. 실행 환경과의 규약은 요청을 처리하기 위해 포트를 바인딩하는 것입니다. 

포트 바인딩에 의해 공개되는 서비스는 HTTP 뿐만이 아닙니다. 거의 모든 종류의 서버 소프트웨어는 포트를 바인딩하고 요청이 들어오길 기다리는 프로세스를 통해 실행될 수 있습니다. 예를 들면, [ejabberd](http://www.ejabberd.im/) ([XMPP](http://xmpp.org/)을 따름)나 [Redis](http://redis.io/) ([Redis protocol](http://redis.io/topics/protocol)을 따름) 등이 있습니다.

포트 바인딩을 사용한다는 것은 하나의 앱이 다른 앱을 위한 백엔드 서비스가 될 수 있다는 것을 의미한다는 점에 주목합시다. 백엔드 앱의 URL을 사용할 앱의 [설정](./config)의 리소스 핸들로 추가하는 방식으로 앱이 다른 앱을 백엔드 서비스로 사용할 수 있습니다.
