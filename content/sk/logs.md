## XI. Logs
### Logy sú prúdy udalostí

*Logy* poskytujú náhľad do správania sa bežiacej aplikácie. V prostredí serverov sa zvyčajne zapisujú do súboru na disk (tzv. "logfile"); ale toto je len výstupný formát.

Logy sú [prúd](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) agregovaných, časovo zoradených udalostí pozbierané z výstupných prúdov všetkých bežiacich procesov a podporných služieb.  Logy sú vo svojej surovej forme zvyčajne v textovom formáte s jednou udalosťou na riadok (thougaj keď výpisy výnimiek môžu zaberať viac riadkov).  Logy nemajú pevný začiatok ani koniec, ale plynule prúdia počas behu aplikácie.

**Dvanásť faktorová aplikácia sa nikdy nestará o routovanie alebo ukladanie svojho výstupného prúdu.**  Nemala by sa pokúšať zapisovať alebo spravovať logsúbory. Namiesto toho každý bežiaci proces zapisuje svoje udalosti nebufferované do `stdout`.  Počas lokálneho vývoja vývojár vidí tento prúd udalostí vo svojom termináli a sleduje správanie aplikácie.

V testovacom a produkčnom prostredí, sa prúd každého procesu zachytáva exekučné prostredie, spája s ostatnými prúdmi z aplikácie a presmeruje do cieľovej destinácie na prehliadanie a dlhodobejšie uloženie.  Tieto destinácie nie sú konfigurovateľné aplikáciou, ale namiesto toho sú kompletne spravované exekučným prostredím.  Open-sourcové smerovače logov (ako napr. [Logplex](https://github.com/heroku/logplex) a [Fluentd](https://github.com/fluent/fluentd)) sú vytvorené na tento účel.

Prúd udalostí z aplikácie sa dá presmerovať do súboru, alebo sledovať priamo v termináli. Čo je ešte dôležitejšie je, že tento prúd sa dá poslať do systému na indexovanie a analýzu logov ako napr. [Splunk](http://www.splunk.com/), alebo univerzálne uložiská ako [Hadoop/Hive](http://hive.apache.org/).  Tieto systému sú mocné a flexibilné na skúmanie správania aplikácie v čase, vrátane:

* Nájdenie špecifických udalostí v minulosti.
* Veľkoplošné grafovanie trendov (ako napr. počet požiadaviek za minútu).
* Aktívne upozorňovanie podľa zadaných pravidiel (napríklad keď množstvo chýb za minútu presiahne určitú hranicu).
