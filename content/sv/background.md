Background (Bakgrund)
==========

De som bidragit till detta dokument har varit direkt involverade i utvecklingen och produktionssättningen av hundratals applikationer, och indirekt bidragit till utvecklingen, skötsel och uppskalningen av hundratusentals applikationer via vårt arbete med plattformen <a href="http://www.heroku.com/" target="_blank">Heroku</a>.

Detta dokument sammanför våra samlade erfarenheter och observationer inom ett brett utbud av applikationer inom *software-as-a-service*. Det är en triangulering av ideala principer för applikationsutveckling, med särskild hänsyn till dynamiken hos organisk framväxt av en applikation över tid, dynamiken av samarbete mellan flera utvecklare som arbetar på samma kodbas, och att <a href="http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/" target="_blank">undvika kostnaden av underminerad mjukvara</a>

Vårt mål är att skapa medvetenhet om vissa systematiska problem som vi sett inom modern applikationsutveckling, att erbjuda ett gemensamt vokabulär för att diskutera dessa problem, och att erbjuda en uppsättning breda konceptuella lösningar för dessa problem tillsammans med sammanhörande terminologi. Formatet är inspirerat av Martin Fowlers böcker *<a href="https://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC" target="_blank">Patterns of Enterprise Application Architecture</a>* och *<a href="https://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C" target="_blank">Refactoring</a>*.
