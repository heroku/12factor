Introduzione
============

Nell'era moderna, il software viene fornito sempre più di frequente come servizio (delivered as a service): si parla di *web app* o *software as a service* (SaaS). La **twelve-factor app** è una metodologia di sviluppo orientata alla costruzione di applicazioni software-as-a-service che:

* Seguono un formato **dichiarativo** per l'automazione della configurazione, minimizzando tempi e costi di ingresso per ogni sviluppatore che si aggiunge al progetto;
* **Si interfacciano in modo pulito** con il sistema operativo sottostante, in modo tale da offrire la **massima portabilità** sui vari ambienti di esecuzione;
* Sono **adatte allo sviluppo** sulle più recenti **cloud platform**, ovviando alla necessità di server e amministrazioni di sistema;
* **Minimizzano la divergenza** tra sviluppo e produzione, permettendo il **continuous deployment** per una massima "agilità";
* Possono **scalare significativamente** senza troppi cambiamenti ai tool, all'architettura e al processo di sviluppo;

La metodologia twelve-factor può essere applicata a ogni software, scritto in qualsiasi linguaggio di programmazione, che fa uso di una serie di servizi come database, code, cache e così via.
