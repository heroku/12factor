## X. Paridade entre desenvolvimento e produção
### Mantenha o desenvolvimento, homologação e produção o mais similares possível

Historicamente, houveram lacunas substanciais entre desenvolvimento (um desenvolvedor editando código num [deploy](./codebase) local do app) e produção (um deploy acessado pelos usuários finais). Essas lacunas se manifestam em três áreas:

* **A lacuna do tempo:** Um desenvolvedor pode trabalhar em código que demora dias, semanas ou até meses para ir para produção.
* **A lacuna de pessoal:** Desenvolvedores escrevem código, engenheiros de operação fazem o deploy dele.
* **A lacuna de ferramentas:** Desenvolvedores podem estar usando um conjunto como Nginx, SQLite, e OS X, enquanto o app em produção usa Apache, MySQL, e Linux.

**O App doze-fatores é projetado para [implantação contínua](http://avc.com/2011/02/continuous-deployment/) deixando a lacuna entre desenvolvimento e produção pequena.** Olhando às três lacunas descritas acima:

* Diminua a lacuna de tempo: um desenvolvedor pode escrever código e ter o deploy feito em horas ou até mesmo minutos depois.
* Diminua a lacuna de pessoal: desenvolvedores que escrevem código estão proximamente envolvidos em realizar o deploy e acompanhar seu comportamento em produção.
* Diminua a lacuna de ferramentas: mantenha desenvolvimento e produção o mais similares possível.

Resumindo o acima em uma tabela:

<table>
  <tr>
    <th></th>
    <th>App tradicional</th>
    <th>App doze-fatores</th>
  </tr>
  <tr>
    <th>Tempo entre deploys</th>
    <td>Semanas</td>
    <td>Horas</td>
  </tr>
  <tr>
    <th>Autores de código vs deployers</th>
    <td>Pessoas diferentes</td>
    <td>Mesmas pessoas</td>
  </tr>
  <tr>
    <th>Ambientes de desenvolvimento vs produção</th>
    <td>Divergente</td>
    <td>O mais similar possível</td>
  </tr>
</table>

[Serviços de apoio](./backing-services), como o banco de dados do app, sistema de filas, ou cache, são uma área onde paridade entre desenvolvimento e produção é importante. Muitas linguagens oferecem diferentes bibliotecas que simplificam o acesso ao serviço de apoio, incluindo *adaptadores* para os diferentes tipos de serviços. Alguns exemplos na tabela abaixo.

<table>
  <tr>
    <th>Tipo</th>
    <th>Linguagem</th>
    <th>Biblioteca</th>
    <th>Adaptadores</th>
  </tr>
  <tr>
    <td>Banco de dados</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Fila</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, sistema de arquivos, Memcached</td>
  </tr>
</table>

Desenvolvedores as vezes veem uma grande vantagem em usar um serviço de apoio leve em seus ambientes, enquanto um serviço de apoio mais sério e robusto seria usado em produção. Por exemplo, usando SQLite localmente e PostgreSQL em produção; ou memória de processo local para caching em desenvolvimento e Memcached em produção.

**O desenvolvedor doze-fatores resiste a tentação de usar diferentes serviços de apoio entre desenvolvimento e produção**, mesmo quando adaptadores teoricamente abstraem as diferenças dos serviços de apoio. Diferenças entre serviços de apoio significam que pequenas incompatibilidades aparecerão, fazendo com que código que funcionava e passava em desenvolvimento ou homologação, falhe em produção. Tais tipos de erros criam fricção que desincentivam deploy contínuo. O custo dessa fricção e do subsequente decaimento de deploy contínuo é extremamente alto quando considerado que vai acumular no tempo de vida da aplicação.

Serviços locais leves são menos tentadores que já foram um dia. Serviços de apoio modernos tais como Memcached, PostgreSQL, e RabbitMQ não são difíceis de instalar e rodam graças a sistemas modernos de empacotamento tais como [Homebrew](http://mxcl.github.com/homebrew/) e [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Alternativamente, ferramentas de provisionamento declarativo tais como [Chef](http://www.opscode.com/chef/) e [Puppet](http://docs.puppetlabs.com/) combinado com ambientes virtuais leves como [Vagrant](http://vagrantup.com/) permitem desenvolvedores rodar ambientes locais que são bem próximos dos ambientes de produção. O custo de instalar e usar esses sistemas é baixo comparado ao benefício de ter a paridade entre desenvolvimento, produção e deploy contínuo.

Adaptadores para diferentes serviços de apoio ainda são úteis, pois eles fazem a portabilidade para novos serviços de apoio relativamente tranquilas. Mas todos os deploys do app (ambientes de desenvolvimento, homologação, produção) devem usar o mesmo tipo e versão de cada serviço de apoio.
