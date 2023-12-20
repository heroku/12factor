## X. Podobnost Vývoj/Produkce
### Udržujte si co nejmenší rozdíly mezi vývojovým, testovacím a produkčním prostředím.

Historicky byly vždy velké rozdíly mezi vývojovým (vývojář provádí změny v lokálním nasazení [zdrojového kódu](./codebase)) a produkčním prostředím (běžící nasazení aplikace přístupné koncovým uživatelům). To se projevuje jako mezery v těchto oblastech:

* **Časová mezera**: Vývojář může pracovat na kódu, který se dostane na produkci až za několik dnů, týdnů nebo i měsíců.
* **Personální mezera**: Vývojáři píší kód, systémoví inženýři ho nasazují.
* **Nástrojová mezera**: Vývojáři mohou používat Nginx, SQLite a OS X, přitom na produkci běží Apache, MySQL a Linux.

**Twelve-factor aplikace je navržena pro [průběžné nasazování](http://avc.com/2011/02/continuous-deployment/) tak, že si udržuje jen minimální rozdíly mezi vývojovým a produkčním prostředím.** Podíváme-li se na předchozí mezery touto optikou:

* Zmenšování časové mezery: Vývojář napíše kód a nasadí ho v řádu hodin či dokonce minut.
* Zmenšování personální mezery: Vývojáři píšící kód jsou úzce zapojeni do nasazení a sledují jeho chování na produkci.
* Zmenšování nástrojové mezery: Udržujeme co nejmenší rozdíly mezi vývojovým a produkčním prostředím.

Souhrn výše popsaného v tabulce:

<table>
  <tr>
    <th></th>
    <th>Tradiční aplikace</th>
    <th>Twelve-factor aplikace</th>
  </tr>
  <tr>
    <th>Čas mezi nasazeními</th>
    <td>Týdny</td>
    <td>Hodiny</td>
  </tr>
  <tr>
    <th>Autoři kódu vs ti, kdo kód nasazují</th>
    <td>Rozdílní lidé</td>
    <td>Stejní lidé</td>
  </tr>
  <tr>
    <th>Vývojové vs Produkční prostředí</th>
    <td>Rozdílné</td>
    <td>Minimální rozdíly</td>
  </tr>
</table>

[Podpůrné služby](./backing-services), jako je například databáze, fronty nebo cache jsou oblastí, kde je podobnost vývojového a produkčního prostředí velmi důležitá. Mnoho jazyků nabízí knihovny zjednodušující přístup k podpůrným službám, včetně *adaptérů* pro různé druhy služeb. Některé příklady jsou uvedeny v tabulce níže:

<table>
  <tr>
    <th>Typ</th>
    <th>Jazyk</th>
    <th>Knihovna</th>
    <th>Adaptér</th>
  </tr>
  <tr>
    <td>Databáze</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Fronta</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Pamět, Souborový systém, Memcached</td>
  </tr>
</table>

Vývojáři někdy rádi používají odlehčené varianty podpůrných služeb pro lokální vývoj, přestože na produkci budou použity jejich plnohodnotné varianty. Například použití SQLite lokálně a PostgreSQL na produkci nebo lokální pamět použitá jako cache pro vývoj oproti Memcached v produkci.

**Twelve-factor vývojáři dokáží odolat nutkání používat rozdílné podpůrné služby ve vývojovém a produkčním prostředí** i přesto, že adaptéry teoreticky odstraňují jakékoliv rozdíly v podpůrných službách. Rozdíly mezi podpůrnými službami a drobné nekompatibility se vždy vynoří a způsobí, že kód který prošel testy ve vývojovém a testovacím prostředí pak nefunguje na produkci. Tento typ chyb způsobuje obtíže a odrazuje od průběžného nasazování. Náklady spojené s těmito obtížemi a následným útlumem v průběžném nasazování jsou velmi vysoké, zvažujeme-li je souhrně za celou dobu životnosti aplikace.

Odlehčené varianty služeb jsou méně lákavé než bývaly dříve. Moderní podpůrné služby jako Memcached, PostgreSQL a RabbitMQ nejsou díky moderním balíčkovacím systémům jako [Homebrew](http://mxcl.github.com/homebrew/) a [apt-get](https://help.ubuntu.com/community/AptGet/Howto) složité na instalaci. Deklarativní nástroje pro provisioning, jako jsou například [Chef](http://www.opscode.com/chef/), či [Puppet](http://docs.puppetlabs.com/) v kombinaci s odlehčenými virtuálními prostředími typu [Docker](https://www.docker.com/) nebo [Vagrant](http://vagrantup.com/), umožňují vývojářům provozovat lokální vývojové prostředí, které velmi věrně odpovídá tomu produkčnímu. Cena za instalaci a provoz těchto systémů je poměrně nízká v porovnání s výhodami, které přináší podobnost vývoj/produkce a průběžné nasazování.

Adaptéry pro různé podpůrné služby mají stále svůj význam, protože umožňují přechod na nové podpůrné služby poměrně bezbolestně. Všechna nasazení aplikace (vývojové, testovací a produkční) by však měla používat stejný typ a verzi každé podpůrné služby.
