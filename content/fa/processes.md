## VI. فرآیندها
### برنامه را به عنوان یک یا چند فرآیند بدون حالت اجرا کنید

برنامه در محیط اجرا به صورت یک یا چند *فرآیند* اجرا می شود.

در ساده‌ترین حالت، کد یک اسکریپت مستقل است، محیط اجرا یک لپ‌تاپ محلی توسعه‌دهنده با زمان اجرا زبان نصب‌شده است، و فرآیند از طریق خط فرمان راه‌اندازی می‌شود (به عنوان مثال، «python my_script.py»). در سوی دیگر طیف، استقرار تولید یک برنامه پیچیده ممکن است از بسیاری [انواع فرآیند، نمونه‌سازی شده در فرآیندهای در حال اجرا صفر یا بیشتر] (./concurrency) استفاده کند.

**فرآیندهای دوازده عاملی بدون حالت هستند و [اشتراک گذاری هیچ چیز](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** هر داده ای که نیاز به تداوم دارد باید در یک [سرویس پشتیبان] حالت دار ذخیره شود(. /backing-services)، معمولاً یک پایگاه داده.

فضای حافظه یا فایل سیستم فرآیند را می توان به عنوان یک کش مختصر و تک تراکنش استفاده کرد. به عنوان مثال، دانلود یک فایل بزرگ، عملیات بر روی آن و ذخیره نتایج عملیات در پایگاه داده. برنامه دوازده عاملی هرگز فرض نمی کند که هر چیزی که در حافظه نهان یا روی دیسک ذخیره شده است در یک درخواست یا کار آینده در دسترس خواهد بود -- با اجرای بسیاری از فرآیندها از هر نوع، احتمال اینکه درخواست آینده توسط یک فرآیند متفاوت ارائه شود بسیار زیاد است. حتی زمانی که فقط یک فرآیند را اجرا می‌کنید، یک راه‌اندازی مجدد (با استقرار کد، تغییر پیکربندی یا محیط اجرا که فرآیند را به مکان فیزیکی دیگری منتقل می‌کند) معمولاً تمام وضعیت‌های محلی (مانند حافظه و سیستم فایل) را از بین می‌برد.

بسته‌کننده‌های دارایی مانند [django-assetpackager](http://code.google.com/p/django-assetpackager/) از سیستم فایل به عنوان حافظه پنهان برای دارایی‌های کامپایل شده استفاده می‌کنند. یک برنامه دوازده عاملی ترجیح می دهد این کامپایل را در طول [مرحله ساخت] (/build-release-run) انجام دهد. بسته‌کننده‌های دارایی مانند [Jammit](http://documentcloud.github.io/jammit/) و [Rails asset pipeline] (http://ryanbigg.com/guides/asset_pipeline.html) را می‌توان برای بسته‌بندی دارایی‌ها پیکربندی کرد مرحله ساخت

برخی از سیستم‌های وب به ["جلسات چسبنده"] (http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) متکی هستند -- یعنی ذخیره داده‌های جلسه کاربر در حافظه فرآیند برنامه و انتظار آینده درخواست از همان بازدید کننده برای هدایت به همان فرآیند. جلسات چسبناک نقض دوازده عامل است و هرگز نباید از آنها استفاده کرد یا به آنها اعتماد کرد. داده‌های وضعیت جلسه کاندیدای خوبی برای ذخیره‌سازی داده‌ای است که دارای انقضای زمانی است، مانند [Memcached](http://memcached.org/) یا [Redis] (http://redis.io/).