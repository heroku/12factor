## VI. Processos
### Execute a aplicação como um ou mais processos que não armazenam estado

A aplicação é executada em um ambiente de execução como um ou mais *processos*.

No caso mais simples, o código é um script autônomo, o ambiente de execução é o laptop local de um desenvolvedor com o runtime da linguagem instalado, e o processo é iniciado pela linha de comando (por exemplo, `python my_script`). Na outra extremidade do espectro, o deploy em produção de uma aplicação sofisticada pode utilizar vários [tipos de processos, instanciado em zero ou mais processos em andamento](./concurrency).

**Processos doze-fatores são stateless(não armazenam estado) e [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** Quaisquer dados que precise persistir deve ser armazenado em um serviço de apoio stateful(que armazena o seu estado), tipicamente uma base de dados.

O espaço de memória ou sistema de arquivos do processo pode ser usado como um breve, cache de transação única. Por exemplo, o download de um arquivo grande, operando sobre ele, e armazenando os resultados da operação no banco de dados. A aplicação doze-fatores nunca assume que qualquer coisa cacheada na memória ou no disco estará disponível em uma futura solicitação ou job -- com muitos processos de cada tipo rodando, as chances são altas de que uma futura solicitação será servida por um processo diferente. Mesmo quando rodando em apenas um processo, um restart (desencadeado pelo deploy de um código, mudança de configuração, ou o ambiente de execução realocando o processo para uma localização física diferente) geralmente vai acabar com todo o estado local (por exemplo, memória e sistema de arquivos).

Empacotadores de assets (como [Jammit](http://documentcloud.github.io/jammit/) ou [django-compressor](http://django-compressor.readthedocs.org/)) usa o sistema de arquivos como um cache para assets compilados. Uma aplicação doze-fatores prefere fazer isto compilando durante a [fase de build](./build-release-run), tal como o [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), do que em tempo de execução.

Alguns sistemas web dependem de ["sessões persistentes"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- ou seja, fazem cache dos dados da sessão do usuário na memória do processo da aplicação, esperando futuras requisições do mesmo visitante para serem encaminhadas para o mesmo processo. Sessões persistentes são uma violação do doze-fatores e nunca devem ser utilizadas ou invocadas. Dados do estado da sessão são bons candidatos para um datastore que oferece tempo de expiração, tal como [Memcached](http://memcached.org/) ou [Redis](http://redis.io/).
