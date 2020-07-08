## IV. 後端服務
### 把後端服務(*backing services*)當作附加資源

*後端服務*是指程序運行所需要的通過網絡調用的各種服務，如資料庫（[MySQL](http://dev.mysql.com/)，[CouchDB](http://couchdb.apache.org/)），消息/隊列系統（[RabbitMQ](http://www.rabbitmq.com/)，[Beanstalkd](http://kr.github.com/beanstalkd/)），SMTP 郵件發送服務（[Postfix](http://www.postfix.org/)），以及快取系統（[Memcached](http://memcached.org/)）。

類似資料庫的後端服務，通常由部署應用程序的系統管理員一起管理。除了本地服務之外，應用程序有可能使用了第三方發布和管理的服務。範例包括 SMTP（例如 [Postmark](http://postmarkapp.com/)），數據收集服務（例如 [New Relic](http://newrelic.com/) 或 [Loggly](http://www.loggly.com/)），數據存儲服務（如 [Amazon S3](http://http://aws.amazon.com/s3/)），以及使用 API 訪問的服務（例如 [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), [Last.fm](http://www.last.fm/api)）。

**12-Factor 應用不會區別對待本地或第三方服務。** 對應用程序而言，兩種都是附加資源，通過一個 url 或是其他存儲在 [配置](./config) 中的服務定位/服務證書來獲取數據。12-Factor 應用的任意 [部署](./codebase) ，都應該可以在不進行任何代碼改動的情況下，將本地 MySQL 資料庫換成第三方服務（例如 [Amazon RDS](http://aws.amazon.com/rds/)）。類似的，本地 SMTP 服務應該也可以和第三方 SMTP 服務（例如 Postmark ）互換。上述兩個例子中，僅需修改配置中的資源地址。

每個不同的後端服務是一份 *資源* 。例如，一個 MySQL 資料庫是一個資源，兩個 MySQL 資料庫（用來數據分區）就被當作是兩個不同的資源。12-Factor 應用將這些資料庫都視作 *附加資源* ，這些資源和它們附屬的部署保持鬆耦合。

<img src="/images/attached-resources.png" class="full" alt="一種部署附加4個後端服務" />

部署可以按需要加載或卸載資源。例如，如果應用的資料庫服務由於硬體問題出現異常，管理員可以從最近的備份中恢復一個資料庫，卸載當前的資料庫，然後加載新的資料庫 -- 整個過程都不需要修改程式碼。
