## IX. Zahoditeľnosť
### Maximalizácia robustnosti rýchlym štartom a vhodným vypnutím

**[Procesy](./processes) dvanásť faktorovej aplikácie sú *zahoditeľné*, čo znamená, že sa kedykoľvek dajú spustiť alebo zastaviť.**  Umožňuje to elastické škálovanie, rýchly vývoj [kódu](./codebase) alebo zmeny v [konfigurácii](./config), a robustnosť produkčných nasadení.

Procesy by sa mali snažiť **minimalizovať čas spustenia**.  Ideálne, procesu zaberie len pár sekúnd od spustenia príkazu do kým je proces pripravený prijímať požiadavky alebo úlohy.  Krátky čas spustenia poskytuje väčšiu agility pre [release](./build-release-run) proces a škálovanie; a pomáha tiež robustnosti, lebo manažér procesov, môže jednoduchšie presúvať procesy na nové fyzické stroje v prípade potreby.

Procesy **sa vhodne vypnú po prijatí signálu [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM)** od správcu procesov.  Pre webový proces, vhodné vypnutie znamená, že prestane počúvať na porte (teda začne odmietať nové požiadavky), aktuálne bežiace požiadaviek nechá dobehnúť a vypne sa.  V tomto modeli predpokladáme, že HTTP požiadavky sú krátke (nie viac ako pár sekúnd). V prípade dlhotrvajúcich spojení by sa mal klient vedieť po strate spojenia znova pripojiť.

Pre proces workera, je vhodné vypnutie dosiahnuté vrátením aktuálnej úlohy do pracovnej fronty. For a worker process, graceful shutdown is achieved by returning the current job to the work queue.  Napríklad pri [RabbitMQ](http://www.rabbitmq.com/) worker môže poslať [`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack); pri [Beanstalkd](https://beanstalkd.github.io) sa úloha vrátiť do fronty keď sa worker odpojí. Systéme postavené na zamkýnaní, ako napr. [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) musia uvoľniť zamknutie pre záznam svojej úlohy.  V tomto modeli predpokladáme, že všetky úlohy sú [opakovateľné](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29), čo sa zvyčajne dosiahne obalením výsledkov do transakcie alebo spravením operácie  [idempotentnou](http://en.wikipedia.org/wiki/Idempotence).

Procesy by mali byť tiež **robustné proti náhlej smrti**, v prípade zlyhanie hardvéru.  Aj keď je toto vyskytuje oveľa menej často ako vypnutie signálom `SIGTERM`, môže sa to stať.  Odporúčaný prístup je použitie robustnej fronty, ako napr. Beanstalkd, ktorá vracia úlohy do fronty pri odpojení klienta alebo vypršaní časového limitu.  V každom prípade, dvanásť faktorová aplikácia je navrhnutá, aby zvládla neočakávané, nevhodné ukončenia. [Crash-only design](http://lwn.net/Articles/191059/) tento koncept vedie k [logickým záverom](http://docs.couchdb.org/en/latest/intro/overview.html).


