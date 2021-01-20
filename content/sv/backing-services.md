## IV. Backing services (Stödstjänster)
### Behandla stödstjänster som anslutna resurser

En *stödtjänst* är en tjänst som applikationen använder över nätverket, som del av sin normala drift. Exempel på detta inkluderar datalager (ex. [MySQL](http://dev.mysql.com/) eller [CouchDB](http://couchdb.apache.org/)), meddelande/kö-system (ex. [RabbitMQ](http://www.rabbitmq.com/) eller [Beanstalkd](https://beanstalkd.github.io)), SMTP-tjänster för utgående epost (ex. [Postfix](http://www.postfix.org/)), och system för caching (ex. [Memcached](http://memcached.org/)).

Stödtjänster såsom databaser hanteras traditionellt av samma systemadministratörer som produktionssätter applikationens körbara filer. Förutom dessa lokalt hanterade tjänster kan applikationen även ha tjänster som tillhandahålls och hanteras av tredje part. Exempel på det inkluderar SMTP-tjänster (ex. [Postmark](http://postmarkapp.com/)), mätvärdessamlande tjänster (ex. [New Relic](http://newrelic.com/) eller [Loggly](http://www.loggly.com/)), tjänser för binära resurser (ex. [Amazon S3](http://aws.amazon.com/s3/)), och även konsumenttjänster som är tillgängliga via API (ex. [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), eller [Last.fm](http://www.last.fm/api)).

**Koden för en tolvfaktor-applikation gör ingen skillnad mellan lokala tjänster och tredjepartstjänster.** För applikationen är båda typerna *ansluta resurser*, som anropas via en URL eller annan typ av sökväg/inloggning och som lagras i [konfigurationen](./config). En tolvfaktor-applikations [kodbas](./codebase) bör kunna byta ut en lokal MySQL-databas med en som hanteras av tredje part (ex. [Amazon RDS](http://aws.amazon.com/rds/)) utan några ändringar i applikationens kod. På samma sätt kan en lokal SMTP-server bytas ut mot en tredjepartstjänst (ex. Postmark) utan kodändringar. I båda fallen är det endast resursens anslutning i konfigurationen som behöver ändras.

Varje distinkt stödtjänst är en *resurs*. Till exempel, en MySQL-databas är en resurs; två MySQL-databaser (som används för lastbalansering av applikationslagret) kvalificeras som två distinkta resurser. Tolvfaktor-applikationen behandlar dessa databaser som *anslutna resurser*, vilket indikerar deras lösa koppling till den produkt som de är anslutna till.

<img src="/images/attached-resources.png" class="full" alt="En produkt ansluten till fyra stödtjänster" />

Resurser kan anslutas till och kopplas från produkter efter behov. Till exempel, om applikationens databas beter sig märkligt på grund av ett hårdvarufel skulle applikationens administratör kunna sätta igång en ny databasserver som återställts från en nyligen tagen backup. Den nuvarande produktionsdatabasen kan kopplas ifrån och den nya databasen kopplas in -- helt och hållet utan kodändringar.