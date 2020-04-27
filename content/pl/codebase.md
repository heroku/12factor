## I. Codebase
### Jedno źródło kodu śledzone systemem kontroli wersji, wiele wdrożeń

Aplikacja 12factor zawsze jest zarządzana w systemie kontroli wersji takim jak [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), czy [Subversion](http://subversion.apache.org/). Miejsce, w którym trzymany i rewizjonowany jest kod nazywane jest *repozytorium kodu źródłowego*, często skracane do samego *code repo*, albo po prostu *repo*.

*Codebase* (baza kodu) jest więc niczym innym jak pojedynczym repo (w przypadku zcentralizowanego systemu kontroli wersji jak Subversion), albo zestawem repozytoriów, które współdzielą tzw. root commit. (w przypadku zdecentralizowanego systemu jak Git).

![Jeden codebase, wiele wdrożeń](/images/codebase-deploys.png)

Aplikacja powinna zawsze odzwierciedlać bazowy kod:

* Jeśli istnieje wiele źródeł, z których pobierany jest kod, nie można mówić o aplikacji, a systemie rozproszonym. Każdy komponent w systemie rozproszonym będzie wtedy aplikacją i każdy z osobna może spełniać wszystkie zasady 12factor.
* Jeśli wiele aplikacji dzieli ten sam kod, mamy do czynienia z naruszeniem 12factor. Wyjściem z tej sytuacji może być wyizolowanie współdzielonego kodu do bibliotek, które będą dodane do aplikacji przez tzw. [dependency manager](./dependencies).

Aplikacja może posiadać tylko jeden codebase, jednocześnie mając wiele wdrożeń.  *Deploy* (z ang. wdrożenie) jest działającą instancją aplikacji. Zazwyczaj mówi się o wersji produkcyjnej i jednej lub więcej przedprodukcyjnych. Ponadto każdy developer pracujący nad aplikacją posiada jej kopię działającą w swoim lokalnym środowisku developerskim, co również kwalifikuje się jako osobne wdrożenie.

Codebase jest taki sam dla wszystkich wdrożeń aplikacji, jednak poszczególne wdrożenia aplikacji mogą korzystać z jego różnych wersji. Dla przykładu, developer pracujący nad aplikacją może nanieść zmiany, które nie znajdą się jeszcze w wersji produkcyjnej. Obie wersje dzielą jednak ten sam codebase, przez co kwalifikują się jako osobne wdrożenia tej samej aplikacji. 
