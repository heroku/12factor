背景
==========

本文的贡献者参与过数以百计的应用程序的开发和部署，并通过 [Heroku](http://www.heroku.com/) 平台间接见证了数十万应用程序的开发，运作以及扩展的过程。

本文综合了我们关于 SaaS 应用几乎所有的经验和智慧，是开发此类应用的理想实践标准，并特别关注于应用程序如何保持良性成长，开发者之间如何进行有效的代码协作，以及如何 [避免软件污染](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/) 。

我们的初衷是分享在现代软件开发过程中发现的一些系统性问题，并加深对这些问题的认识。我们提供了讨论这些问题时所需的共享词汇，同时使用相关术语给出一套针对这些问题的广义解决方案。本文格式的灵感来自于 Martin Fowler 的书籍： *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* ， *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)* 。

