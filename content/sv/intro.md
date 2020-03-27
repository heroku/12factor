Introduktion
============

I den moderna eran av systemutveckling levereras mjukvara rutinmässigt som en tjänst: kallade *webbapplikationer* eller *mjukvara-som-tjänst*. Tolvfaktor-modellen är en metodologi för att bygga applikationer som mjukvara-som-tjänst som:

* Användare **deklarativ** format för automering av uppsättning, för att minimera tid och kostnad för nya utvecklare att komma in i projektet;
* Use **declarative** formats for setup automation, to minimize time and cost for new developers joining the project;
* Har ett **rent kontrakt** mot den underliggande operativsystemet, vilket erbjuder **maximal portabilitet** mellan olika körmiljöer;
* Have a **clean contract** with the underlying operating system, offering **maximum portability** between execution environments;
* Är lämpliga för **produktionssättning** på moderna **molnplattformer**, vilket eliminerar behovet av server- och system-administration;
* Are suitable for **deployment** on modern **cloud platforms**, obviating the need for servers and systems administration;
* **Minimerar avvikelse** mellan utveckling och produktion, vilket möjliggör **continuous deployment** för maximal kvickhet;
* **Minimize divergence** between development and production, enabling **continuous deployment** for maximum agility;
* Och kan **skapa upp** utan avgörande ändringar i behov av verktyg, arkitektur eller utvecklingsmetoder.
* And can **scale up** without significant changes to tooling, architecture, or development practices.

Tolvfaktor-modellen kan appliceras på applikationer oavsett programmeringsspråk, och som använder valfri kombination av stödtjänster (databas, köhantering, minneshantering, etc). 
The twelve-factor methodology can be applied to apps written in any programming language, and which use any combination of backing services (database, queue, memory cache, etc).
