## VII. Associations de ports
### Exportez les services via des associations de ports

Les applications web sont parfois exécutées à l'intérieur d'un container de serveur web. Par exemple, les applications PHP peuvent fonctionner comme un module à l'intérieur de [HTTPD, d'Apache](http://httpd.apache.org/), ou bien les applications Java peuvent fonctionner à l'intérieur de [Tomcat](http://tomcat.apache.org/).

**Les applications 12 facteurs sont complètement auto-contenues** et ne se basent pas sur l'injection au moment de l'exécution d'un serveur web dans l'environnement d'exécution pour créer les services exposés au web. L'application web **expose HTTP comme un service en l'associant à un port** et écoute les requêtes qui arrivent sur ce port.

Dans un environnement de développement local, le développeur visite l'URL d'un service tel que `http://localhost:5000/` pour accéder au service exporté par leur application. Durant le déploiement, une couche de routage gère le routage des requêtes depuis un nom d'hôte qui s'expose au public, vers les processus sur lequel est associé le port.

Ceci est typiquement implémenté en utilisant [la déclaration de dépendances](./dependencies) pour ajouter une bibliothèque de serveur web, tel que [Tornado](http://www.tornadoweb.org/) pour Python, [Thin](http://code.macournoyer.com/thin/) pour Ruby, ou [Jetty](http://www.eclipse.org/jetty/) pour Java et autres langages basés sur la JVM. Cela se déroule entièrement dans l'espace utilisateur, c'est-à-dire, dans le code de l'application. Le contrat avec l'environnement d'exécution, c'est l'association de port pour servir les requêtes.

HTTP n'est pas le seul service qui peut être exporté à l'aide d'association de ports. Presque tout type de serveur peut fonctionner à travers l'association à un port et l'écoute des requêtes entrantes. Il y a par exemple [ejabberd](http://www.ejabberd.im/) (qui parle [XMPP](http://xmpp.org/)), et [Redis](http://redis.io/) (qui parle le [protocole Redis](http://redis.io/topics/protocol)).

Notez également que l'approche par association de port signifie qu'une application peut devenir le [service externe](./backing-services) d'une autre application, en fournissant l'URL de l'application externe dans la configuration de l'application qui la consomme.
