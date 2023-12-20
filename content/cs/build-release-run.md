## V. Sestavení, vydání, spuštění
### Striktně oddělte fáze sestavení, vydání a spuštění.

[Zdrojový kód](./codebase) je transformován do (nevývojářského) nasazení ve třech fázích:

* Fáze *sestavení (build)* je transformace, která převede zdrojový kód do spustitelného balíčku zvaného *sestavení*. Z verze kódu v čase příslušného commitu a dle postupu nasazení, dojde ve fázi sestavení ke stažení [závislostí](./dependencies), zkompilování binárek a připojení assetů.
* Fáze *vydání (release)* vezme sestavení vytvořené v předchozím kroku a zkombinuje ho  [konfigurací](./config) pro dané nasazení. Výsledná kombinace je *vydáním*, které je připravené k okamžitému spuštění v běhovém prostředí.
* Fáze *spuštění (run)* (známá též jako "runtime") spustí aplikaci v běhovém prostředí nastartováním aplikačních [procesů](./processes) oproti danému vydání.

![Kód se stane sestavením, které v kombinaci s příslušnou konfigurací tvoří vydání.](/images/release.png)

**Twelve-factor aplikace striktně rozlišují mezi fází sestavení, vydání a spuštění.** Je například nemožné provedět změny ve spuštěném kódu, protože není cesty, jak tyto změny propagovat zpět do fáze sestavení.

Nástroje pro nasazení obvykle poskytují i správu vydání a zejména pak schopnost vrátit se zpět k předchozímu vydání. Například nástroj [Capistrano](https://github.com/capistrano/capistrano/wiki) si ukládá nasazení v podadresáři zvaném `releases` a aktuální vydání je pak symlink na příslušný adresář s aktuální verzí. Příkaz `rollback` pak velmi snadno zajistí návrat k předchozímu vydání.

Každé vydaní by mělo mít vždy unikátní ID, jako je například časová značka ( `2011-04-06-20:32:17`) nebo inkrementální číslo (například `v100`). Vydání již nelze po vytvoření jakkoliv upravovat, libovolná změna musí vždy vytvořit nové vydání.

Sestavení iniciují vývojáři aplikace, kdykoliv se nasazuje nový kód. Naopak ke spuštění v běhovém prostředí může dojít automaticky v případě restartu serveru nebo restartem havarovaného procesu pomocí správce procesů. Proto by měla mít fáze spuštění co nejméně pohyblivých částí, jelikož problémy bránící aplikaci v běhu mohou nastat uprostřed noci, kdy nejsou žádní vývojáři k dispozici. Fáze sestavení pak může být složitější, protože chyby jsou více na očích pro vývojáře kontrolující nasazení aplikace.

