## 简介
如今，软件通常会作为一种服务来交付，它们被称为网络应用程序，或软件即服务（SaaS）。12-Factor 为构建如下的 SaaS 应用提供了方法论：

* 使用**标准化**流程自动配置，从而使新的开发者花费最少的学习成本加入这个项目。
* 和操作系统之间尽可能的**划清界限**，在各个系统中提供**最大的可移植性**。
* 适合**部署**在现代的**云计算平台**，从而在服务器和系统管理方面节省资源。
* 将开发环境和生产环境的**差异降至最低**，并使用**持续交付**实施敏捷开发。
* 可以在工具、架构和开发流程不发生明显变化的前提下实现**扩展**。

这套理论适用于任意语言和后端服务（数据库、消息队列、缓存等）开发的应用程序。

## 背景

本文的贡献者参与过数以百计的应用程序的开发和部署，并通过 [Heroku](http://www.heroku.com/) 平台间接见证了数十万应用程序的开发，运作以及扩展的过程。

本文综合了我们关于 SaaS 应用几乎所有的经验和智慧，是开发此类应用的理想实践标准，并特别关注于应用程序如何保持良性成长，开发者之间如何进行有效的代码协作，以及如何 [避免软件污染](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/) 。

我们的初衷是分享在现代软件开发过程中发现的一些系统性问题，并加深对这些问题的认识。我们提供了讨论这些问题时所需的共享词汇，同时使用相关术语给出一套针对这些问题的广义解决方案。本文格式的灵感来自于 Martin Fowler 的书籍： *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* ， *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)* 。

## 读者应该是哪些人？

任何 SaaS 应用的开发人员。部署和管理此类应用的运维工程师。
