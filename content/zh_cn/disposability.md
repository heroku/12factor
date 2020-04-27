## IX. 易处理
### 快速启动和优雅终止可最大化健壮性

**12-Factor 应用的 [进程](./processes) 是 *易处理（disposable）*的，意思是说它们可以瞬间开启或停止。** 这有利于快速、弹性的伸缩应用，迅速部署变化的 [代码](./codebase) 或 [配置](./config) ，稳健的部署应用。

进程应当追求 **最小启动时间** 。 理想状态下，进程从敲下命令到真正启动并等待请求的时间应该只需很短的时间。更少的启动时间提供了更敏捷的 [发布](./build-release-run) 以及扩展过程，此外还增加了健壮性，因为进程管理器可以在授权情形下容易的将进程搬到新的物理机器上。

进程 **一旦接收 [终止信号（`SIGTERM`）](http://en.wikipedia.org/wiki/SIGTERM) 就会优雅的终止** 。就网络进程而言，优雅终止是指停止监听服务的端口，即拒绝所有新的请求，并继续执行当前已接收的请求，然后退出。此类型的进程所隐含的要求是HTTP请求大多都很短(不会超过几秒钟)，而在长时间轮询中，客户端在丢失连接后应该马上尝试重连。

对于 worker 进程来说，优雅终止是指将当前任务退回队列。例如，[RabbitMQ](http://www.rabbitmq.com/) 中，worker 可以发送一个[`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack)信号。 [Beanstalkd](https://beanstalkd.github.io) 中，任务终止并退回队列会在worker断开时自动触发。有锁机制的系统诸如 [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) 则需要确定释放了系统资源。此类型的进程所隐含的要求是，任务都应该 [可重复执行](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29) ， 这主要由将结果包装进事务或是使重复操作 [幂等](http://en.wikipedia.org/wiki/Idempotence) 来实现。

进程还应当**在面对突然死亡时保持健壮**，例如底层硬件故障。虽然这种情况比起优雅终止来说少之又少，但终究有可能发生。一种推荐的方式是使用一个健壮的后端队列，例如 [Beanstalkd](https://beanstalkd.github.io) ，它可以在客户端断开或超时后自动退回任务。无论如何，12-Factor 应用都应该可以设计能够应对意外的、不优雅的终结。[Crash-only design](http://lwn.net/Articles/191059/) 将这种概念转化为 [合乎逻辑的理论](http://couchdb.apache.org/docs/overview.html)。

