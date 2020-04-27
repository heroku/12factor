## VI. 프로세스
### 애플리케이션을 하나 혹은 여러개의 무상태(stateless) 프로세스로 실행

실행 환경에서 앱은 하나 이상의 *프로세스*로 실행됩니다.

가장 간단한 케이스는 코드가 stand-alone 스크립트인 경우입니다. 이 경우, 실행 환경은 개발자의 언어 런타임이 설치된 로컬 노트북이며, 프로세스는 커맨드 라인 명령어에 의해서 실행됩니다.(예: `python my_script.py`) 복잡한 케이스로는 많은 [프로세스 타입별로 여러개의 프로세스](./concurrency)가 사용되는 복잡한 애플리케이션이 있습니다.

**Twelve-Factor 프로세스는 무상태(stateless)이며, [아무 것도 공유하지 않습니다](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** 유지될 필요가 있는 모든 데이터는 데이터베이스 같은 안정된 [백엔드 서비스](./backing-services)에 저장되어야 합니다.

짧은 단일 트랙잭션 내에서 캐시로 프로세스의 메모리 공간이나 파일시스템을 사용해도 됩니다. 예를 들자면 큰 파일을 받고, 해당 파일을 처리하고, 그 결과를 데이터베이스에 저장하는 경우가 있습니다. Twelve-Factor 앱에서 절대로 메모리나 디스크에 캐시된 내용이 미래의 요청이나 작업에서도 유효할 것이라고 가정해서는 안됩니다. 각 프로세스 타입의 프로세스가 여러개 돌아가고 있는 경우, 미래의 요청은 다른 프로세스에 의해서 처리될 가능성이 높습니다. 하나의 프로세스만 돌고 있는 경우에도 여러 요인(코드 배포, 설정 변경, 프로세스를 다른 물리적 장소에 재배치 등)에 의해서 발생하는 재실행은 보통 모든 로컬의 상태(메모리와 파일 시스템 등)를 없애버립니다.

에셋 패키징 도구 (예: [Jammit](http://documentcloud.github.com/jammit/), [django-assetpackager](http://code.google.com/p/django-assetpackager/))는 컴파일된 에셋을 저장할 캐시로 파일 시스템을 사용합니다. Twelve-Factor App은 이러한 컴파일을 런타임에 진행하기보다는, [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html)처럼 [빌드 단계](./build-release-run)에서 수행하는 것을 권장합니다.

웹 시스템 중에서는 ["Sticky Session"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence)에 의존하는 것도 있습니다. 이는 유저의 세션 데이터를 앱의 프로세스 메모리에 캐싱하고, 같은 유저의 이후 요청도 같은 프로세스로 전달될 것을 가정하는 것입니다. Sticky Session은 Twelve-Factor에 위반되며, 절대로 사용하거나 의존해서는 안됩니다. 세션 상태 데이터는 [Memcached](http://memcached.org/)나 [Redis](http://redis.io/)처럼 유효기간을 제공하는 데이터 저장소에 저장하는 것이 적합합니다.