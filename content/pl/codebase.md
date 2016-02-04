## I. Codebase
### Jedno źródło kodu śledzone systemem kontroli wersji, wiele wdrożeń

Aplikacja napisana wg dwunastu aspektów jest zawsze śledzona w systemie kontroli wersji takim jak [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), czy [Subversion](http://subversion.apache.org/). Miejsce, w którym trzymany i rewizjonowany jest kod nazywane jest *repozytorium kodu źródłowego*, często skracane do samego *code repo*, albo po prostu *repo*.

*Codebase* jest więc niczym innym jak pojedynczym repo (w przypadku zcentralizowanego systemu kontroli wersji jak Subversion), albo zestawem repozytoriów, które współdzielą tzw. root commit. (w przypadku zdecentralizowanego systemu jak Git).

![One codebase maps to many deploys](/images/codebase-deploys.png)

Aplikacja powinna zawsze odzwierciedlać codebase:

* Jeśli jest wiele źródeł, z których pobierany jest kod, nie jest to aplikacja, a system rozproszony. Każdy komponent w systemie rozproszonym jest aplikacją i każdy możte z osobna spełniać wszystkie 12 aspektów.
* Wiele aplikacji dzielących ten sam kod jest naruszeniem 12 aspektów. Roziwązaniem tej sytuacji może być wyizolowanie współdzielonego kodu do bibliotek, które mogą być załączane przez tzw. [dependency manager](./dependencies).

Jest tylko jeden codebase na aplikację, jednak może być wiele różnych wdrożeń tej samej aplikacji.  *Deploy* (z ang. wdrożenie) jest działającą instancją aplikacji. Zazwyczaj jest to wersja produkcyjna i jedna lub więcej w środowisku przedprodukcyjnym. Dodatkowo każdy developer posiada kopię aplikacji działającą na swoim lokalnym środowisku developerskim, która również kwalifikuje się jako deploy.

Codebase jest taki sam dla wszystkich wdrożeń aplikacji, jednak jego różne wersje mogą być aktywne w różnych wdrożeniach. Dla przykładu, developer pracujący nad aplikacją może nanieść zmiany, które nie znajdą się jeszcze w wersji produkcyjnej. Obie wersje dzielą jednak ten sam codebase, przez co kwalifikują się jako różne deploye tej samej aplikacji. 
