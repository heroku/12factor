Háttér
======

A dokumentum készítői közvetlenül több száz alkalmazás fejlesztésében és telepítésében vettek részt, munkájuk révén közvetett módon pedig több százezer alkalmazás fejlesztését, üzemeltetését és skálázását figyelték meg a <a href="http://www.heroku.com/" target="_blank">Heroku</a>  platformon.

Ez a dokumentum szintetizálja minden tapasztalatunkat és megfigyelésünket a szoftver-mint-szolgáltatás alkalmazások széles körének dzsungelében. Ez hármas egyensúlyt biztosító ideálís megoldás egy alkalmazás fejlesztésének és üzemeltetésének teljes életciklusa alatt. Különös figyelmet tudunk fordítani az alkalmazás időben történő természetes növekedésére és fejlődésére, az alkalmazás kódbázisán dolgozó fejlesztők együttműködésének a dinamikájára és egyben el tudjuk kerülni a költséges<a href="http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/" target="_blank">szoftverpusztulást</a>

Célunk, hogy felhívjuk a figyelmet néhány olyan rendszerszintű problémára, amelyet láttunk a modern alkalmazásfejlesztés során, hogy közös szókincset biztosítsunk ezeknek a problémáknak a megvitatásához és kísérő terminológia segítségével széles körű fogalmi megoldásokat kínáljunk ezekhez a problémákhoz. A formátumot Martin Fowler könyvei inspirálják: *<a href="https://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC" target="_blank">Enterprise Application Architecture</a> és a <a href="https://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C" target="_blank">Refactoring</a.

