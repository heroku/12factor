## IX. 폐기 가능(Disposability)
### 빠른 시작과 그레이스풀 셧다운(graceful shutdown)을 통한 안정성 극대화

**Twelve-Factor App의 [프로세스](./processes)는 *간단하게 폐기 가능*합니다. 즉, 프로세스는 바로 시작하거나 종료될 수 있습니다.** 이러한 속성은 신축성 있는 확장과 [코드](./codebase)나 [설정](./config)의 변화를 빠르게 배포하는 것을 쉽게 하며, production 배포를 안정성 있게 해줍니다.

프로세스는 **시작 시간을 최소화**하도록 노력해야합니다. 이상적으로, 프로세스는 실행 커맨드가 실행된 뒤 몇 초만에 요청이나 작업을 받을 수 있도록 준비 됩니다. 짧은 실행 시간은 [릴리즈](./build-release-run) 작업과 확장(scale up)이 더 민첩하게 이루어질 수 있게 합니다. 또한 프로세스 매니저가 필요에 따라 쉽게 프로세스를 새로운 머신으로 프로세스를 옮길 수 있기 때문에 안정성도 높아집니다.

프로세스는 프로세스 매니저로부터 **[SIGTERM](http://en.wikipedia.org/wiki/SIGTERM) 신호를 받았을 때 그레이스풀 셧다운(graceful shutdown)을 합니다.** 웹프로세스의 그레이스풀 셧다운 과정에서는 서비스 포트의 수신을 중지하고(그럼으로써 새로운 요청을 거절함), 현재 처리 중인 요청이 끝나길 기다린 뒤에 프로세스가 종료 되게 됩니다. 이 모델은 암묵적으로 HTTP 요청이 짧다는 가정(기껏해야 몇 초)을 깔고 있습니다. long polling의 경우에는 클라이언트가 연결이 끊긴 시점에 바로 다시 연결을 시도해야 합니다.

worker 프로세스의 경우, 그레이스풀 셧다운은 현재 처리중인 작업을 작업 큐로 되돌리는 방법으로 구현됩니다. 예를 들어, [RabbitMQ](http://www.rabbitmq.com/)에서는 worker는 [`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack)을 메시지큐로 보낼 수 있습니다. [Beanstalkd](https://beanstalkd.github.io)에서는 woker와의 연결이 끊기면 때 자동으로 작업을 큐로 되돌립니다. [Delayed Job](https://github.com/collectiveidea/delayed_job#readme)와 같은 Lock-based 시스템들은 작업 레코드에 걸어놨던 lock을 확실하게 풀어놓을 필요가 있습니다. 이 모델은 암묵적으로 모든 작업은 [재입력 가능(reentrant)](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29)하다고 가정합니다. 이는 보통, 결과를 트랜잭션으로 감싸거나 요청을 [멱등(idempotent)](http://en.wikipedia.org/wiki/Idempotence)하게 함으로써 구현될 수 있습니다.

프로세스는 하드웨어 에러에 의한 **갑작스러운 죽음에도 견고해야합니다.** 이러한 사태는 `SIGTERM`에 의한 그레이스풀 셧다운에 비하면 드문 일이지만, 그럼에도 발생할 수 있습니다. 이런 일에 대한 대책으로 Beanstalkd와 같은 견고한 큐잉 백엔드를 사용하는 것을 권장합니다. 이러한 백엔드는 클라이언트가 접속이 끊기거나, 타임 아웃이 발생했을 때, 작업을 큐로 되돌립니다. Twelve-Factor App은 예기치 못한, 우아하지 않은 종료도 처리할 수 있도록 설계됩니다. [Crash-only design](http://lwn.net/Articles/191059/)에서는 [논리적인 결론](http://docs.couchdb.org/en/latest/intro/overview.html)으로 이러한 컨셉을 가져왔습니다.
