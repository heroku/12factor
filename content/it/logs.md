## XI. Log
### Tratta i log come stream di eventi

I *log* offrono una maggiore chiarezza riguardo un comportamento di un'app in esecuzione. In ambienti basati su server, questi sono tendenzialmente scritti su un file su disco (logfile). A ogni modo, è solo un formato.

Un log può essere definito infatti come uno [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) di eventi aggregati e ordinati cronologicamente. Tali eventi vengono presi da tutti i vari output stream presenti di tutti i processi attivi, oltre che dai vari backing service. Nella loro forma grezza, i log si presentano come un file di testo con un evento per ogni linea (con le dovute eccezioni). Non hanno un inizio o una fine ben definiti, ma un continuo di informazioni fin quando l'applicazione è al lavoro.

**Un'applicazione twelve-factor non dovrebbe preoccuparsi di lavorare con il proprio output stream.** Non dovrebbe lavorare o comunque gestire i vari logfile. Dovrebbe, invece, fare in modo che ogni processo si occupi di scrivere il proprio stream di eventi su "`stdout`". Durante lo sviluppo in locale, quindi, lo sviluppatore potrà visionare lo stream in modo completo direttamente dal terminale, per capire meglio il comportamento della sua applicazione.

In staging o in produzione, invece, ogni stream viene "preso" dall'ambiente di esecuzione ed elaborato insieme a tutti gli altri stream dell'applicazione, quindi indirizzato verso una o più "destinazioni" finali per la visualizzazione e archiviazione a lungo termine. Queste "destinazioni" non sono visibili o configurabili, ma vengono gestite totalmente dall'ambiente di esecuzione. Per questi scopi esistono strumenti come [Logplex](https://github.com/heroku/logplex) e [Fluentd](https://github.com/fluent/fluentd)).

Uno stream di eventi di un'applicazione può essere quindi indirizzato verso un file, o visionato in tempo reale su un terminale. Ancora, lo stream può essere inviato a un sistema di analisi e indicizzazione di log, come [Splunk](http://www.splunk.com/), oppure a un sistema di memorizzazione general-purpose come [Hadoop/Hive](http://hive.apache.org/). Questi sistemi hanno ottimi tool per effettuare un lavoro di analisi del comportamento dell'applicazione, come per esempio:

* Ricerca di specifici eventi nel passato;
* Grafici per rappresentare dei trend (es. richieste per minuto);
* Attivazione di alert specifici in base a regole definite dall'utente (es. alert avverte l'amministratore se il rate di eventi al minuto sale oltre una certa soglia);
