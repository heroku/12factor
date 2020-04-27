## VII. Binding delle Porte
### Esporta i servizi tramite binding delle porte

Normalmente, le applicazioni web sono qualcosa di eseguito all'interno di un server web, che fa da contenitore. Per esempio, le applicazioni PHP possono venire eseguite come modulo all'interno di [Apache HTTPD](http://httpd.apache.org/), così come un'applicazione Java viene eseguita in [Tomcat](http://tomcat.apache.org/).

**L'applicazione twelve-factor** è completamente self-contained (contenuta in se stessa) e non si affida a un altro servizio (come appunto un webserver) nell'ambiente di esecuzione. La web app **esporta HTTP come un servizio effettuando un binding specifico a una porta**, rimanendo in ascolto su tale porta per le richieste in entrata.

In un ambiente di sviluppo locale, lo sviluppatore accede al servizio tramite un URL come `http://localhost:5000/`. In fase di deployment, invece, un layer di routing gestisce le richieste da un hostname pubblico alla specifica porta desiderata.

Tale funzionalità viene, frequentemente, implementata tramite [dichiarazione delle opportune dipendenze](./dependencies), aggiungendo una libreria webserver all'applicazionecome [Tornado](http://www.tornadoweb.org/) per Python, [Thin](http://code.macournoyer.com/thin/) per Ruby, o [Jetty](http://www.eclipse.org/jetty/) per Java e altri linguaggi basati su JVM. L'evento, nella sua interezza, "ha luogo" nello spazio dell'utente, nel codice dell'applicazione.

HTTP non è l'unico servizio che può essere esportato tramite port binding. In realtà quasi ogni tipo di software può essere eseguito tramite uno specifico binding tra processo e porta dedicata. Alcuni esempi includono [ejabberd](http://www.ejabberd.im/) (a tal proposito, leggere su [XMPP](http://xmpp.org/)), e [Redis](http://redis.io/) (a proposito del [protoccolo Redis](http://redis.io/topics/protocol)).

Nota inoltre che usare il binding delle porte permette a un'applicazione di diventare il backing service di un'altra applicazione, tramite un URL dedicato o comunque come una risorsa la cui configurazione si può gestire tramite appositi file di [config](./config) dell'app consumer del servizio.
