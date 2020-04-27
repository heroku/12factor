## VI. Processus
### Exécutez l'application comme un ou plusieurs processus sans état

L'application est exécutée dans l'environnement d'exécution comme un ou plusieurs *processus*.

Dans la situation la plus simple, le code est un script indépendant, l'environnement d'exécution est l'ordinateur portable du développeur sur lequel est installé de quoi exécuter le langage, et le processus est lancé depuis la ligne de commande. (par exemple, `python mon_script.py`). De l'autre côté du spectre, un déploiement de production d'une application sophistiquée peut utiliser plusieurs [types de processus, instanciés dans zéro ou plus processus en fonctionnement](./concurrency).

**Les processus 12 facteurs sont sans état et ne partagent [rien (en)](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Toute donnée qui doit être persistée doit être stockée dans un [service externe](./backing-services) stateful, typiquement une base de données.

L'espace mémoire ou le système de fichier du processus peut être utilisé comme cache momentané pour des transactions uniques. Par exemple, télécharger un gros fichier, effectuer une opération dessus, puis stocker le résultat de l'opération dans la base de données. Les applications 12 facteurs ne supposent jamais que quelque chose ayant été mis en cache en mémoire ou sur le disque sera disponible dans une future requête ou job — avec plusieurs processus de chaque type qui s'exécutent, il y a de grandes chances qu'une future requête soit effectuée par un processus différent. Même lorsque l'on fait tourner seulement un processus, un redémarrage (déclenché par le déploiement du code, un changement de configuration, ou l'environnement d'exécution qui déplace le processus vers un lieu physique différent) va généralement balayer toutes les modifications locales (c'est-à-dire en mémoire et sur le disque).

Des outils de création de paquets de ressources (ou "asset packagers") (tel que [Jammit](http://documentcloud.github.com/jammit/) ou [django-compressor](http://django-compressor.readthedocs.org/)) utilisent le système de fichier comme cache pour les ressources compilées. Une application 12 facteurs préfère faire cette compilation durant l'[étape d'assemblage](./build-release-run), comme avec le [pipeline des ressources de Rails](http://guides.rubyonrails.org/asset_pipeline.html), plutôt que durant l'exécution.

Certains systèmes web s'appuient sur des ["sessions persistantes" (en)](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- c'est-à-dire, mettre en cache les données de session utilisateur dans le processus de l'application et attendre que les requêtes futures du même visiteur seront routées dans le même processus. Les sessions persistantes sont une violation des 12 facteurs, qu'il ne faudrait jamais utiliser.
Les états de session sont de bons candidats pour un datastore qui offre des dates d'expiration, comme [Memcached](http://memcached.org/) ou [Redis](http://redis.io/).

