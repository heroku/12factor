## IX. 易處理
### 透過快速啟動和正常終止以最大程度的提高強健性

**12-Factor 應用的 [進程](./processes) 是 *易處理（disposable）*的，意思是說它們可以瞬間開啟或停止。** 這有利於快速、彈性的伸縮應用，迅速部署變化的 [代碼](./codebase) 或 [配置](./config) ，穩健的部署應用。

進程應當追求 **最小啟動時間** 。 理想狀態下，進程從敲下命令到真正啟動並等待請求之間應該只需要很短的時間。更少的啟動時間提供了更敏捷的 [發布](./build-release-run) 以及擴展過程，此外還增加了強健性，因為進程管理器可以在授權情形下簡單的將進程搬到新的物理機器上。

進程 **一旦接收 [終止信號（`SIGTERM`）](http://en.wikipedia.org/wiki/SIGTERM) 就會優雅的終止** 。就網路進程而言，優雅終止是指停止監聽服務的端口，即拒絕所有新的請求，並繼續執行目前已接收的請求，然後退出。此類型的進程所隱含的要求是HTTP請求大多都很短(不會超過幾秒鐘)，而在長時間輪詢中，客戶端在丟失連接後應該馬上嘗試重連。

對於 worker 進程來說，優雅終止是指將當前任務退回隊列。例如，[RabbitMQ](http://www.rabbitmq.com/) 中，worker 可以發送一個[`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack)信號。 [Beanstalkd](http://kr.github.com/beanstalkd/) 中，任務終止並退回隊列會在worker斷開時自動觸發。有鎖機制的系統諸如 [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) 則需要確定釋放了系統資源。此類型的進程所隱含的要求是，任務都應該 [可重覆執行](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29) ， 這主要由將結果包裝進事務或是使重覆操作 [冪等](http://en.wikipedia.org/wiki/Idempotence) 來實現。

進程還應當**在面對突然死亡時保持強健**，例如底層硬體故障。雖然這種情況比起優雅終止來說少之又少，但終究有可能發生。一種推薦的方式是使用一個強健的後端隊列，例如 [Beanstalkd](http://kr.github.com/beanstalkd/) ，它可以在客戶端斷線或逾時後自動退回任務。無論如何，12-Factor 應用都應該可以設計能夠應對意外的、不優雅的終結。[Crash-only design](http://lwn.net/Articles/191059/) 將這種概念轉化為 [合乎邏輯的理論](http://couchdb.apache.org/docs/overview.html)。

