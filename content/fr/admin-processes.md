## XII. Processus d'administration
### Lancez les processus d'administration et de maintenance comme des one-off-processes

La [formation de processus](./concurrency) est la liste des processus qui sont utilisés pour le fonctionnement normal de l'application (comme gérer les requêtes web) lorsqu'elle tourne. Les développeurs vont souvent vouloir effectuer des tâches occasionnelles d'administration ou de maintenance, comme :

* Lancer les migrations de base de données (par ex. `manage.py migrate` avec Django, `rake db:migrate` avec Rails).
* Lancer une console (également appelée terminal [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop)) pour exécuter du code arbitraire ou inspecter les modèles de l'application dans la base de données. La plupart des langages fournissent un terminal REPL en lançant l'interpréteur sans arguments (par exemple `python` ou `perl`), ou dans certains cas à l'aide d'une commande dédiée (par ex. `irb` pour Ruby, `rails console` pour Rails).
* Exécuter des scripts ponctuels inclus dans le dépôt de code (par ex. `php scripts/fix_bad_records.php`).

Les processus ponctuels d'administration devraient être lancés dans un environnement identique à ceux des [processus standards](./processes) de l'application. Ils s'exécutent sur une [release](./build-release-run), en utilisant la même [base de code](./codebase) et [configuration](./config) que tout processus qui tourne pour cette release. Le code d'administration doit être livré avec le code de l'application afin d'éviter les problèmes de synchronisation.

La même technique d'[isolation de dépendances](./dependencies) doit être utilisée sur tous les types de processus. Par exemple, si le processus web de Ruby utilise la commande `bundle exec thin start`, alors une migration de base de données devrait être faite via `bundle exec rake db:migrate`. De la même manière, un programme Python qui utilise Virtualenv devrait utiliser la commande incluse `bin/python` pour lancer à la fois le serveur web Tornado et tout processus administrateur `manage.py`.

Les applications 12 facteurs préfèrent les langages qui fournissent un terminal REPL prêt à l'emploi, et qui facilitent l'exécution de scripts ponctuels. Dans un déploiement local, les développeurs invoquent les processus ponctuels d'administration depuis le terminal, par une commande directement dans le répertoire où se trouve l'application. Dans un déploiement de production, les développeurs peuvent utiliser ssh ou d'autres mécanismes d'exécution de commandes fournis par l'environnement d'exécution de ce déploiement pour exécuter un tel processus.
