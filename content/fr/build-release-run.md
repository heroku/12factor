## V. Assemblez, publiez, exécutez
### Séparez strictement les étapes d'assemblage et d'exécution

Une [base de code](./codebase) est transformée en un déploiement (non-développement) à travers les étapes suivantes :

* L'*étape d'assemblage* (ou "build") est une transformation qui convertit un dépôt de code en un paquet autonome exécutable appelé l'assemblage (ou "build"). En utilisant une version du code référencée par un commit spécifié lors du processus de déploiement, l'étape d'assemblage va chercher toutes les [dépendances externes](./dependencies) et compile les fichiers binaires et les ressources.
* L'*étape de publication * (ou "release") prend l'assemblage produit à l'étape précédente et le combine avec la [configuration](./config) de déploiement courante. La release résultante contient à la fois l'assemblage et la configuration, et elle est prête pour une exécution immédiate dans l'environnement d'exécution.
* L'*étape d'exécution* (ou "runtime") fait fonctionner l'application dans l'environnement d'exécution, en lançant un ensemble de [processus](./processes) de l'application associée à la release considérée.

![Le code devient un assemblage, qui est combiné à la configuration pour créer une release](/images/release.png)

**Les applications 12 facteurs ont une séparation stricte entre les étapes d'assemblage, de publication et d'exécution.** Par exemple, il est impossible de faire des changements dans le code au moment de son exécution, car il n'y a pas moyen de propager ces changements vers l'étape de build.

Les outils de déploiement offrent généralement des outils de gestion de release, permettant notamment de revenir à une release antérieure. Par exemple, l'outil de déploiement [Capistrano](https://github.com/capistrano/capistrano/wiki) stocke les releases dans un sous-répertoire appelé `releases`, où la release courante est un lien symbolique vers le répertoire de release courante. Sa commande `rollback` permet de facilement revenir à une release précédente.

Chaque release devrait toujours avoir un identifiant unique, comme un horodatage (timestamp) de la release (tel que `2011-04-06-20:32:17`) ou un nombre incrémental (tel que `v100`). La liste des releases est accessible en écriture incrémentale uniquement, et il n'est pas possible de modifier une release une fois qu'elle a été réalisée. Tout changement doit créer une nouvelle release.

Les assemblages sont initiés par le développeur de l'application dès que du nouveau code est déployé. Son exécution, au contraire, peut avoir lieu automatiquement en cas d'un reboot du serveur, ou du crash d'un processus qui est relancé par le gestionnaire de processus. De ce fait, l'étape d'exécution doit se limiter à un nombre minimal de parties mobiles, car les problèmes qui empêchent une application de fonctionner peuvent entraîner des dysfonctionnements au milieu de la nuit alors qu'aucun développeur ne sera là pour les corriger. L'étape d'assemblage peut être plus complexe, car les erreurs pourront toujours être résolues par le développeur qui réalise le déploiement.

