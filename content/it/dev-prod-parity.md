## X. Parità tra Sviluppo e Produzione
### Mantieni lo sviluppo, staging e produzione simili il più possibile

Storicamente, ci sono sempre state differenze sostanziali tra gli ambienti di sviluppo (lo sviluppatore che effettua delle modifiche live a un [deployment](./codebase) in locale) e quello di produzione (un deployment in esecuzione raggiungibile dagli utenti finali). Differenze (o gap) che si possono raggruppare in tre categorie:

* **Tempo:** uno sviluppatore può lavorare sul codice per giorni, settimane o mesi prima di poter andare in produzione;
* **Personale**: gli sviluppatori scrivono il codice, gli ops effettuano il deployment;
* **Strumenti**: gli sviluppatori potrebbero usare uno stack quale Nginx, SQLite e OS X, mentre in produzione per il deployment verrebbero installati Apache, MySQL e Linux.

**Un'applicazione twelve-factor è progettata per il [rilascio continuo](http://avc.com/2011/02/continuous-deployment/), tenendo così queste differenze al minimo possibile.** A proposito di queste tre tipologie di differenze appena viste:

* Rendi la differenze temporali minime: cerca di scrivere (o far scrivere) del codice da rilasciare nel giro di poche ore, se non minuti;
* Rendi le differenze a livello di personale minime: fai in modo che gli sviluppatori siano coinvolti anche nella fase di deploy, per permettere loro di osservare il comportamento di ciò che hanno scritto anche in produzione;
* Rendi le differenze a livello di strumenti minime: mantieni gli ambienti di lavoro il più simile possibile;

Riassumendo tutto in una tabella:

<table>
  <tr>
    <th></th>
    <th>App Tradizionale</th>
    <th>App Twelve-factor</th>
  </tr>
  <tr>
    <th>Tempo tra i Deployment</th>
    <td>Settimane</td>
    <td>Ore</td>
  </tr>
  <tr>
    <th>Sviluppatori e Ops</th>
    <td>Sono diversi</td>
    <td>Sono gli stessi</td>
  </tr>
  <tr>
    <th>Sviluppo e Produzione</th>
    <td>Divergenti</td>
    <td>Il più simili possibile</td>
  </tr>
</table>

I [backing service](./backing-services), come il database dell'applicazione o la cache, sono una delle aree in cui la parità degli ambienti è molto importante. Molti linguaggi offrono delle librerie che facilitano l'accesso a questi servizi, tra cui anche degli adattatori per questi tipi di servizi. Eccone alcuni:

<table>
  <tr>
    <th>Tipologia</th>
    <th>Linguaggio</th>
    <th>Libreria</th>
    <th>Adattatore</th>
  </tr>
  <tr>
    <td>Database</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Code</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Gli sviluppatori, inoltre, trovano utile usare dei servizi "leggeri" in fase di sviluppo, passando quindi a qualcosa di più serio e robusto in produzione. Per esempio, usando SQLite localmente e PostgreSQL in produzione. Ancora, un sistema di cache in locale in fase di sviluppo e Memcached in produzione.

**Lo sviluppatore twelve-factor "resiste" a questa necessità**, anche se gli adapter ci sono e funzionano in modo tale da astrarre in modo sufficiente tutte le differenze nella gestione. Nulla impedisce, infatti, a qualche altra incompatibilità di uscire allo scoperto quando meno ce lo si aspetta, soprattutto se in ambiente di sviluppo funziona tutto e poi, magari, in produzione i test non vengono superati. Il costo di questa differenza può risultare abbastanza alto, soprattutto in situazioni in cui si effettua il rilascio continuo.

Rispetto al passato, usare dei sistemi "light" in locale è una prassi poco convincente. Si pensi al fatto che alcuni servizi moderni come Memcached o PostgreSQL si possono installare e usare senza difficoltà tramite alcuni sistemi di packaging come [Homebrew](http://mxcl.github.com/homebrew/) e [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  In alternativa, esistono anche alcuni tool di provisioning come [Chef](http://www.opscode.com/chef/) e [Puppet](http://docs.puppetlabs.com/), che combinati con sistemi di ambienti virtuali come [Vagrant](http://vagrantup.com/) permettono agli sviluppatori di riprodurre in locale delle macchine molto simili, se non identiche, a quelle in produzione. Ne risente quindi positivamente il costo di deployment.

Tutto questo, sia chiaro, non rende gli adapter meno utili: grazie ad essi infatti il porting verso nuovi servizi, in un secondo momento, rimane un processo indolore. Nonostante questo, comunque, rimane scontato che sarebbe buona norma usare uno stesso backing service su tutti i deployment di un'applicazione.
