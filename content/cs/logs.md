## XI. Logy
### S logy zacházejte jako s proudy událostí.

*Logy* poskytují náhled na chování běžící aplikace. V prostředí serveru se obvykle zapisují do souboru na disku ("logfile"), ale to je jen výstupní formát.

Logy jsou [proudy](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) agregovaných a časově seřazených událostí, posbíraných z výstupních proudů všech běžících procesů a podpůrných služeb. Logy jsou ve své syrové formě typicky v textovém formátu s jednou událostí na řádek (avšak výpis výjimky může zabírat i více řádků). Logy nemají žádný pevný začátek ani konec, ale plynule proudí po celou dobu běhu aplikace.

**Twelve-factor aplikace se nikdy nestará o routování anebo ukládání svého výstupního proudu.** Neměla by se ani pokoušet zapisovat nebo si spravovat své log soubory. Místo toho zapisuje každy její běžící proces nebufferovaně na `stdout`. Během lokálního vývoje vidí vývojář proud událostí ve svém terminálu a sleduje chování aplikace.

V testovacím a produkčním prostředí je proud každého procesu zachycen běhovým prostředím, spojen s ostatnímy proudy aplikace a nasměrován do jedné nebo více cílových destinací, určených pro zobrazení nebo k dlouhodobé archivaci logů. Tyto cílové destinace nejsou pro aplikaci viditelné ani konfigurovatelné, jejich správa je plně pod kontrolou běhového prostředí. Open source směrovače logů (jako jsou [Logplex](https://github.com/heroku/logplex) a [Fluentd](https://github.com/fluent/fluentd) slouží přesně k těmto účelům.

Proudy událostí aplikace mohou být směrovány do souboru, nebo sledovány v reálněm čase přes tail v terminálu. Důležitější však je, že tyto proudy mohou být zaslány do systému na indexaci a analýzu logů, jako je například [Splunk](http://www.splunk.com/) anebo do univerzálnějších systémů pro datové sklady jako je [Hadoop/Hive](http://hive.apache.org/). Tyto systémy jsou flexibilní a velmi mocné, chceme-li zkoumát chování aplikace v průběhu času, například při:

* Hledání konkrétních událostí v minulosti.
* Velkoplošném vykreslení trendů (požadavky za minutu) do grafu.
* Aktivním alertingu dle uživatelsky definovaných heuristik (například pokud množství chyb za minutu přesáhne stanovenou hranici).
