## VI. 进程
### 以一个或多个无状态进程运行应用

运行环境中，应用程序通常是以一个和多个 *进程* 运行的。

最简单的场景中，代码是一个独立的脚本，运行环境是开发人员自己的笔记本电脑，进程由一条命令行（例如`python my_script.py`）。另外一个极端情况是，复杂的应用可能会使用很多 [进程类型](./concurrency) ，也就是零个或多个进程实例。

**12-Factor 应用的进程必须无状态且 [无共享](http://en.wikipedia.org/wiki/Shared_nothing_architecture) 。** 任何需要持久化的数据都要存储在 [后端服务](./backing-services) 内，比如数据库。

内存区域或磁盘空间可以作为进程在做某种事务型操作时的缓存，例如下载一个很大的文件，对其操作并将结果写入数据库的过程。12-Factor应用根本不用考虑这些缓存的内容是不是可以保留给之后的请求来使用，这是因为应用启动了多种类型的进程，将来的请求多半会由其他进程来服务。即使在只有一个进程的情形下，先前保存的数据（内存或文件系统中）也会因为重启（如代码部署、配置更改、或运行环境将进程调度至另一个物理区域执行）而丢失。

源文件打包工具（[Jammit](http://documentcloud.github.com/jammit/), [django-compressor](http://django-compressor.readthedocs.org/)） 使用文件系统来缓存编译过的源文件。12-Factor 应用更倾向于在 [构建步骤](./build-release-run) 做此动作——正如 [Rails资源管道](http://guides.rubyonrails.org/asset_pipeline.html) ，而不是在运行阶段。

一些互联网系统依赖于 “[粘性 session ](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence)”， 这是指将用户 session 中的数据缓存至某进程的内存中，并将同一用户的后续请求路由到同一个进程。粘性 session 是 12-Factor 极力反对的。Session 中的数据应该保存在诸如 [Memcached](http://memcached.org/) 或 [Redis](http://redis.io/) 这样的带有过期时间的缓存中。
