## VIII. Souběh
### Škálujte do šířky použitím proces modelu.

Každý počítačový program se po spuštění prezentuje jako jeden nebo více procesů. Webové aplikace mají různé formy vykonávání procesů. Například PHP procesy běží jako potomci Apache procesu, spouštěné na požádání dle množství požadavků. Java procesy mají opačný přístup, kde JVM poskytuje jeden masivní super proces, který si po spuštění vyhradí velké množství systémovývh požadavků (CPU a paměti) a souběh si řídí interně pomocí vláken. V obou případech jsou běžící procesy jen málo viditelné pro vývojáře aplikace.

![Škálování je vyjádřeno běžícími procesy, různorodost funkcionality pak typy procesů.](/images/process-types.png)

**Ve twelve-factor aplikaci jsou procesy prominentními občany.** Procesy twelve-factor aplikace čerpají inspiraci z [unixového proces modelu pro démony služeb](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/). Použitím tohoto modelu může vývojář navrhnout aplikaci tak, aby různou práci vykonávaly různé typy procesů. Například HTTP požadavky může obsluhovat webový proces a dlouho běžící procesy na pozadí může obstarat worker proces.

To nevylučuje, že si jednotlivé procesy nemohou spravovat interní multiplexování přes vlákna nebo pomocí async/event modelu, jako je tomu v [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/) nebo [Node.js](http://nodejs.org/). Jednotlivé VM však mohou růst jen omezeně (vertikální škálování), aplikace tedy musí být schopná i běhu v několika procesech na více fyzických strojích.

Proces model obzvlášť vyniká, když přijde čas na škálování. [Nesdílená a horizontálně dělitelná podstata procesů twelve-factor aplikace](./processes) znamená, že přidání větší souběžnosti je jednoduchá a spolehlivá operace. Sada typu procesů a množství procesů každého typu se nazývá *formace procesů*.

Procesy twelve-factor aplikace by [nikdy neměly démonizovat](http://dustin.github.com/2010/02/28/running-processes.html) nebo zapisovat PID soubory. Namísto toho by se měly spoléhat na správce procesů operačního systému (jako je například [systemd](https://www.freedesktop.org/wiki/Software/systemd/), správce distribuovaných procesů na cloudové platformě nebo nástroje typu [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) během vývoje), který obstará [výstupní proudy](./logs), reakci na havarované procesy a obsluhu uživatelem vyvolaných restartů a zastavení.
