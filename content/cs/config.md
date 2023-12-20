## III. Konfigurace
### Konfigurace ukládejte do prostředí.

*Konfigurace* aplikace je všechno, co se liší mezi [nasazeními](./codebase) (testovací, produkční, vývojové prostředí, atd.). To zahrnuje:

* Přihlašovací údaje k databázím, Memcached a dalším [podpůrným službám](./backing-services).
* Přístupové údaje k externím službám jako je Amazon S3 nebo Twitter.
* Specifické hodnoty pro dané nasazení jako například kanonické názvy hostitelů.

Aplikace si někdy ukládají konfiguraci jako konstanty v kódu. To je porušení twelve-factor metodiky, která vyžaduje **přísné oddělení konfigurace od kódu**. Konfigurace se mezi nasazeními značně liší, kód však nikoliv.

Test lakmusovým papírkem na správné oddělení konfigurace od kódu je fakt, že aplikace by mohla být kdykoliv uvolněna jako open source bez kompromitace přístupových údajů.

Nutno podotknout, že do definice "konfigurace" *nepatří* interní nastavení aplikace jako je například `config/routes.rb` v Rails nebo nastavení [propojení základních modulů](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) ve [Springu](http://spring.io/). Tento typ konfigurace se neliší mezi nasazeními a je nejlepší ho ponechat v kódu.

Další možností jak přistupovat ke konfiguracím je mít konfigurační soubory, které nejsou uložené ve verzovacím systému, jak je tomu například u `config/database.yml` v Rails. To je obrovské zlepšení oproti konstantám uloženým v repozitáři, tento přístup má však stále několik slabin: je velmi jednoduché omylem uložit tento soubor do repozitáře; chtě nechtě jsou tyto soubory obvykle rozmístěny na několika místech a v různých formátech, což komplikuje jejich centrální správu. Navíc jsou tyto konfigurační soubory často specifické pro daný jazyk či framework.

**Twelve-factor aplikace ukládají konfiguraci do proměnných prostředí** (často zkracováno jak *env vars* nebo *env*). Proměnné prostředí se dají jednoduše měnit mezi nasazeními bez zásahu do kódu. Oproti konfiguračním souborům je zde velmi malá šance, že by byly omylem uloženy do repozitáře a narozdíl od vlastních konfiguračních souborů a jiných konfiguračních mechanismů, jako například Java System Properties, jsou nezávislé na jazyce a operačním systému. 

Dalším úskalím správy konfigurace je seskupování. Aplikace někdy seskupují konfigurace do pojmenovaných skupin (často nazývaných jako "prostředí"), rozlišených podle specifického nasazení, jako například `vývojové`, `testovací` nebo `produkční` prostředí. Tento přístup lze jen velmi težko čistě škálovat. Jak přibývají nasazení jsou zapotřebí nová prostředí, jako například `staging` nebo `qa`. Jakmile projekt začne narůstat, vývojáři přidávají svoje specifická prostředí jako třeba `joes-staging`, což má za následek kombinatorickou explozi konfigurací a správa nasazení se tak stáva velmi delikátní záležitostí.

Ve twelve-factor aplikaci jsou proměnné prostředí jako vzájemně nezávislé ovládací prvky. Ty nejsou nikdy seskupovány do "prostředí", namísto toho jsou všechny spravovány nezávisle pro každé nasazení. Tento model plynule škáluje s přirozeně se rozrůstající aplikací a narůstajícím počtem nasazení během celého životního cyklu aplikace.
