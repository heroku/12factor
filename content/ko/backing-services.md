## IV. 백엔드 서비스
### 백엔드 서비스를 연결된 리소스로 취급

*백엔드 서비스*는 애플리케이션 정상 동작 중 네트워크를 통해 이용하는 모든 서비스입니다. 예를 들어, 데이터 저장소(예: [MySQL](http://dev.mysql.com/), [CouchDB](http://couchdb.apache.org/)), 메시지 큐잉 시스템(예: [RabbitMQ](http://www.rabbitmq.com/), [Beanstalkd](https://beanstalkd.github.io)), 메일을 보내기 위한 SMTP 서비스 (예: [Postfix](http://www.postfix.org/)), 캐시 시스템(예: [Memcached](http://memcached.org/)) 등이 있습니다.

데이터베이스와 같은 백엔드 서비스들은 통상적으로 배포된 애플리케이션과 같은 시스템 관리자에 의해서 관리되고 있었습니다.  애플리케이션은 이런 로컬에서 관리하는 서비스 대신, 서드파티에 의해서 제공되고 관리되는 서비스를 이용할 수 있습니다. 예를 들어, SMTP 서비스 (예: [Postmark](http://postmarkapp.com/)), 지표 수집 서비스 (예: [New Relic](http://newrelic.com/), [Loggly](http://www.loggly.com/)), 스토리지 서비스 (예: [Amazon S3](http://aws.amazon.com/s3/)), API로 접근 가능한 소비자 서비스 (예: [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), [Last.fm](http://www.last.fm/api))등이 있습니다.

**Twelve-Factor App의 코드는 로컬 서비스와 서드파티 서비스를 구별하지 않습니다.** 애플리케이션에게는 양 쪽 모두 연결된 리소스이며, [설정](./config)에 있는 URL 혹은 다른 로케이터와 인증 정보를 사용해서 접근 됩니다. Twelve-Factor App의 [배포](./codebase)는 애플리케이션 코드를 수정하지 않고 로컬에서 관리되는 MySQL DB를 서드파티에서 관리되는 DB(예: [Amazon RDS](http://aws.amazon.com/rds/))로 전환할 수 있어야 합니다. 마찬가지로, 로컬 SMTP 서버는 서드파티 SMTP 서비스(예: Postmark)로 코드 수정 없이 전환이 가능해야 합니다. 두 경우 모두 설정에 있는 리소스 핸들만 변경하면 됩니다.

각각의 다른 백엔드 서비스는 *리소스*입니다. 예를 들어, 하나의 MySQL DB는 하나의 리소스입니다. 애플리케이션 레이어에서 샤딩을 하는 두 개의 MySQL 데이터베이스는 두 개의 서로 다른 리소스라고 볼 수 있습니다. Twelve-Factor App은 이러한 데이터베이스들을 *첨부된(Attached) 리소스*으로 다룹니다. 이는 서로 느슨하게 결합된다는 점을 암시합니다.


<img src="/images/attached-resources.png" class="full" alt="4개의 백엔드 서비스가 연결된 production 배포." />

리소스는 자유롭게 배포에 연결되거나 분리될 수 있습니다. 예를 들어, 애플리케이션의 데이터베이스가 하드웨어 이슈로 작용이 이상한 경우, 애플리케이션의 관리자는 최신 백업에서 새로운 데이터베이스 서버를 시작시킬 것입니다. 그리고 코드를 전혀 수정하지 않고 현재 운영에 사용하고 있는 데이터베이스를 분리하고 새로운 데이터베이스를 연결할 수 있습니다.
