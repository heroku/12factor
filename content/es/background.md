Antecedentes
============

Los colaboradores de este documento hemos estado involucrados de forma directa en el desarrollo y despliegue de cientos de aplicaciones, y hemos presenciado de manera indirecta el desarrollo, la operación, y el escalado de cientos de miles de aplicaciones a tráves de nuestro trabajo en la plataforma [Heroku](http://www.heroku.com/).

Este documento sintetiza todas nuestras experiencias y observaciones en una gran variedad de aplicaciones software-as-a-service en el mundo real. Es una triangulación de prácticas ideales para el desarrollo de aplicaciones, que presta especial atención a cómo crece orgánicamente una aplicación a lo largo del tiempo, cómo colaboran los desarrolladores que trabajan en el código de la aplicación, y cómo [evitar el precio de la erosión del software](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

Nuestro objetivo es concienciar sobre algunos problemas sistémicos que hemos visto en el desarrollo moderno de aplicaciones, prestar un vocabulario común para hablar de esos problemas y proponer un amplio conjunto de soluciones conceptuales a tales problemas con una terminología que los acompañe. El formato está inspirado en los libros de Martin Fowler *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* y *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*.
