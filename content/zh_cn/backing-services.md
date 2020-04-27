## IV. 后端服务
### 把后端服务(*backing services*)当作附加资源

*后端服务*是指程序运行所需要的通过网络调用的各种服务，如数据库（[MySQL](http://dev.mysql.com/)，[CouchDB](http://couchdb.apache.org/)），消息/队列系统（[RabbitMQ](http://www.rabbitmq.com/)，[Beanstalkd](https://beanstalkd.github.io)），SMTP 邮件发送服务（[ Postfix](http://www.postfix.org/)），以及缓存系统（[Memcached](http://memcached.org/)）。

类似数据库的后端服务，通常由部署应用程序的系统管理员一起管理。除了本地服务之外，应用程序有可能使用了第三方发布和管理的服务。示例包括 SMTP（例如 [Postmark](http://postmarkapp.com/)），数据收集服务（例如 [New Relic](http://newrelic.com/) 或 [Loggly](http://www.loggly.com/)），数据存储服务（如 [Amazon S3](http://http://aws.amazon.com/s3/)），以及使用 API 访问的服务（例如 [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), [Last.fm](http://www.last.fm/api)）。

**12-Factor 应用不会区别对待本地或第三方服务。** 对应用程序而言，两种都是附加资源，通过一个 url 或是其他存储在 [配置](./config) 中的服务定位/服务证书来获取数据。12-Factor 应用的任意 [部署](./codebase) ，都应该可以在不进行任何代码改动的情况下，将本地 MySQL 数据库换成第三方服务（例如 [Amazon RDS](http://aws.amazon.com/rds/)）。类似的，本地 SMTP 服务应该也可以和第三方 SMTP 服务（例如 Postmark ）互换。上述 2 个例子中，仅需修改配置中的资源地址。

每个不同的后端服务是一份 *资源* 。例如，一个 MySQL 数据库是一个资源，两个 MySQL 数据库（用来数据分区）就被当作是 2 个不同的资源。12-Factor 应用将这些数据库都视作 *附加资源* ，这些资源和它们附属的部署保持松耦合。

<img src="/images/attached-resources.png" class="full" alt="一种部署附加4个后端服务" />

部署可以按需加载或卸载资源。例如，如果应用的数据库服务由于硬件问题出现异常，管理员可以从最近的备份中恢复一个数据库，卸载当前的数据库，然后加载新的数据库 -- 整个过程都不需要修改代码。
