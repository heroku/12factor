Contexte
==========

Les contributeurs de ce document ont été directement impliqués dans le développement et le déploiement de centaines d'applications, et ont vu, indirectement, le développement, la gestion et le grossissement de centaines de milliers d'applications via le travail fait sur la plateforme [Heroku](http://www.heroku.com/).

Ce document fait la synthèse de toutes nos expériences et observations sur une large variété d'applications software-as-a-service. C'est la triangulation de pratiques idéales pour le développement d'applications, en portant un soin tout particulier aux dynamiques de la croissance organique d'une application au cours du temps, les dynamiques de la collaboration entre les développeurs qui travaillent sur le code de l'application, en [évitant le coût de la lente détérioration du logiciel dans un environnement qui évolue (en)](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

Notre motivation est de faire prendre conscience de certains problèmes systémiques que nous avons rencontrés dans le développement d'applications modernes, afin de fournir un vocabulaire partagé pour discuter ces problèmes, et pour offrir un ensemble de solutions conceptuelles générales à ces problèmes, ainsi que la terminologie correspondante. Le format est inspiré par celui des livres de Martin Fowler *[Patterns of Enterprise Application Architecture (en)](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* et *[Refactoring (en)](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*.

