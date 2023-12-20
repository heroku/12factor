## X. dev/prod 일치
### development, staging, production 환경을 최대한 비슷하게 유지

역사적으로, 개발 환경(애플리케이션의 개발자가 직접 수정하는 로컬의 [배포](./codebase))과 production 환경(최종 사용자가 접근하게 되는 실행 중인 배포) 사이에는 큰 차이가 있었습니다. 이러한 차이는 3가지 영역에 걸처 나타납니다.

* **시간의 차이**: 개발자가 작업한 코드는 production에 반영되기까지 며칠, 몇주, 때로는 몇개월이 걸릴 수 있습니다.
* **담당자의 차이**: 개발자가 작성한 코드를 시스템 엔지니어가 배포합니다.
* **툴의 차이**: production 배포는 아파치, MySQL, 리눅스를 사용하는데, 개발자는 Nginx, SQLite, OS X를 사용할 수 있습니다.

**Twelve Factor App은 개발 환경과 production 환경의 차이를 작게 유지하여 [지속적인 배포](http://avc.com/2011/02/continuous-deployment/)가 가능하도록 디자인 되었습니다.** 위에서 언급한 3가지 차이에 대한 대응책은 아래와 같습니다. 

* 시간의 차이를 최소화: 개발자가 작성한 코드는 몇 시간, 심지어 몇 분 후에 배포됩니다.
* 담당자의 차이를 최소화: 코드를 작성한 개발자들이 배포와 production에서의 모니터링에 깊게 관여합니다.
* 툴의 차이를 최소화: 개발과 production 환경을 최대한 비슷하게 유지합니다. 

위의 내용을 표로 요약하면 아래와 같습니다.

<table>
  <tr>
    <th></th>
    <th>전통적인 애플리케이션</th>
    <th>Twelve-Factor App</th>
  </tr>
  <tr>
    <th>배포 간의 간격</th>
    <td>몇 주</td>
    <td>몇 시간</td>
  </tr>
  <tr>
    <th>코드 작성자와 코드 배포자</th>
    <td>다른 사람</td>
    <td>같은 사람</td>
  </tr>
  <tr>
    <th>개발 환경과 production 환경</th>
    <td>불일치함</td>
    <td>최대한 유사함</td>
  </tr>
</table>


데이터베이스, 큐잉 시스템, 캐시와 같은 [백엔드 서비스](./backing-services)는 dev/prod 일치가 중요한 영역 중 하나 입니다. 많은 언어들은 다른 종류의 서비스에 대한 *어댑터*를 포함하고 간단하게 백엔드 서비스에 접근할 수 있는 라이브러리들을 제공합니다. 아래의 표에 몇가지 예가 나와있습니다. 

<table>
  <tr>
    <th>종류</th>
    <th>언어</th>
    <th>라이브러리</th>
    <th>어댑터</th>
  </tr>
  <tr>
    <td>데이터 베이스</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>큐(Queue)</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>캐쉬</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>메모리, 파일시스템, Memcached</td>
  </tr>
</table>

production 환경에서는 더 본격적이고 강력한 백엔드 서비스가 사용됨에도 불구하고, 개발자는 자신의 로컬 개발 환경에서는 가벼운 백엔드 서비스를 사용하는 것에 큰 매력을 느낄 수도 있습니다. 예를 들어, 로컬에서는 SQLite를 사용하고 production에서는 PostgreSQL을 사용한다던가, 개발 중에는 로컬 프로세스의 메모리를 캐싱용으로 사용하고 production에서는 Memcached를 사용하는 경우가 있습니다.

**Twelve-Factor 개발자는 개발 환경과 production 환경에서 다른 백엔드 서비스를 쓰고 싶은 충동에 저항합니다.** 이론적으로는 어댑터가 백엔드 서비스 간의 차이를 추상화해준다고 해도, 백엔드 서비스 간의 약간의 불일치가 개발 환경과 스테이징 환경에서는 동작하고 테스트에 통과된 코드가 production 환경에서 오류를 일으킬 수 있기 때문입니다. 이런 종류의 오류는 지속적인 배포를 방해합니다. 애플리케이션의 생명 주기 전체를 보았을 때, 이러한 방해와 지속적인 배포의 둔화가 발생시키는 손해는 엄청나게 큽니다. 

가벼운 로컬 서비스는 예전처럼 필수적인 것은 아닙니다. Memcache, PostgreSQL, RabbitMQ와 같은 현대적인 백엔드 서비스들은 [Homebrew](http://mxcl.github.com/homebrew/)나 [apt-get](https://help.ubuntu.com/community/AptGet/Howto)와 같은 현대적인 패키징 시스템 덕분에 설치하고 실행하는데 아무런 어려움도 없습니다. 혹은 [Chef](http://www.opscode.com/chef/) and [Puppet](http://docs.puppetlabs.com/)와 같은 선언적 provisioning 툴과 [Vagrant](http://vagrantup.com/)등의 가벼운 가상 환경을 결합하여 로컬 환경을 production 환경과 매우 유사하게 구성할 수 있습니다. dev/prod 일치와 지속적인 배포의 이점에 비하면 이러한 시스템을 설치하고 사용하는 비용은 낮습니다.

여러 백엔드 서비스에 접근할 수 있는 어댑터는 여전히 유용합니다. 새로운 백엔드 서비스를 사용하도록 포팅하는 작업의 고통을 낮춰주기 때문입니다. 하지만, 모든 애플리케이션의 배포들(개발자 환경, 스테이징, production)은 같은 종류, 같은 버전의 백엔드 서비스를 이용해야합니다.
