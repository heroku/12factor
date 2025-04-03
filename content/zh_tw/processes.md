## VI. 進程
### 以一個或多個無狀態進程運行應用

運行環境中，應用程序通常是以一個和多個 *進程* 運行的。

最簡單的場景中，代碼是一個獨立的腳本，運行環境是開發人員自己的筆記本電腦，進程由命令行運行（例如`python my_script.py`）。另外一個極端情況是，複雜的應用可能會使用很多 [進程類型](./concurrency) ，也就是零個或多個進程實例。

**12-Factor 應用的進程必須無狀態且 [無共享](http://en.wikipedia.org/wiki/Shared_nothing_architecture) 。** 任何需要持久化的數據都要存儲在 [後端服務](./backing-services) 內，比如資料庫。

內存區域或硬碟空間可以作為進程在做某種事務型操作時的快取，例如下載一個很大的文件，對其操作並將結果寫入資料庫的過程。12-Factor應用根本不用考慮這些快取的內容是不是可以保留給之後的請求來使用，這是因為應用啟動了多種類型的進程，將來的請求多半會由其他進程來服務。即使在只有一個進程的情形下，先前保存的數據（內存或文件系統中）也會因為重啟（如代碼部署、配置更改、或運行環境將進程調度至另一個物理區域執行）而丟失。

源文件打包工具（[Jammit](http://documentcloud.github.com/jammit/), [django-compressor](http://django-compressor.readthedocs.org/)） 使用文件系統來緩存編譯過的源文件。12-Factor 應用更傾向於在 [構建步驟](./build-release-run) 做此動作——正如 [Rails資源管道](http://guides.rubyonrails.org/asset_pipeline.html) ，而不是在運行階段。

一些網路系統依賴於 “[黏性 session ](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence)”， 這是指將用戶 session 中的數據快取至某進程的內存中，並將同一用戶的後續請求路由到同一個進程。黏性 session 是 12-Factor 極力反對的。session 中的數據應該保存在諸如 [Memcached](http://memcached.org/) 或 [Redis](http://redis.io/) 這樣帶有過期時間的快取系統中。
