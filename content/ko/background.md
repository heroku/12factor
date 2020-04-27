배경
==========

이 문서에 기여한 사람들은 수백개 앱의 개발과 배포에 직접 참여했으며, [Heroku](http://www.heroku.com/) 플랫폼을 통해서 방대한 앱의 개발, 운영, 확장을 간접적으로 관찰했다.

이 문서는 실제로 쓰이는 다양한 SaaS 앱에 대한 경험과 관찰을 종합한 결과물이다. 특히 시간이 지나면서 앱이 유기적으로 성장하는 부분, 앱 코드베이스에서 작업하는 개발자들 간의 협업, [시간이 지나면서 망가지는 소프트웨어 유지비용을 줄이는 법](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/)에 집중하여 이상적인 앱 개발 방법을 찾고자 했다.

이 문서는 우리가 최신 애플리케이션 개발에서 만났던 몇가지 시스템적인 문제에 대한 인지도를 높이고, 이 문제들을 가지고 논의 하는데 필요한 공통의 어휘를 제공하며, 이 문제들에 대한 넓은 개념의 해결책과 용어를 제공하기 위해 작성 했다. 형식은 Martin Fowler의 책, *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)*과 *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*에서 영감을 받았다.