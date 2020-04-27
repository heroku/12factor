## VII. Vínculo de Portas
### Exporte serviços via vínculo de portas

Apps web as vezes são executadas dentro de container de servidor web. Por exemplo, apps PHP podem rodar como um módulo dentro do [Apache HTTPD](http://httpd.apache.org/), ou apps Java podem rodar dentro do [Tomcat](http://tomcat.apache.org/).

**O aplicativo doze-fatores é completamente auto-contido** e não depende de injeções de tempo de execução de um servidor web em um ambiente de execução para criar um serviço que defronte a web. O app web **exporta o HTTP como um serviço através da vínculação a uma porta**, e escuta as requisições que chegam na mesma.

Num ambiente de desenvolvimento local, o desenvolvedor visita a URL de um serviço como `http://localhost:5000/` para acessar o serviço exportado pelo seu app. Num deploy, uma camada de roteamento manipula as requisições de rotas vindas de um hostname público para os processos web atrelados às portas.

Isso é tipicamente implementado usando [declaração de dependências](./dependencies) para adicionar uma biblioteca de servidor ao app, tal como [Tornado](http://www.tornadoweb.org/) para Python, [Thin](http://code.macournoyer.com/thin/) para Ruby, ou [Jetty](http://www.eclipse.org/jetty/) para Java e outra linguagens baseadas na JVM. Isso acontece completamente no *espaço do usuário*, isso é, dentro do código do app. O contrato com o ambiente de execução é vincular a uma porta para servir requisições.

HTTP não é o único serviço que pode ser exportado via vínculo de portas. Quase todos os tipos de software servidores podem rodar via um processo vinculado a uma porta e aguardar as requisições chegar. Exemplos incluem [ejabberd](http://www.ejabberd.im/) (comunicando via [XMPP](http://xmpp.org/)), e [Redis](http://redis.io/) (comunicando via [protocolo Redis](http://redis.io/topics/protocol)).

Note que a abordagem de vincular portas significa que um app pode se tornar o [serviço de apoio](./backing-services) para um outro app, provendo a URL do app de apoio como um identificador de recurso na [configuração](./config) para o app consumidor.
