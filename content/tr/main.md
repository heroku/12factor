## Giriş

Modern çağda yazılımlar yaygın olarak servis olarak sunulur;*web uygulamaları* ya da *yazılım hizmetleri*. On iki faktörlü uygulama, aşağıdaki gibi bir yazılım hizmeti oluşturmak için bir yöntemdir:

* Projeye katılan yeni geliştiriciler için zaman ve maliyeti en aza indirmek için ayar otomasyonu için **bildirim** biçimleri kullanılır;
* Çalışma ortamları arasında maksimum taşınabilirlik sunan temel işletim sistemi ile **şifresiz sözleşmesi** vardır
* Sunucu ve sistem yönetimine olan ihtiyacı ortadan kaldıran modern **bulut platformlarına kurulum** için uygundur;
* İşlem, mimari veya geliştirme uygulamalarında önemli değişiklikler olmaksızın **ölçek büyültülebilir**.

On iki faktör uygulaması herhangi bir programlama dili ile yazılmış uygulamalara uygulanabilir ve destek servislerinin herhangi bir kombinasyonu kullanılabilir (Veritabanı, kuyruk, önbellek vb.).

## Arkaplan

Bu belgeye katkıda bulunan kişiler, yüzlerce uygulamanın geliştirilmesi ve dağıtılmasında doğrudan yer almış, ve dolaylı olarak <a href="http://www.heroku.com/" target="_blank">Heroku</a> platformundaki üzerinde çalıştığımız yüz binlerce uygulamanın geliştirilmesi, çalıştırılması ve ölçeklendirilmesine tanık olmuştur.

Bu belge, çok çeşitli yazılım servislerinin, yabancı ortamdaki deneyim ve gözlemlerini birleştirir.
Bu uygulama geliştirimindeki uygun, ideal uygulamalarda bir üçgenleştirme vardır; uygulamanın zamanla olan doğal gelişmesinin, büyümesinin temel etmenlerine dikkat etmek, uygulamanın kod tabanında çalışan yazılımcıların arasındaki işbirliğinin önemli noktaları ve <a href="http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/" target="_blank">yazılım erozyonunun getirdiği ücretten kaçmak</a>.

Bizim motivasyonumuz, modern uygulama geliştirmesinde gördüğümüz bazı sistemik problemlerin farkındalığını arttırmak, terimlerle birlikte geniş kavramsal çözüm setleri sağlamak ve bu problemleri tartışmak için ortak bir kelime sunmakdır. Martin Fowler'ın kitabları *<a href="https://books.google.com/books/about/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC" target="_blank">Patterns of Enterprise Application Architecture</a>* ve *<a href="https://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C" target="_blank">Refactoring'den</a>* ilham alınmıştır.

## Bu belgeyi kim okumalı?

Herhangi bir çalışan uygulama geliştirenler. Bu tür uygulamaları dağıtan ve yöneten Ops mühendisleri.
