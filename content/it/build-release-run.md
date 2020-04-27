## V. Build, release, esecuzione
### Separare in modo netto lo stadio di build dall'esecuzione

Una [codebase](./codebase) viene "trasformata" in deployment attraverso tre fasi:

* la fase di *build*, che converte il codice del repo in una build "eseguibile". Usando una certa versione del codice, a una specifica commit, nella fase di build vengono compilati i binari con gli asset appropriati includendo anche le eventuali dipendenze;
* la fase di *release* prende la build prodotta nella fase precedente e la combina con l'attuale insieme di impostazioni di configurazione del deployment specifico. La *release* risultante contiene sia la build che le impostazioni;
* la fase di *esecuzione* (conosciuta anche come "runtime") vede l'applicazione in esecuzione nell'ambiente di destinazione, attraverso l'avvio di processi della release scelta;

![Il codice diventa build, che combinata con le impostazioni diventa release.](/images/release.png)

**Un'app twelve-factor definisce una separazione netta tra build, release ed esecuzione.** Per esempio, è impossibile effettuare dei cambiamenti del codice a runtime, dato che non c'è modo di propagare queste modifiche all'"indietro", verso la fase di build.

I tool di deployment offrono tipicamente dei tool di gestione delle release, in particolare alcuni dedicati a un rollback verso una release precedente. Per esempio, [Capistrano](https://github.com/capistrano/capistrano/wiki) memorizza le varie release in una sotto-directory chiamata `releases`, in cui la release attuale non è che un symlink verso la directory della release attuale. Il comando di rollback permette di tornare indietro a una certa release velocemente.

Ogni release dovrebbe inoltre possedere un ID univoco di rilascio, come per esempio un timestamp (es. `2011-04-06-20:32:17`) o un numero incrementale (es. `v100`). In un certo senso, la creazione di una release è una procedura "a senso unico" e una certa release non può essere modificata dopo la sua creazione. Qualsiasi cambiamento deve quindi prevedere una nuova release.

Una fase di build è sempre avviata da uno sviluppatore, non appena il codice viene modificato. Al contrario, l'esecuzione può essere anche gestita in modo automatico (si pensi al riavvio del server oppure a un crash con successivo riavvio del processo). A ogni modo, una volta in esecuzione, la regola aurea è di evitare il più possibile (se non del tutto) modifiche che potrebbero rompere qualche equilibrio. Magari nel bel mezzo della notte, quando non c'è nessuno disponibile. La fase di build può essere sicuramente più "faticosa", comunque, visto che possono verificarsi degli errori da risolvere prima di proseguire.
