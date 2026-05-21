## I. codebase
### Satu codebase dilacak dalam kendali revisi, banyak deploy

Sebuah duabelas-faktor app selalu terlacak dalam sebuah sistem kendali revisi, semacam [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), atau [Subversion](http://subversion.apache.org/). sebuah salinan dari basis data pelacakan versi dikenal sebagai *code repository* atau hanya *repo*.

suatu *codebase* adalah sebuah repo (dalam sebuah sistem kendali revisi terpusat seperti Suberversion), atau dari set repo yang berbagai sebuat akar commit (dalam sebuah sistem kendali revisi terpisah seperti Git).

![satu codebase terpetakan ke banyak terapan](/images/codebase-deploys.png)

selalu ada korelasi satu ke satu antara codebase dan app.

* Jika ada banyak codebase, maka itu bukanlah sebuah app -- itu adalah sistem terdistribusi. Setiap komponen dalam sebuah sistem terdistribusi adalah sebuah app, dan setiap app tersebut dapat secara individual comply dengan duabelas-faktor.
* app berbeda yang berbagi kode yang sama adalah sebuah pelanggaran dari duabelas-faktor. solusi untuk persoalan ini dengan menerapkan kode yang dipakai app berbeda tersebut ke dalam libraries yang diikutkan melalui [manajer dependency](./dependencies).

Hanya ada satu codebase per app, namun akan ada banyak penerapan dari sebuah app. sebuah *deploy* adalah instansiasi berjalan dari sebuah app. Hal ini umum diterapkan sebuah situs produksi dan di satu atau beberapa situs percobaan. Tambahan lain, setiap developer memiliki sebuah salinan dari app yang berjalan di lingkyungan pengembangan lokal masing-masing, setiap dari itu dapat dianggap sebagai sebuah deploy.

Codebase sama untuk seluruh deploy, walaupun terdapat versi berbeda yang aktif di setiap deploy. contohnya, seorang developer mungkin memiliki beberapa commit yang belum terdeploy untuk percobaan; percobaan memiliki beberapa commit yang tidak ter-deploy untuk produksi. Tetapi semua berbagi codebase yang sama, sehingga dapat diartikan teridentifikasi sebgai deloy yang berbeda dari sebuah app yang sama.


