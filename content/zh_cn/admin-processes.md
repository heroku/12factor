## XII. 管理进程
### 后台管理任务当作一次性进程运行

[进程构成](./concurrency)（process formation）是指用来处理应用的常规业务（比如处理 web 请求）的一组进程。与此不同，开发人员经常希望执行一些管理或维护应用的一次性任务，例如：

* 运行数据移植（Django 中的 `manage.py migrate`, Rails 中的 `rake db:migrate`）。
* 运行一个控制台（也被称为 [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell），来执行一些代码或是针对线上数据库做一些检查。大多数语言都通过解释器提供了一个 REPL 工具（`python` 或 `perl`） ，或是其他命令（Ruby 使用 `irb`, Rails 使用 `rails console`）。
* 运行一些提交到代码仓库的一次性脚本。

一次性管理进程应该和正常的 [常驻进程](./processes) 使用同样的环境。这些管理进程和任何其他的进程一样使用相同的 [代码](./codebase) 和 [配置](./config) ，基于某个 [发布版本](./build-release-run) 运行。后台管理代码应该随其他应用程序代码一起发布，从而避免同步问题。

所有进程类型应该使用同样的 [依赖隔离](./dependencies) 技术。例如，如果Ruby的web进程使用了命令 `bundle exec thin start` ，那么数据库移植应使用 `bundle exec rake db:migrate` 。同样的，如果一个 Python 程序使用了 Virtualenv，则需要在运行 Tornado Web 服务器和任何 `manage.py` 管理进程时引入 `bin/python` 。

12-factor 尤其青睐那些提供了 REPL shell 的语言，因为那会让运行一次性脚本变得简单。在本地部署中，开发人员直接在命令行使用 shell 命令调用一次性管理进程。在线上部署中，开发人员依旧可以使用ssh或是运行环境提供的其他机制来运行这样的进程。
