## 머리말

최근 소프트웨어를 서비스 형태로 제공하는게 일반화 되면서, 웹앱 혹은 SaaS(Software As A Service)라고 부르게 되었다. Twelve-Factor app은 아래 특징을 가진 SaaS 앱을 만들기 위한 방법론이다.

* 설정 자동화를 위한 **절차(declarative)** 를 체계화 하여 새로운 개발자가 프로젝트에 참여하는데 드는 시간과 비용을 최소화한다.
* OS에 따라 **달라지는 부분을 명확히**하고, 실행 환경 사이의 **이식성을 극대화** 한다.
* 최근 등장한 **클라우드 플랫폼** **배포에** 적합하고, 서버와 시스템의 관리가 필요없게 된다.
* 개발 환경과 운영 환경의 **차이를 최소화**하고 민첩성을 극대화하기 위해 **지속적인 배포**가 가능하다.
* 툴, 아키텍처, 개발 방식을 크게 바꾸지 않고 **확장(scale up)** 할 수 있다.

Twelve-Factor 방법론은 어떤 프로그래밍 언어로 작성된 앱에도 적용할 수 있고 백엔드 서비스(데이터베이스, 큐, 메모리 캐시 등)와 다양한 조합으로 사용할 수 있다.

## 배경

이 문서에 기여한 사람들은 수백개 앱의 개발과 배포에 직접 참여했으며, [Heroku](http://www.heroku.com/) 플랫폼을 통해서 방대한 앱의 개발, 운영, 확장을 간접적으로 관찰했다.

이 문서는 실제로 쓰이는 다양한 SaaS 앱에 대한 경험과 관찰을 종합한 결과물이다. 특히 시간이 지나면서 앱이 유기적으로 성장하는 부분, 앱 코드베이스에서 작업하는 개발자들 간의 협업, [시간이 지나면서 망가지는 소프트웨어 유지비용을 줄이는 법](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/)에 집중하여 이상적인 앱 개발 방법을 찾고자 했다.

이 문서는 우리가 최신 애플리케이션 개발에서 만났던 몇가지 시스템적인 문제에 대한 인지도를 높이고, 이 문제들을 가지고 논의 하는데 필요한 공통의 어휘를 제공하며, 이 문제들에 대한 넓은 개념의 해결책과 용어를 제공하기 위해 작성 했다. 형식은 Martin Fowler의 책, *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)*과 *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*에서 영감을 받았다.

## 이 문서의 대상

서비스로 동작하는 애플리케이션을 개발하는 모든 개발자. 그런 애플리케이션을 배포하고 관리하는 인프라 엔지니어.
