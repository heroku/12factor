## VI. Processen
### De app als één of meer stateloze processen uitvoeren

De app wordt in de uitvoeringsomgeving uitgevoerd als een of meer *processen*.

In het eenvoudigste geval is de code een stand-alone script, de uitvoeringsomgeving is de lokale laptop van een ontwikkelaar met een geïnstalleerde runtime, en het proces wordt gestart via de commandoregel (bijvoorbeeld `python my_script.py`). Aan de andere kant van het spectrum kan een productie-implementatie van een geavanceerde app gebruik maken van vele [procestypes, geïnstantieerd in nul of meer lopende processen](./concurrency).

**12-factor processen zijn stateless en [delen-niets](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Alle gegevens die moeten blijven bestaan, moeten worden opgeslagen in een stateful [backing service](./backing-services), meestal een database.

De geheugenruimte of het bestandssysteem van het proces kan worden gebruikt als een korte, eenmalige transactie cache. Bijvoorbeeld het downloaden van een groot bestand, het bewerken ervan, en het opslaan van de resultaten van de operatie in de database. De 12-factor app gaat er nooit van uit dat iets wat in de cache of op de schijf zit, beschikbaar zal zijn voor een toekomstig verzoek of een toekomstige taak -- met veel processen van elk type die draaien, is de kans groot dat een toekomstig verzoek door een ander proces zal worden uitgevoerd. Zelfs als er maar één proces draait, zal een herstart (veroorzaakt door het implementeren van code, het wijzigen van de configuratie, of de uitvoeringsomgeving die het proces naar een andere fysieke locatie verplaatst) meestal alle lokale state wissen (bv. geheugen en bestandssysteem).

Asset packagers zoals [django-assetpackager](http://code.google.com/p/django-assetpackager/) gebruiken het bestandssysteem als een cache voor gecompileerde assets. Een 12-factor app doet dit compileren het liefst tijdens de [build stage](/build-release-run). Asset packagers zoals [Jammit](http://documentcloud.github.com/jammit/) en de [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) kunnen worden geconfigureerd om assets te packagen tijdens de build stage.

Sommige websystemen vertrouwen op ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- dat is het cachen van gebruikerssessiegegevens in het geheugen van het proces van de app en verwachten dat toekomstige verzoeken van dezelfde bezoeker naar hetzelfde proces worden gerouteerd. Sticky sessies zijn een schending van de 12-factor en mogen nooit worden gebruikt of op worden vertrouwd. Session state data is een goede kandidaat voor een datastore die time-expiration biedt, zoals [Memcached](http://memcached.org/) of [Redis](http://redis.io/).
