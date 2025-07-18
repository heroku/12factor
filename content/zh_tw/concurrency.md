## VIII. 並行
### 通過進程模型進行擴展

任何計算機程序，一旦啟動，就會生成一個或多個進程。網路應用採用了多種進程運行方式。例如，PHP 進程作為 Apache 的子進程存在，隨請求按需啟動。Java 進程則採取了相反的方式，在程序啟動之初 JVM 就提供了一個超級進程，儲備了大量的系統資源(CPU 和內存)，並通過多線程實現內部的並行管理。上述兩個例子中，進程是開發人員可以操作的最小單位。

![擴展表現為運行中的進程，工作多樣性表現為進程類型。](/images/process-types.png)

**在 12-factor 應用中，進程是一等公民。**12-Factor 應用的進程主要借鑒於 [unix 守護進程模型](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/) 。開發人員可以運用這個模型去設計應用架構，將不同的工作分配給不同的 *進程類型* 。例如，HTTP 請求可以交給 web 進程來處理，而常駐的後台工作則交由 worker 進程負責。

這並不包括個別較為特殊的進程，例如通過虛擬機的線程處理並行的內部運算，或是使用諸如 [EventMachine](http://rubyeventmachine.com/), [Twisted](http://twistedmatrix.com/trac/),  [Node.js](http://nodejs.org/) 的異步/事件觸發模型。但一台獨立的虛擬機的擴展有瓶頸（垂直擴展），所以應用程序必須可以在多台物理機器間跨進程工作。

上述進程模型會在系統急需擴展時大放異彩。 [12-Factor 應用的進程所具備的無共享，水平分區的特性](./processes) 意味著添加並行會變得簡單而穩妥。這些進程的類型以及每個類型中進程的數量就被稱作 *進程構成* 。

12-Factor 應用的進程 [不需要守護進程](http://dustin.github.com/2010/02/28/running-processes.html) 或是寫入 PID 文件。相反的，應該借助操作系統的進程管理器(例如 [systemd](https://www.freedesktop.org/wiki/Software/systemd/) ，分布式的進程管理雲端平台，或是類似 [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) 的工具)，來管理 [輸出流](/logs) ，響應崩潰的進程，以及處理用戶觸發的重啟和關閉超級進程的請求。
