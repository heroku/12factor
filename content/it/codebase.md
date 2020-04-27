## I. Codebase
### Una sola codebase sotto controllo di versione, tanti deploy

Un'app conforme alla metodologia twelve-factor è sempre sotto un sistema di controllo di versione, sia essa [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), o [Subversion](http://subversion.apache.org/). Una copia della codebase è detta *code repository*, oppure più in breve *code repo* o *repo*.

Una *codebase* è quindi un singolo repository (in un sistema centralizzato come Subversion), oppure un set di repo che condividono una root commit (in un sistema di controllo decentralizzato come Git).

![Una codebase, N deployment](/images/codebase-deploys.png)

C'è sempre una relazione uno-ad-uno tra codebase e applicazione:

* Se ci sono più codebase, non si parla più di applicazione ma di sistema distribuito. Ogni componente in un sistema distribuito è un'applicazione, e ognuna di queste applicazioni può individualmente aderire alla metodologia twelve-factor.
* Se più applicazioni condividono lo stesso codice si ha una violazione del twelve-factor. La soluzione è, ovviamente, quella di sistemare il codice in modo adeguato, in modo tale da essere incluso eventualmente dove necessario tramite un [dependency manager](./dependencies).

Quindi: una sola codebase per applicazione, ma ci saranno comunque tanti deployment della stessa app. Per *deploy* si intende un'istanza dell'applicazione. Può essere il software in produzione, oppure una delle varie istanze in staging. Ancora, un deploy può essere la copia posseduta dal singolo sviluppatore nel suo ambiente locale.

La codebase rimane comunque sempre la stessa su tutti i deployment, anche se potrebbero essere attive diverse versioni nello stesso istante. Si pensi per esempio a uno sviluppatore che possiede dei commit in più che non ha ancora mandato in staging. Nonostante questo, comunque, rimane la condivisione della stessa codebase, nonostante la possibilità di avere più deploy della stessa app.
