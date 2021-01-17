Giriş
==========

Modern çağda yazılımlar çoğunlukla "web uygulaması" ya da "yazılım hizmeti" olarak isimlendirilen servisler olarak sunulurlar. *On iki faktörlü uygulama*, servis olarak çalışan yazılımlar (İng. *software as a service* veya *SaaS*) geliştirmek için bir yöntembilimdir. Bu yöntembilimin kuralları ve faydaları şunlardır:

* Projenin kurulum otomasyonu için **açıklayıcı** (İng. declarative) biçimler kullanır. Bu şekilde, projeye yeni katılan geliştiricilerin geliştirmeye başlama zamanını ve maliyetinı en aza indirir;
* Üzerinde çalıştığı işletim sistemi ile arasında **basit bir bağlılık** vardır. Bu, tüm çalıştırma ortamlarına (Docker gibi *container* sistemleri ve sıradan işletim sistemlerine) **maksimum uyumluluk** sağlar;
* Sunucu ve sistem yönetimine olan ihtiyacı ortadan kaldıran modern **bulut platformlarına kurulum** için uygundur;
* Geliştirme ve canlı yayın ortamları arasında **farklılıklaşmayı minimize ederek**, maksimum çeviklik ile **sürekli dağıtımı**n önünü açar;
* Kullanılan araçlarda, mimaride veya geliştirme pratiklerinde önemli değişikliklere gerek duymadan **ölçeklenebilir**.

On iki faktör uygulaması herhangi bir programlama dili ile yazılmış ve yardımcı (veritabanları, kuyruk işleyiciler, önbellek, vb. gibi) servislerin herhangi bir kombinasyonuna sahip tüm uygulamalara uygulanabilir.
