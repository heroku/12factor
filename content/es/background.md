Contexto
========

Los colaboradores de este documento han estado involucrados directamente en el desarrollo y despliegue de cientos de aplicaciones, y han sido testigos indirectos del desarrollo, las operaciones y el escalado de cientos de miles de aplicaciones mediante nuestro trabajo en la plataforma [Heroku](http://www.heroku.com/).

Este documento sintetiza toda nuestra experiencia y observaciones en una amplia variedad de aplicaciones SaaS. Es la triangulación entre practicas ideales para el desarrollo de aplicaciones, prestando especial atención a las dinámicas del crecimiento natural de una aplicación a lo largo del tiempo, las dinámicas de colaboración entre desarrolladores que trabajan en el código base de las aplicaciones y [evitando el coste de la entropía del software](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

Nuestra motivación es mejorar la concienciación sobre algunos problemas sistémicos que hemos observado en el desarrollo de las aplicaciones modernas, aportar un vocabulario común que sirva para discutir sobre estos problemas, y ofrecer un conjunto de soluciones conceptualmente robustas para esos problemas acompañados de su correspondiente terminología. El formato está inspirado en los libros de Martin Fowler *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* y *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*.
