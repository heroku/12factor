Hintergrund
==========

Die Mitwirkenden an diesem Dokument waren direkt beteiligt an der Entwicklung und dem Deployment von hunderten von Apps und wurden Zeugen bei der Entwicklung, beim Betrieb und der Skalierung von hunderttausenden von Apps im Rahmen unserer Arbeit an der [Heroku](http://www.heroku.com/)-Plattform.

Dieses Dokument ist eine Synthese all unserer Erfahrungen und der Beobachtungen einer großen Bandbreite von Software-As-A-Service Apps. Es ist eine Bestimmung der idealen Praktiken bei der App-Entwicklung mit besonderem Augenmerk auf die Dynamik des organischen Wachstums einer App über die Zeit, die Dynamik der Zusammenarbeit zwischen den Entwicklern die an einer Codebase zusammenarbeiten und der [Vermeidung der Kosten von Software-Erosion](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

Unsere Motivation ist, das Bewusstsein zu schärfen für systembedingte Probleme in der aktuellen Applikationsentwicklung, ein gemeinsames Vokabular zur Diskussion dieser Probleme zu liefern und ein Lösungsportfolio zu diesen Problemen mit einer zugehörigen Terminologie anzubieten. Das Format ist angelehnt an Martin Fowlers Bücher *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* und *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*. 
