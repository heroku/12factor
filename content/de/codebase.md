## I. Codebase
### Eine im Versionsmanagementsystem verwaltete Codebase, viele Deployments

Eine Zwölf-Faktor-App wird immer in einem Versionsmanagementsystem verwaltet, wie zum Beispiel [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/) oder [Subversion](http://subversion.apache.org/). Eine Kopie der Versionsdatenbank wird *Code Repository* genannt, kurz *Code Repo* oder auch nur *Repo*.

Eine *Codebase* ist jedes einzelne Repo (in einem zentralisierten Versionsmanagementsystem wie Subversion) oder jede Menge von Repos, die einen ursprünglichen Commit teilen (in dezentralisierten Versionsmanagementsystemen wie git).

![Eine Codebase bildet sich in viele Deploys ab.](/images/codebase-deploys.png)

Es gibt immer eine eineindeutige Korrelation zwischen einer Codebase und einer App:

* Wenn es mehrere Codebases gibt, ist es keine App -- sondern ein verteiltes System. Jede Komponente in einem verteilten System ist eine App, und Jede kann für sich den zwölf Faktoren entsprechen.
* Wenn mehrere Apps denselben Code teilen, verletzt dies die zwölf Faktoren. Lösen lässt sich dies, indem man den gemeinsamen Code in Bibliotheken auslagert und über die [Abhängigkeitsverwaltung](./dependencies) lädt.

Es gibt nur eine Codebase pro App aber viele Deploys der App. Ein *Deploy* ist eine laufende Instanz der App. Meist gibt es ein Produktionssystem und eines oder mehrere Staging-Systeme. Zusätzlich hat jeder Entwickler eine Kopie der App in seiner lokalen Entwicklungsumgebung, das sind auch Deploys.

Die Codebase ist über alle diese Deploys hinweg dieselbe, auch wenn bei jedem Deploy unterschiedliche Versionen aktiv sind. So hat zum Beispiel ein Entwickler manche Commits noch nicht nach Staging deployt; Staging hat manche Commits noch nicht nach Produktion deployt. Aber alle teilen dieselbe Codebase, was sie als verschiedene Deploys derselben App auszeichnet.
