## V. Build, release, run
### Strikt gescheiden houden van build en run stadia

Een [codebase](./codebase) wordt getransformeerd in een (niet-ontwikkel) deploy door drie stadia:

* De *build stage* is een transformatie die een code repo omzet in een uitvoerbare bundel, bekend als een *build*. Met behulp van een versie van de code op een commit gespecificeerd door het deployment proces, haalt de build fase vendors [dependencies](./dependencies) op en compileert binaries en assets.
* De *release stage* neemt de geproduceerde build van de build stage en combineert het met de huidige [config](./config) van de deploy. De resulterende *release* bevat zowel de build als de config en is klaar voor onmiddellijke uitvoering in de uitvoeringsomgeving.
* De *run fase* (ook bekend als "runtime") draait de app in de executie omgeving, door het starten van een set van de app's [processen](./processes) tegen een geselecteerde release.

![Code wordt een build, die gecombineerd wordt met config om een release te maken.](/images/release.png)

**De 12-factor app maakt gebruik van een strikte scheiding tussen de build, release en run stadia.** Het is bijvoorbeeld onmogelijk om wijzigingen aan te brengen in de code tijdens runtime, aangezien er geen manier is om die wijzigingen terug te propageren naar het build stadium.

Deployment tools bieden meestal release management tools, met name de mogelijkheid om terug te gaan naar een vorige release. Bijvoorbeeld, de [Capistrano](https://github.com/capistrano/capistrano/wiki) deployment tool slaat releases op in een subdirectory genaamd `releases`, waar de huidige release een symlink is naar de huidige release directory. Het `rollback` commando maakt het makkelijk om snel terug te gaan naar een vorige release.

Elke release moet altijd een unieke release ID hebben, zoals een tijdstempel van de release (zoals `2011-04-06-20:32:17`) of een oplopend nummer (zoals `v100`).  Releases zijn een append-only grootboek en een release kan niet worden gemuteerd als deze eenmaal is aangemaakt. Elke verandering moet een nieuwe release aanmaken.

Builds worden geïnitieerd door de ontwikkelaars van de app wanneer nieuwe code wordt uitgerold. Runtime uitvoering, daarentegen, kan automatisch gebeuren in gevallen zoals een server reboot, of een gecrasht proces dat opnieuw wordt gestart door de procesmanager. Daarom moet de run-fase beperkt worden tot zo weinig mogelijk bewegende delen, omdat problemen die een app verhinderen te draaien midden in de nacht kunnen gebeuren als er geen ontwikkelaars bij de hand zijn. De build fase kan complexer zijn, omdat fouten altijd op de voorgrond staan voor een ontwikkelaar die de deploy aanstuurt.