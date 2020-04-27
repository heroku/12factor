## III. Configurações
### Armazene as configurações no ambiente

A *configuração* de uma aplicação é tudo o que é provável variar entre [deploys](./codebase) (homologação, produção, ambientes de desenvolvimento, etc). Isto inclui:

* Recursos para a base de dados, Memcached, e outros [serviços de apoio](./backing-services)
* Credenciais para serviços externos como Amazon S3 ou Twitter
* Valores por deploy como o nome canônico do host para o deploy

Aplicações às vezes armazenam as configurações no código como constantes. Isto é uma violação da doze-fatores, a qual exige uma **estrita separação entre configuração e código**. Configuração varia substancialmente entre deploys, código não.

A prova de fogo para saber se uma aplicação tem todas as configurações corretamente consignadas fora do código é saber se a base de código poderia ter seu código aberto ao público a qualquer momento, sem comprometer as credenciais.

Note que esta definição de "configuração" **não** inclui configuração interna da aplicação, como `config/routes.rb` em Rails, ou como [módulos de códigos são conectados](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) em [Spring](http://spring.io/). Este tipo de configuração não varia entre deploys, e por isso é melhor que seja feito no código.

Outra abordagem para configuração é o uso de arquivos de configuração que não são versionados no controle de versão, como `config/database.yml` em Rails. Isto é uma grande melhoria sobre o uso de constantes que são versionadas no repositório do código, mas ainda tem pontos fracos: é fácil de colocar por engano um arquivo de configuração no repositório; há uma tendência para que os arquivos de configuração sejam espelhados em diferentes lugares e diferentes formatos, tornando-se difícil de ver e gerenciar todas as configurações em um só lugar. Além disso estes formatos tendem a ser específicos da linguagem ou framework.

**A aplicação doze-fatores armazena configuração em *variáveis de ambiente*** (muitas vezes abreviadas para *env vars* ou *env*). Env vars são fáceis de mudar entre deploys sem alterar qualquer código; ao contrário de arquivos de configuração, há pouca chance de serem colocados acidentalmente no repositório do código; e ao contrário dos arquivos de configuração personalizados, ou outros mecanismos de configuração como Propriedades do Sistema Java, eles são por padrão agnósticos a linguagem e ao SO.

Outro aspecto do gerenciamento de configuração é o agrupamento. Às vezes, as aplicações incluem a configuração em grupos nomeados (muitas vezes chamados de ambientes) que remetem a deploys específicos, tais como os ambientes `development`, `test`, e `production` em Rails. Este método não escala de forma limpa: quanto mais deploys da aplicação são criados, novos nomes de ambiente são necessários, tais como `staging` ou `qa`. A medida que o projeto cresce ainda mais, desenvolvedores podem adicionar seus próprios ambientes especiais como `joes-staging`, resultando em uma explosão combinatória de configurações que torna o gerenciamento de deploys da aplicação muito frágil.

Em uma aplicação doze-fatores, env vars são controles granulares, cada um totalmente ortogonal às outras env vars. Elas nunca são agrupadas como "environments", mas em vez disso são gerenciadas independentemente para cada deploy. Este é um modelo que escala sem problemas à medida que o app naturalmente se expande em muitos deploys durante seu ciclo de vida.
