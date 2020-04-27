## VIII. 동시성(Concurrency)
### 프로세스 모델을 통한 확장

모든 컴퓨터 프로그램은 실행되면 하나 이상의 프로세스로 표현됩니다. 웹 애플리케이션은 다양한 프로세스 실행 형태를 취해왔습니다. 예를 들어, PHP 프로세스는 Apache의 자식 프로세스로 실행되며, request의 양에 따라 필요한 만큼 시작됩니다. 자바 프로세스들은 반대 방향에서의 접근법을 취합니다. JVM은, 시작될 때 큰 시스템 리소스(CPU와 메모리) 블록을 예약하는 하나의 거대한 부모 프로세스를 제공하고, 내부 쓰레드를 통해 동시성(concurrency)을 관리합니다. 두 경우 모두 실행되는 프로세스는 애플리케이션 개발자에게 최소한으로 노출됩니다.

![Scale는 실행되는 프로세스의 갯수로 표현되고, Workload Diversity는 프로세스의 타입으로 표현됩니다. ](/images/process-types.png)

**Twelve-Factor App에서 프로세스들은 일급 시민입니다.** Twelve-Factor App에서의 프로세스는 [서비스 데몬들을 실행하기 위한 유닉스 프로세스 모델](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/)에서 큰 힌트를 얻었습니다. 이 모델을 사용하면 개발자는 애플리케이션의 작업을 적절한 *프로세스 타입*에 할당함으로서 다양한 작업 부하를 처리할 수 있도록 설계할 수 있습니다. 예를 들어, HTTP 요청은 웹 프로세스가 처리하며, 시간이 오래 걸리는 백그라운드 작업은 worker 프로세스가 처리하도록 할 수 있습니다.

이는 런타임 VM 내부의 쓰레드나 [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/), [Node.js](http://nodejs.org/)에서 구성된 것 처럼 async/evented 모델처럼 개별 프로세스가 내부적으로 동시에 처리하는 것을 금지하는 것은 아닙니다. 하지만 개별 VM이 너무 커질 수 있습니다.(수직 확장) 따라서 애플리케이션은 여러개의 물리적인 머신에서 돌아가는 여러개의 프로세스로 넓게 퍼질 수 있어야만 합니다.

프로세스 모델이 진정으로 빛나는 것은 수평적으로 확장하는 경우입니다. [아무것도 공유하지 않고, 수평으로 분할할 수 있는 Twelve-Factor App 프로세스의 성질](./processes)은 동시성을 높이는 것은 간단하고 안정적인 작업이라는 것을 의미 합니다. 프로세스의 타입과 각 타입별 프로세스의 갯수의 배치를 *프로세스 포메이션*이라고 합니다.

Twelve-Factor App 프로세스는 [절대 데몬화해서는 안되며](http://dustin.github.com/2010/02/28/running-processes.html) PID 파일을 작성해서는 안됩니다. 대신, OS의 프로세스 관리자(예: [systemd](https://www.freedesktop.org/wiki/Software/systemd/))나 클라우드 플랫폼의 분산 프로세스 매니저, 혹은 [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) 같은 툴에 의존하여 [아웃풋 스트림](./logs)을 관리하고, 충돌이 발생한 프로세스에 대응하고, 재시작과 종료를 처리해야 합니다.
