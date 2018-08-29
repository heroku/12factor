## XII. 管理進程
### 後台管理任務當作一次性進程運行

[進程構成](./concurrency)（process formation）是指用來處理應用的常規業務（比如處理 web 請求）的一組進程。與此不同，開發人員經常希望執行一些管理或維護應用的一次性任務，例如：

* 運行數據移植（Django 中的 `manage.py migrate`, Rails 中的 `rake db:migrate`）。
* 運行一個控制台（也被稱為 [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell），來執行一些代碼或是針對線上資料庫做一些檢查。大多數語言都通過直譯器提供了一個 REPL 工具（`python` 或 `perl`） ，或是其他命令（Ruby 使用 `irb`, Rails 使用 `rails console`）。
* 運行一些提交到代碼倉庫的一次性腳本。

一次性管理進程應該和正常的 [常駐進程](./processes) 使用同樣的環境。這些管理進程和任何其他的進程一樣使用相同的 [代碼](./codebase) 和 [配置](./config) ，基於某個 [發布版本](./build-release-run) 運行。後台管理代碼應該隨其他應用程序代碼一起發布，從而避免同步問題。

所有進程類型應該使用同樣的 [依賴隔離](./dependencies) 技術。例如，如果Ruby的web進程使用了命令 `bundle exec thin start` ，那麽數據庫移植應使用 `bundle exec rake db:migrate` 。同樣的，如果一個 Python 程序使用了 Virtualenv，則需要在運行 Tornado Web 服務器和任何 `manage.py` 管理進程時引入 `bin/python` 。

12-factor 尤其青睞那些提供了 REPL shell 的語言，因為那會讓運行一次性腳本變得簡單。在本地部署中，開發人員直接在命令行使用 shell 命令調用一次性管理進程。在線上部署中，開發人員依舊可以使用ssh或是運行環境提供的其他機制來運行這樣的進程。
