## XI. Logs
### Traitez les logs comme des flux d'évènements

Les *logs* fournissent de la visibilité au comportement de l'application qui s'exécute. Dans des environnements de type serveur, ils sont généralement écrits dans un fichier, sur le disque (dans un fichier de log). Mais c'est simplement un format de sortie.

Les logs sont des [flux (en)](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) d'agrégats d'évènements, ordonnés dans le temps, collectés à travers les flux de sortie de tous les processus et services externes qui tournent. Les logs, dans leur forme brute, sont au format texte avec un événement par ligne (bien que les traces d'exécutions puissent s'étaler sur plusieurs lignes). Les logs n'ont pas de début ou de fin fixe, mais se remplissent en continu tant que l'application est en marche.

**Une application 12 facteurs ne s'inquiète jamais du routage ou du stockage de ses flux de sortie.** Elle ne devrait pas tenter d'écrire ou de gérer les fichiers de logs. À la place, chaque processus qui tourne écrit ses flux d'événements, sans tampon, vers `stdout`, la sortie standard ; en phase de développement local, les développeurs pourront voir ce flux dans leur terminal et observer le comportement de l'application.

Dans les déploiements de validation ou de production, les flux de chaque processus seront capturés par leur environnement d'exécution, assemblés avec les autres flux de l'application, et routés vers une ou plusieurs destinations pour un visionnage et un archivage de longue durée. Le lieu d'archivage n'est pas visible et ne peut être configuré par l'application : ils sont complètements gérés par l'environnement d'exécution. Des routeurs opensource de logs, (tel que [Logplex](https://github.com/heroku/logplex) et [Fluentd](https://github.com/fluent/fluentd)) existent pour cela.

Le flux d'événements d'une application peut être routé dans un fichier, ou surveillé en temps réel (avec tail) dans un terminal. Plus pertinent, les flux peuvent être envoyés vers un outil d'indexation et d'archivage des logs tel que [Splunk](http://www.splunk.com/), ou bien dans un entrepôt de données générique comme [Hadoop/Hive](http://hive.apache.org/). Ces systèmes sont très puissants et flexibles pour inspecter le comportement de l'application au cours du temps, ce qui inclut :

* Trouver un événement spécifique dans le passé
* Faire des graphiques à grande échelle des tendances (comme le nombre de requêtes par minutes)
* Lever des alertes, à partir d'heuristiques définies par l'utilisateur (comme alerter dès que la quantité d'erreurs par minutes dépasse un certain seuil)
