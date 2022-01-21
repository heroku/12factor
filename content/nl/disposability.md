## IX. Disposability
### Maximize robustness with fast startup and graceful shutdown

**The twelve-factor app's [processes](./processes) are *disposable*, meaning they can be started or stopped at a moment's notice.**  This facilitates fast elastic scaling, rapid deployment of [code](./codebase) or [config](./config) changes, and robustness of production deploys.

Processes should strive to **minimize startup time**.  Ideally, a process takes a few seconds from the time the launch command is executed until the process is up and ready to receive requests or jobs.  Short startup time provides more agility for the [release](./build-release-run) process and scaling up; and it aids robustness, because the process manager can more easily move processes to new physical machines when warranted.

Processes **shut down gracefully when they receive a [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM)** signal from the process manager.  For a web process, graceful shutdown is achieved by ceasing to listen on the service port (thereby refusing any new requests), allowing any current requests to finish, and then exiting.  Implicit in this model is that HTTP requests are short (no more than a few seconds), or in the case of long polling, the client should seamlessly attempt to reconnect when the connection is lost.

For a worker process, graceful shutdown is achieved by returning the current job to the work queue.  For example, on [RabbitMQ](http://www.rabbitmq.com/) the worker can send a [`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack); on [Beanstalkd](https://beanstalkd.github.io), the job is returned to the queue automatically whenever a worker disconnects.  Lock-based systems such as [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) need to be sure to release their lock on the job record.  Implicit in this model is that all jobs are [reentrant](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29), which typically is achieved by wrapping the results in a transaction, or making the operation [idempotent](http://en.wikipedia.org/wiki/Idempotence).

Processes should also be **robust against sudden death**, in the case of a failure in the underlying hardware.  While this is a much less common occurrence than a graceful shutdown with `SIGTERM`, it can still happen.  A recommended approach is use of a robust queueing backend, such as Beanstalkd, that returns jobs to the queue when clients disconnect or time out.  Either way, a twelve-factor app is architected to handle unexpected, non-graceful terminations.  [Crash-only design](http://lwn.net/Articles/191059/) takes this concept to its [logical conclusion](http://docs.couchdb.org/en/latest/intro/overview.html).


