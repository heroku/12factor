## VI. Processi
### Esegui l'applicazione come uno o più processi stateless

L'app viene eseguita nell'ambiente di esecuzione come uno o più *processi*.

Nel caso più semplice, il codice non è che uno script stand-alone, l'ambiente di esecuzione è il laptop dello sviluppatore e il processo viene lanciato tramite linea di comando (per esempio, `python my_script.py`). Tuttavia, il deployment in produzione di un'app sofisticata potrebbe usare più [tipologie di processo, istanziate in zero o più processi](./concurrency).

***I processi twelve-factor sono stateless (senza stato) e [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Tutti i dati che devono persistere devono essere memorizzati in un [backing service](./backing-services), come per esempio un database.

Lo spazio di memoria o il filesystem di un processo possono essere visti come una "singola transazione" breve. Come il download di un file, le successive operazioni su di esso e infine la memorizzazione del risultato sul database. Un'app twelve-factor non assume mai che qualsiasi cosa messa in cache sarà poi disponibile successivamente -- con tanti processi in esecuzione, le possibilità che una certa richiesta venga servita da un altro processo sono molto alte. Comunque, anche nel caso in cui si usi un singolo processo in esecuzione, un riavvio (dovuto a deployment di codice, cambio di file di configurazione e così via) resetterà lo stato in cui si trova il sistema.

I packager di asset (come [Jammit](http://documentcloud.github.com/jammit/) o [django-compressor](http://django-compressor.readthedocs.org/)) usano il filesystem come cache per gli asset compilati. Un'app twelve-factor vuole questa compilazione durante la [fase di build](./build-release-run), così come [l'asset pipeline di Rails](http://guides.rubyonrails.org/asset_pipeline.html), e non a runtime.

Alcuni sistemi web si basano inoltre sulle cosiddette ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- che consistono nel mettere in cache i dati di sessione dell'utente presenti nella memoria del processo, aspettandosi future richieste identiche dallo stesso visitatore, venendo quindi reindirizzati allo stesso processo. Le sticky session sono una palese violazione della metodologia twelve-factor. I dati di sessione sono un ottimo candidato per quei sistemi di datastore che offrono la feature di scadenza, come [Memcached](http://memcached.org/) o [Redis](http://redis.io/).
