## I. Base de code
### Une base de code suivie avec un système de contrôle de version, plusieurs déploiements

Une application 12 facteurs est toujours suivie dans un système de contrôle de version, tel que [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), ou [Subversion](http://subversion.apache.org/). Une copie de la base de données de suivi des révisions est appelée *dépôt de code*, souvent raccourci en *dépôt*. Le terme anglais *code repository*, raccourci en *repository* et *repo* est également utilisé.

Une *base de code* correspond à chaque dépôt (dans un système de contrôle de version centralisé tel que Subversion), ou tout ensemble de dépôts qui partage un commit racine (dans un système de contrôle de version décentralisé comme Git).

![Une base de code est associée à plusieurs déploiements](/images/codebase-deploys.png)

Il y a toujours un rapport direct entre la base de code et l'application :

* S'il y a plusieurs bases de code, ce n'est pas une application, c'est un système distribué. Chaque composant du système distribué est une application, et chacun peut individuellement respecter la méthodologie 12 facteurs.
* Plusieurs applications partageant le même code est une violation des 12 facteurs. La solution dans ce cas est de factoriser le code partagé dans des bibliothèques qui peuvent être intégrées via un [gestionnaire de dépendances](./dependencies).

Il y a seulement une base de code par application, mais il y aura plusieurs déploiements de l'application. Un *déploiement* est une instance en fonctionnement de l'application. C'est, par exemple, le site en production, ou bien un ou plusieurs sites de validation. En plus de cela, chaque développeur a une copie de l'application qui fonctionne dans son environnement local de développement, ce qui compte également comme un déploiement.

La base de code est la même à travers tous les déploiements, bien que différentes versions puissent être actives dans chaque déploiement. Par exemple, un développeur a des commits qui ne sont pas encore déployés dans l'environnement de validation. L'environnement de validation a des commits qui ne sont pas encore déployés en production. Par contre, ils partagent tous la même base de code, ce qui les identifie comme étant des déploiements différents d'une même application.

