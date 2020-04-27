Background
==========

Chi ha scritto questo documento è stato coinvolto direttamente nella realizzazione e nel deployment di centinaia di applicazioni, e ha indirettamente assistito allo sviluppo, le operazioni e lo scaling di centinaia (o migliaia) di app tramite il proprio lavoro sulla piattaforma [Heroku](http://www.heroku.com/).

Questo documento riassume tutta quella che è stata la nostra esperienza, basata sull'osservazione di un grande numero di applicazioni SaaS. Si tratta di una "triangolazione" di pratiche di sviluppo ideali (con una particolare attenzione alla crescita organica dell'app nel tempo), la collaborazione dinamica nel corso del tempo tra gli sviluppatori sulla codebase e la necessità di evitare i costi di [software erosion](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/).

La nostra motivazione è di far crescere la consapevolezza intorno ad alcuni problemi sistemici che abbiamo scoperto nello sviluppo di applicazioni moderne, cercando di fornire un vocabolario condiviso per la discussione di tali problemi. Oltre, ovviamente, a offrire delle soluzioni concettuali a queste situazioni (senza però tralasciare il fattore tecnologia). Questo format si rifà ai libri di Martin Fowler *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* e *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)*.
