## I. Base de Código
### Uma base de código com rastreamento utilizando controle de revisão, muitos deploys

Uma aplicação 12 fatores é sempre rastreada em um sistema de controle de versão, como [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), ou [Subversion](http://subversion.apache.org/). Uma cópia da base de dados do rastreamento de revisões é conhecido como *repositório de código*, normalmente abreviado como *repositório* ou *repo*.

Uma *base de código* é um único repo (em um sistema de controle de versão centralizado como Subversion), ou uma série de repositórios que compartilham um registro raiz.

![Uma base de código para vários deploys](/images/codebase-deploys.png)

Existe sempre uma correlação um-para-um entre a base de código e a aplicação:

* Se existem várias bases de código, isto não é uma app -- é um sistema distribuído. Cada componente do sistema é uma app, e cada uma pode  individualmente ser compatível com os 12 fatores.
* Múltiplas apps compartilhando uma base de código é uma violação dos 12 fatores. A solução aqui é dividir o código compartilhado entre bibliotecas que podem ser incluídas através do [gerenciador de dependências](/dependencies).

Existe apenas uma base de código por aplicação, mas existirão vários deploys da mesma. Um *deploy* (ou implantação) é uma instância executando a aplicação. Isto é tipicamente um local de produção, e um ou mais locais de testes. Adicionalmente, todo desenvolvedor tem uma cópia da aplicação rodando em seu ambiente local de desenvolvimento, cada um desses pode ser qualificado como um deploy.

A base de código é a mesma através de todos os deploys, entretanto diferentes versões podem estar ativas em cada deploy. Por exemplo, um desenvolvedor tem alguns registros ainda não implantados no ambiente de teste, o ambiente de teste ainda tem registros não implantados em produção. Mas todos esses ambientes compartilham a mesma base de código, tornando-os identificáveis ​​como diferentes deploys do mesmo app.
