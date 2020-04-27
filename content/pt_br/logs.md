## XI. Logs
### Trate logs como fluxos de eventos

*Logs* provém visibilidade no comportamento de um app em execução. Em ambientes de servidor eles são comumente escritos num arquivo em disco (um "logfile"); mas este é apenas um formato de saída.

Logs são o [fluxo](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) de eventos agregados e ordenados por tempo coletados dos fluxos de saída de todos os processos em execução e serviços de apoio. Logs na sua forma crua são tipicamente um formato de texto com um evento por linha (apesar que pilhas de exceção podem ocupar várias linhas). Logs não tem começos ou términos fixos, mas fluem continuamente enquanto o app estiver operante.

**Um app doze-fatores nunca se preocupa com o roteamento ou armazenagem do seu fluxo de saída.** Ele não deve tentar escrever ou gerir arquivos de logs. No lugar, cada processo em execução escreve seu próprio fluxo de evento, sem buffer, para o `stdout`. Durante o desenvolvimento local, o desenvolvedor verá este fluxo no plano de frente do seu terminal para observar o comportamento do app.

Em deploys de homologação ou produção, cada fluxo dos processos serão capturados pelo ambiente de execução, colados com todos os demais fluxos do app, e direcionados para um ou mais destinos finais para visualização e arquivamento de longo prazo. Estes destinos de arquivamento não são visíveis ou configuráveis pelo app, e ao invés disso, são completamente geridos pelo ambiente de execução. Roteadores de log open source (tais como [Logplex](https://github.com/heroku/logplex) e [Fluentd](https://github.com/fluent/fluentd)) estão disponíveis para este propósito.

O fluxo de evento para um app pode ser direcionado para um arquivo, ou visto em tempo real via `tail` num terminal. Mais significativamente, o fluxo pode ser enviado para um sistema indexador e analisador tal como [Splunk](http://www.splunk.com/), ou um sistema mais genérico de _data warehousing_ como o [Hadoop/Hive](http://hive.apache.org/). Estes sistemas permitem grande poder e flexibilidade para observar o comportamento de um app durante o tempo, incluindo:

* Encontrando eventos específicos no passado.
* Gráficos em larga escala de tendências (como requisições por minuto)
* Notificações ativas de acordo com as heurísticas determinadas pelo usuário (como uma notificação quando a quantidade de erros por minuto exceder um certo limite).
