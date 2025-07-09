## I. Codebase
### Eén codebasis bijgehouden in versiebeheer, veel uitrollen

Een twelve-factor app wordt altijd bijgehouden in een versiebeheersysteem, zoals [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), of [Subversion](http://subversion.apache.org/). Een database voor het bijhouden van revisies staat bekend als een *code repository*, vaak afgekort tot *code repo* of gewoon *repo*

Een *codebasis* is een enkele repo (in een gecentraliseerd revisiebeheersysteem zoals Subversion), of een set van repo's die een root commit delen (in een gedecentraliseerd revisiebeheersysteem zoals Git)

![Eén codebase gaat samen met vele uitrollen](/images/codebase-deploys.png)

Er is altijd een één-op-één correlatie tussen de codebase en de app:

* Als er meerdere codebasissen zijn, is het geen app -- het is een gedistribueerd systeem. Elk onderdeel in een gedistribueerd systeem is een app, en elk kan individueel conform zijn met twelve-factor principes.
* Meerdere apps die dezelfde code delen is een overtreding van de twelve-factor principes. De oplossing hier is om gedeelde code te herwerken in software-libraries die kunnen worden opgenomen in de [dependency manager](./dependencies).

Er is slecht één codebase per app, maar er zullen veel uitrollen van de app zijn. Een *uitrol* is een draaiende instantie van de app. Dit is typisch voor een productie omgeving, en een of meer staging omgevingen. Daarnaast heeft elke ontwikkelaar een kopie van de app draaien in hun lokale ontwikkelomgeving, die ook gekwalificeert zijn als een uitrol.

De codebasis is dezelfde over alle uitrollen, hoewel verschillende versies actief kunnen zijn in elke uitrol. Bijvoorbeeld, een ontwikkelaar heeft een aantal commits die nog niet zijn uitgerold naar staging; staging heeft een aantal commits die nog niet zijn uitgerold naar productie. Maar ze delen allemaal dezelfde codebasis, waardoor ze identificeerbaar zijn als verschillende uitrollen van dezelfde app.