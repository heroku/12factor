## VIII. 并发
### 通过进程模型进行扩展

任何计算机程序，一旦启动，就会生成一个或多个进程。互联网应用采用多种进程运行方式。例如，PHP 进程作为 Apache 的子进程存在，随请求按需启动。Java 进程则采取了相反的方式，在程序启动之初 JVM 就提供了一个超级进程储备了大量的系统资源(CPU 和内存)，并通过多线程实现内部的并发管理。上述 2 个例子中，进程是开发人员可以操作的最小单位。

![扩展表现为运行中的进程，工作多样性表现为进程类型。](/images/process-types.png)

**在 12-factor 应用中，进程是一等公民。**12-Factor 应用的进程主要借鉴于 [unix 守护进程模型](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/) 。开发人员可以运用这个模型去设计应用架构，将不同的工作分配给不同的 *进程类型* 。例如，HTTP 请求可以交给 web 进程来处理，而常驻的后台工作则交由 worker 进程负责。

这并不包括个别较为特殊的进程，例如通过虚拟机的线程处理并发的内部运算，或是使用诸如 [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/),  [Node.js](http://nodejs.org/) 的异步/事件触发模型。但一台独立的虚拟机的扩展有瓶颈（垂直扩展），所以应用程序必须可以在多台物理机器间跨进程工作。

上述进程模型会在系统急需扩展时大放异彩。 [12-Factor 应用的进程所具备的无共享，水平分区的特性](./processes) 意味着添加并发会变得简单而稳妥。这些进程的类型以及每个类型中进程的数量就被称作 *进程构成* 。

12-Factor 应用的进程 [不需要守护进程](http://dustin.github.com/2010/02/28/running-processes.html) 或是写入 PID 文件。相反的，应该借助操作系统的进程管理器(例如 [systemd](https://www.freedesktop.org/wiki/Software/systemd/) ，分布式的进程管理云平台，或是类似 [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) 的工具)，来管理 [输出流](./logs) ，响应崩溃的进程，以及处理用户触发的重启和关闭超级进程的请求。
