## V. Build, deploy, run (Bygga, produktionssätta, köra)
### Strikt separation mellan bygg- och körstadie

En [kodbas](./codebase) omvandlas till en produkt (avsedd för annat än utveckling) genom tre stadier:

* *Byggstadiet* är en transformering som omvandlar ett kod-repo till ett exekverbart paket som kallas för ett *bygge* (eng. "build"). Byggprocessen använder sig av den version av koden som använts vid en viss uppladdning, hämtar tredjepartskomponenter som definierats som [beroenden](./dependencies) och kompilerar binära filer och resurser.
* *Produktionssättningsstadiet* tar det som producerats vid byggstadiet och kombinerar det med den aktuella produktionssättningens [konfiguration](./config). Resultatet (kallad en *release*/*kodsläpp*) innehåller både byggpaketet och konfigurationen och är redo för omedelbar exekvering i den miljö som den är avsedd för.
* *Körstadiet* kör applikationen i dess miljö, genom att sätta igång de [applikationsprocesser](./processes) som gäller för den aktuella produktionssättningen.

![Kod blir ett bygge, som kombineras med konfiguration för att bli en produktionssättning.](/images/release.png)

**Tolvfaktor-applikationen använder en strikt separation mellan byggstadie, produktionssättningsstadie och körstadie.**  Till exempel är det ej möjligt att göra kodändringar under pågående körning, eftersom det inte finns något sätt att skicka ut dessa ändringar tillbaka till byggstadiet.

Metoder för produktionssättning erbjuder vanligtvis någon form av verktyg för kodsläpp, inte minst för förmågan att kunna rulla tillbaka till en tidigare version. Till exempel, produktionssättningsverktyget [Capistrano](https://github.com/capistrano/capistrano/wiki) lagrar varje kodsläpp i separata kataloger under en underkatalog kallad `releases`, där den nuvarande releasen är en länk till det aktuella kodsläppets katalog. Dess tillbakarullningskommando (`rollback`) gör det lätt att snabb ändra versionen genom att peka om till katalogen för ett tidigare kodsläpp.

Varje produktionssättning bör alltid ha ett unikt ID, exempelvis tidspunkten för produktionssättningen (ex. `2011-04-06-20:32:17`) eller ett inkrementellt ökat nummer (ex. `v100`). Produktionssättningar är strikt ersättande och kan inte ändras när den väl har skapats. Alla ändringar måste skapa en ny produktionssättning, med ett eget ID.

Byggprocessen initieras av applikationens utvecklare närhelst ny kod skickas ut. Körexekvering däremot kan hända dels automatiskt vid ex. en serveromstart, dels vid en eventuell programkrasch som startar om processhanteraren. Därför är det viktigt att körstadiet har så få rörliga delar som möjligt, eftersom problem som förhindrar en applikation från att köra kan orsaka att ett avbrott uppstår mitt i natten när ingen utvecklare finns tillgänglig. Byggstadiet kan vara mer komplext eftersom fel alltid sker i förgrunden för den utvecklare som genomför byggprocessen.
