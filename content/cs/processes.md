## VI. Procesy
### Spouštějte aplikaci jako jeden nebo více bezestavových procesů.

Aplikace je vykonávána v běhovém prostředí jako jeden nebo více *procesů*.

V nejjednodušším případě je kód samostatný skript, běhové prostředí je laptop vývojáře s naistalovaným interpreterem daného jazyka a proces je spouštěn z příkazové řádky (například jako `python my_script.py`). Na druhé straně spektra je produkční nasazení sofistikované aplikace využívající vícero [typů procesu, instancovaných do nula nebo více běžících procesů](./concurrency).

**Twelve-factor procesy jsou bezestavové a [nic nesdílejí](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Jakákoliv data, která potřebují být uchována, musí být uložena ve stavové [podpůrné službě](./backing-services), typicky v databázi.

Paměť nebo souborový systém procesu mohou být využity jako krátkodobá cache pro jednu transakci. Například ke stažení velkého souboru, práce s ním a následné uložení výsledku do databáze. Twelve-factor aplikace nikdy nespoléhá, že cokoliv je nacachované v paměti nebo na disku, bude dostupné i v dalším požadavku. Při velkém počtu běžících procesů je vysoká pravděpodobnost, že další požadavek bude odbaven jiným procesem. I kdyby běžel pouze jeden proces, restart (způsobený nasazením nového kódu, změnou konfigurace nebo přemístěním procesu na jiné fyzické umístění) obvykle smaže všechny lokální (například pamět nebo souborový systém) stavy.

Balíčkovače jako je [django-assetpackager](http://code.google.com/p/django-assetpackager/) používají souborový systém jako dočasné uložiště pro zkompilované soubory. Twelve-factor aplikace preferují kompilaci během [fáze sestavení](/build-release-run). Balíčkovače jako jsou [Jammit](http://documentcloud.github.io/jammit/) a [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) mohou být nastaveny tak, že soubory zabalí již během fáze sestavení.

Některé webové aplikace spoléhají na ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence), tedy cachování uživatelských session v paměti procesu a směrování budoucích požadavků stejného návštěvníka na stejný proces. Sticky session jsou porušením twelve-factor metodiky a neměli by se používat a ani by se na ně nemělo jakkoliv spoléhat. Sticky session data jsou vhodným kandidátem pro uložiště, která podporují časovou expiraci dat, jako jsou například [Memcached](http://memcached.org/) nebo [Redis](http://redis.io/).