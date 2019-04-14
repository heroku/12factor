## X. Parité dev/prod
### Gardez le développement, la validation et la production aussi proches que possible

Historiquement, il y a eu un fossé conséquent entre le développement (un développeur qui fait des modifications sur un [déploiement](./codebase) local de l'application) et la production (un déploiement de l'application accessible aux utilisateurs finaux). Ce fossé se manifeste de trois manières :

* **Le fossé temporel** : un développeur peut travailler sur du code qui peut prendre des jours, des semaines ou des mois avant d'aller en production
* **Le fossé des personnes** : les développeurs écrivent le code, et d'autres personnes le déploient.
* **Le fossé des outils** : les développeurs peuvent utiliser une pile comme Nginx, SQLite, et OS X, alors que le déploiement de production utilise Apache, MySQL, et Linux.

**Les applications 12 facteurs sont conçues pour le [déploiement continu (en)](http://avc.com/2011/02/continuous-deployment/) en gardant un fossé étroit entre le développement et la production.** Si l'on regarde les trois fossés décrits plus haut :

* Réduire le fossé temporel : un développeur peut écrire du code et le déployer quelques heures ou même juste quelques minutes plus tard.
* Réduire le fossé des personnes : les personnes qui écrivent le code sont impliquées dans son déploiement et pour surveiller son comportement en production.
* Réduire le fossé des outils : réduire, autant que possible, les différences entre le développement et la production.

Si l'on résume cela en un tableau :

<table>
  <tr>
    <th></th>
    <th>Application traditionnelle</th>
    <th>Application 12 facteurs</th>
  </tr>
  <tr>
    <th>Temps entre les déploiements</th>
    <td>Semaines</td>
    <td>Heures</td>
  </tr>
  <tr>
    <th>Auteurs du code et ceux qui le déploient</th>
    <td>Des personnes différentes</td>
    <td>Les mêmes personnes</td>
  </tr>
  <tr>
    <th>L'environnement de développement et celui de production</th>
    <td>Divergents</td>
    <td>Aussi similaires que possible</td>
  </tr>
</table>

[Les services externes](./backing-services), tels que la base de données, la file de messages, ou le cache sont des éléments importants de la parité développement/production. La plupart des langages fournissent des bibliothèques qui simplifient l'accès à ces services externes, en fournissant des adaptateurs pour différents types de services. Voici quelques exemples dans le tableau ci-dessous.

<table>
  <tr>
    <th>Type</th>
    <th>Langage</th>
    <th>Librairie</th>
    <th>Adaptateurs</th>
  </tr>
  <tr>
    <td>Base de données</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>File de messages</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Mémoire, système de fichiers, Memcached</td>
  </tr>
</table>

Les développeurs trouvent parfois agréable d'utiliser des services externes légers dans leur environnement local, alors qu'un service externe plus sérieux et robuste est utilisé en production. Par exemple, utiliser SQLite en local, et PostgreSQL en production; ou bien, durant le développement, mettre les données en cache dans la mémoire des processus locaux, et utiliser Memcached en production.

**Les développeurs des applications 12 facteurs résistent au besoin d'utiliser des services externes différents entre le développement local et la production**, même lorsque les adaptateurs permettent d'abstraire en théorie beaucoup de différences entre les services externes. Les différences entre les services externes signifient que de petites incompatibilités surviennent, ce qui va faire que du code qui fonctionnait et qui passait les tests durant le développement ou la validation ne fonctionnera pas en production. Ce type d'erreurs crée de la friction en défaveur du déploiement continu. Le coût de cette friction et son impact négatif sur le déploiement continu est extrêmement élevé lorsqu'il est cumulé sur toute la vie de l'application.

Les services locaux légers sont moins attirants aujourd'hui qu'ils ne l'étaient autrefois. Les services externes modernes tels que Memcached, PostgreSQL, et RabbitMQ ne sont pas difficiles à installer et à faire fonctionner grâce aux systèmes de paquets modernes comme [Homebrew](http://mxcl.github.com/homebrew/) et [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Autre possibilité, des outils de provisionnement comme [Chef](http://www.opscode.com/chef/) et [Puppet](http://docs.puppetlabs.com/), combinés à des environnements virtuels légers comme [Docker](https://www.docker.com/) et [Vagrant](http://vagrantup.com/) permettent aux développeurs de faire fonctionner des environnements locaux qui reproduisent de très près les environnements de production. Le coût d'installation et d'utilisation de ces systèmes est faible comparé aux bénéfices d'une bonne parité développement/production et du déploiement continu.

Les adaptateurs à ces différents systèmes externes sont malgré tout utiles, car ils rendent le portage vers de nouveaux services externes relativement indolores. Mais tous les déploiements de l'application (environnement de développement, validation, production) devraient utiliser le même type et la même version de chacun de ces services externes.
