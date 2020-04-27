## V. Construa, lance, execute
### Separe estritamente os estágios de construção e execução

Uma [base de código](./codebase) é transformada num deploy (de não-desenvolvimento) através de três estágios:

* O *estágio de construção* é uma transformação que converte um repositório de código em um pacote executável conhecido como *construção*. Usando uma versão do código de um commit especificado pelo processo de desenvolvimento, o estágio de construção obtém e fornece [dependências](./dependencies) e compila binários e ativos.
* O *estágio de lançamento* pega a construção produzida pelo estágio de construção e a combina com a atual [configuração](./config) do deploy. O *lançamento* resultante contém tanto a construção quanto a configuração e está pronta para execução imediata no ambiente de execução.
* O *estágio de execução* roda o app no ambiente de execução, através do início de alguns dos [processos](./processes) do app com um determinado lançamento.

![Código vira uma construção, que é combinada com a configuração para se criar um lançamento.](/images/release.png)

**O app doze-fatores usa separação estrita entre os estágios de construção, lançamento e execução.** Por exemplo, é impossível alterar código em tempo de execução, já que não há meios de se propagar tais mudanças de volta ao estágio de construção.

Ferramentas para deploy tipicamente oferecem ferramentas de gestão de lançamento, mais notadamente a habilidade de se reverter à um lançamento prévio. Por exemplo, a ferramenta de deploy [Capistrano](https://github.com/capistrano/capistrano/wiki) armazena lançamentos em um subdiretório chamado `releases`, onde o lançamento atual é um link simbólico para o diretório de lançamento atual. Seu comando `rollback` torna fácil reverter para um lançamento prévio.

Cada lançamento deve sempre ter um identificador de lançamento único, tal qual o timestamp do lançamento (como `2011-04-06-20:32:17`) ou um número incremental (como `v100`). Lançamentos são livro-razões onde apenas se acrescenta informações, ou seja, uma vez criado o lançamento não pode ser alterado. Qualquer mudança deve gerar um novo lançamento.

Construções são iniciadas pelos desenvolvedores do app sempre que novos códigos entram no deploy. A execução de um executável, todavia, pode acontecer automaticamente em casos como o reinício do servidor, ou um processo travado sendo reiniciado pelo gerenciador de processos. Assim, no estágio de execução deve haver quanto menos partes móveis quanto possível, já que problemas que previnem um app de rodar pode causá-lo a travar no meio da noite quando não há desenvolvedores por perto. O estágio de construção pode ser mais complexo, já que os erros estão sempre à vista do desenvolvedor que está cuidando do deploy.
