## IX. Zahoditelnost
### Maximalizujte robustnost pomocí rychlého spouštění a korektního vypnutí.


**[Procesy](./processes) twelve-factor aplikace jsou *zahoditelné*, to znamená, že mohou být kdykoliv spuštěny nebo vypnuty.** Usnadňuje to elastické škálování, rychlé nasazování [kódu](./codebase), změny [konfigurace](./config) a zvyšuje se robustnost celého produkčního nasazení.

Procesy by se měly snažit **minimalizovat čas spuštění**. Ideálně by procesu mělo zabrat jen pár sekund od spuštění příkazu, do doby, kdy je připraven přijímat požadavky nebo úlohy. Krátký čas spuštění přináší větší obratnost pro procesy zajišťující [nasazení](./build-release-run) a škálování. Napomáhá také celkové robustnosti, protože správce procesů může v případě potřeby snadno přesouvat procesy na nové fyzické stroje.

Procesy **se korektně ukončí po přijetí signálu [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM)** od správce procesů. Pro webový proces znamená korektní ukončení to, že přestane naslouchat na příslušném portu (tedy začne odmítat nové požadavky), aktuálně běžící požadavky zpracuje a pak se vypne. V tomto modelu předpokládáme, že HTTP požadavky jsou poměrně krátké (ne delší než pár sekund). V případě dlouho trvajícího spojení by se měl klient umět znovu sám připojit, dojde-li ke ztrátě spojení.

Pro proces typu worker je korektní ukončení dosaženo vrácením aktuální úlohy zpět do pracovní fronty. Například v [RabbitMQ](http://www.rabbitmq.com/) může worker poslat [`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack), u [Beanstalkd](https://beanstalkd.github.io) se úloha vrátí do fronty automaticky, pokud se worker odpojí. Systémy postavené na zamykání, jako například [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) musí uvolnit zámek pro záznam své úlohy. V tomto modelu předpokládáme, že všechny úlohy jsou [opakovatelné](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29), čehož se typicky dosáhne obalením výsledku do transakce anebo tím, že operaci učiníme [idempotentní](http://en.wikipedia.org/wiki/Idempotence).

Procesy by měly být dostatečně **robustní pro případ náhle smrti**, dojde-li například k selhání podkladového hardwaru. I když se to stává velmi zřídka narozdíl od koretního ukončení signálem `SIGTERM`, stále se to ale může stát. Doporučený postup je použít robustní systém, jako je Beanstalkd, který vrací úlohy zpět do fronty v případě odpojení klienta nebo vypršení časového limitu. V každém případě, twelve-factor aplikace je navržena tak, aby zvládna neočekávané a nekorektní ukončení. [Crash-only design](http://lwn.net/Articles/191059/) je tedy pro tento koncept [logickým východiskem](http://docs.couchdb.org/en/latest/intro/overview.html).


