## V. Bygga, släppa, köra (Build, deploy, run)
### Strikt separation mellan bygg- och körstadie

En [kodbas](./codebase) omvandlas till en produkt (avsedd för annat än utveckling) genom tre stadier:

* *Byggstadiet* är en transformering som omvandlar ett kod-repo till ett exekverbart paket som kallas för ett *bygge* (eng. "build"). Byggprocessen använder sig av en specifik incheckning/version av kodbasen, hämtar tredjepartskomponenter som definierats som [beroenden](./dependencies) och kompilerar binära filer och resurser.
* *Releasestadiet* tar det som producerats vid byggstadiet och kombinerar det med den aktuella kodsläppets [konfiguration](./config). Resultatet (kallad en *produktionssättning*/*release*/*kodsläpp*) innehåller både byggpaketet och konfigurationen och är redo för omedelbar exekvering i den miljö som den är avsedd för.
* *Körstadiet* kör applikationen i dess miljö, genom att sätta igång de [applikationsprocesser](./processes) som gäller för det aktuella kodsläppet.

![Kod blir ett bygge, som kombineras med konfiguration för att bli ett kodsläpp.](/images/release.png)

**Tolvfaktor-applikationen använder en strikt separation mellan byggstadie, release och körstadie.**  Till exempel är det ej möjligt att göra kodändringar under pågående körning, eftersom det inte finns något sätt att skicka ut dessa ändringar tillbaka till byggstadiet.

Metoder för kodsläpp erbjuder vanligtvis någon form av verktyg, inte minst för förmågan att kunna rulla tillbaka till en tidigare version. Till exempel, releaseverktyget [Capistrano](https://github.com/capistrano/capistrano/wiki) lagrar varje kodsläpp i separata kataloger under en underkatalog kallad `releases`, där den senaste releasen är en länk till det aktuella kodsläppets katalog. Dess tillbakarullningskommando (`rollback`) gör det lätt att snabb ändra versionen genom att peka om till katalogen för ett tidigare kodsläpp.

Varje kodsläpp bör alltid ha ett unikt ID, exempelvis tidspunkten för release (ex. `2011-04-06-20:32:17`) eller ett inkrementellt ökat nummer (ex. `v100`). Kodsläpp är alltid ersättande och kan inte ändras när den väl har skapats. Alla ändringar måste skapa ett nytt kodsläpp, med ett eget ID.

Byggprocessen initieras av applikationens utvecklare närhelst ny kod skickas ut. Körexekvering däremot kan hända dels automatiskt vid ex. en serveromstart, dels vid en eventuell programkrasch som startar om processhanteraren. Därför är det viktigt att körstadiet har så få rörliga delar som möjligt, eftersom problem som förhindrar en applikation från att köra kan orsaka att ett avbrott uppstår mitt i natten när ingen utvecklare finns tillgänglig. Byggstadiet kan vara mer komplext eftersom fel alltid sker i förgrunden för den utvecklare som genomför byggprocessen.
