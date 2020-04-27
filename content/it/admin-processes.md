## XII. Processi di Amministrazione
### Esegui i task di amministrazione come processi una tantum

La "[process formation](./concurrency)" è l'array dei processi che vengono usati durante le normali operazioni dell'applicazione (per esempio, la gestione delle richieste web). Non è tutto, però: ci sono dei task che lo sviluppatore può voler eseguire, una volta ogni tanto. Per esempio:

* Esecuzione delle migration del database (esempi: `manage.py migrate` in Django, `rake db:migrate` in Rails).
* Esecuzione di una console (una [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) in modo tale da avviare del codice arbitrariamente o analizzare alcuni aspetti dell'applicazione specifici. Molti linguaggi prevedono una REPL, in genere avviando l'interprete senza opzioni e argomenti aggiuntivi (esempi: `python` o `perl`) o in alcuni casi eseguibile con un comando separato (esempi: `irb` per Ruby, `rails console` per Rails).
* Esecuzione one-time di alcuni script specifici (esempio: `php scripts/fix_bad_records.php`).

Tali processi dovrebbero essere avviati in un ambiente identico a quello in cui [lavorano gli altri](./processes) nel contesto dell'applicazione. Dovrebbero essere eseguiti quindi su una specifica [release](./build-release-run), partendo dalla stessa [codebase](./codebase) e impostazioni di [configurazione](./config). Il codice per l'amministrazione dovrebbe inoltre essere incluso nel codice dell'applicazione, in modo tale da evitare qualsiasi problema di sincronizzazione.

La stessa tecnica di [isolamento delle dipendenze](./dependencies) dovrebbe poter essere usata allo stesso modo su tutti i processi. Per esempio, se il processo web di Ruby può usare il comando `bundle exec thin start`, una migration del database dovrebbe poter usare `bundle exec rake db:migrate` senza problemi. Allo stesso modo, un programma Python che usa Virtualenv dovrebbe usare il `bin/python` per eseguire sia i server Tornado che processi di amministrazione.

La metodologia twelve-factor favorisce molto tutti quei linguaggi che offrono una shell REPL out of the box, rendendo quindi semplice l'esecuzione di script una tantum. In un deployment locale, gli sviluppatori possono invocare questi processi speciali tramite un semplice comando diretto. In un ambiente di produzione, invece, gli sviluppatori possono raggiungere lo stesso obiettivo tramite SSH o un qualsiasi altro sistema di esecuzione di comandi remoto.
