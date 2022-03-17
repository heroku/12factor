## VIII. Concurrency
### Škálovanie pomocou modelu procesov

Každý počítačový program je po spustení reprezentovaný jedným alebo viac procesmi. Webové aplikácie sa objavujú v rôznych formách vykonávania procesov.  Napríklad, PHP procesy bežia ako podprocesy Apachu, spustené na požiadanie podľa objemu požiadaviek.  Java procesy prevzali opačný prístup, kde JVM poskytuje jeden masívny nadproces, ktorý si vyhradí veľké množstvo systémových prostriedkov (CPU a pamäte) pri spustení a súbežnosť spravuje interne cez vlákna.  V obidvoch prípadoch sú bežiace procesy len minimálne viditeľné pre developera aplikácie.

![Škálovanie je vyjadrené bežiacimi procesmi, rôznorodosť funkcionality je vyjadrená typmi procesov.](/images/process-types.png)

**V dvanásť faktorovej aplikácii sú procesy prvotriednymi obyvateľmi.**  Procesy v dvanásť faktorovej aplikácii preberajú správanie z [modelu unix procesov pre démony služieb](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/).  Použitím tohoto modelu, developer môže navrhnúť svoju aplikáciu tak, aby rôznu prácu vykonávali rôzne *typy procesov*.  Napríklad, HTTP požiadavky môže spravovať webový proces, a dlho bežiace úlohy na pozadí môže spravovať worker proces.

Toto nevylučuje, že si individuálne procesy nemôžu spravovať svoj interný multiplexing cez vlákna vnútri VM alebo interpretra, alebo async/event model v nástrojoch ako [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/), alebo [Node.js](http://nodejs.org/).  Keďže individuálne VM môže rásť len obmedzene (vertikálne škálovanie), aplikáciu musí byť tiež schopná sa rozšíriť na viacero procesov bežiacich na viacerých fyzických strojoch.

Procesový model vyniká, keď príde čas rozširovania.  [Nezdieľaná, horizontálne particionovateľná podstata procesov dvanásť faktorovej aplikácie](./processes) znamená, že pridanie väčšej súbežnosti je jednoduchá a spoľahlivá operácia. Súhrn typov procesov a počtu procesov každého typu sa nazýva *process formation*.

Procesty dvanásť faktorovej aplikácie [by sa nikdy nemali démonizovať](http://dustin.github.com/2010/02/28/running-processes.html) alebo zapisovať PID súbory.  Namiesto toho by sa mali spoliehať na manažéra procesov operačného systému (ako napr. [systemd](https://www.freedesktop.org/wiki/Software/systemd/), distribuovaného manažéra procesov na cloudovej platforme, alebo nástroji ako [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) počas vývoja) na spravovanie [výstupných streamov](./logs), reakcie na spadnuté procesy, a spravovanie userom iniciovaných reštartov a zastavení.
