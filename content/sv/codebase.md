## I. Kodbas
### En kodbas med versionshantering, flera produktionssättningar

En tolvfaktorsapplikation hålls alltid i någon form av versionskontrollsystem, som exempelvis [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), eller [Subversion](http://subversion.apache.org/). En kopia av versionshanteringsdatabasen kallas för ett *kodrepository*, ofta förkortat till *kodrepo* eller just *repo*.

En *kodbas* är varje enskilt repo (i ett centraliserat versionshanteringssystem såsom Subversion), eller varje set av repon som delar en viss koduppladdning som bas (i ett decentraliserat versionshanteringssystem såsom Git).

![En kodbas, flera produktionssättningar](/images/codebase-deploys.png)
![One codebase maps to many deploys](/images/codebase-deploys.png)

Det finns alltid ett ett-till-ett-förhållande mellan kodbasen och applikationen:

* Om det finns multipla kodbaser, är det inte en applikation -- det är ett distribuerat system. Varje komponent i ett distribuerat system är sin egen applikation, och kan således i sin egen rätt följa tolvfaktor-modellen.
* Multipla applikationer som delar samma kod bryter mot tolvfaktor-modellen. Lösningen är att flytta ut delad kod till bibliotek som kan inkluderas genom [beroenden](./dependencies).

Det finns alltid bara en kodbas per applikation, men det kommer bli många produktionssättningar av samma applikation. En *produktionssättning* är en körbar instans av applikationen. Det kan exempelvis vara en produktionssajt, eller en eller flera sajter för acceptanstestning. Dessutom har ofta respektive utvecklare en kopia av applikationen som kan köras lokalt i den egna utvecklingsmiljön, vilket också räknas som en produktionssättning.

Kodbasen är densamma för samtliga produktionssättningar, även om olika versioner kan vara gällande för varje enskild produktionsssättning. Till exempel, en utvecklare kan ha kodändringar som fortfarande inte har lagts över för acceptanstestning; acceptansmiljön kan ha kodändringar som ännu inte lagts över till produktion. Men alla delar samma kodbas, vilket gör dem identifierbara som olika produktionssättningar av samma applikation.
