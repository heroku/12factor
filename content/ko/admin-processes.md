## XII. Admin 프로세스
### admin/maintenance 작업을 일회성 프로세스로 실행

[프로세스 포메이션](./concurrency)은 애플리케이션의 일반적인 기능들(예: Web request의 처리)을 처리하기 위한 프로세스들의 집합 입니다. 이와는 별도로, 개발자들은 종종 일회성 관리나 유지 보수 작업이 필요합니다. 그 예는 아래와 같습니다.

* 데이터베이스 마이그레이션을 실행합니다. (예: Django에서 `manage.py migrate`, Rail에서 `rake db:migrate`)
* 임의의 코드를 실행하거나 라이브 데이터베이스에서 앱의 모델을 조사하기 위해 콘솔([REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) Shell로도 알려져 있는)을 실행합니다. 대부분의 언어에서는 인터프리터를 아무런 인자 없이 실행하거나(예: python, perl) 별도의 명령어로 실행(예: ruby의 irb, rails의 rails console)할 수 있는 REPL를 제공합니다.
* 애플리케이션 저장소에 커밋된 일회성 스크립트의 실행 (예: php scripts/fix_bad_records.php)

일회성 admin 프로세스는 애플리케이션의 일반적인 [오래 실행되는 프로세스](./processes)들과 동일한 환경에서 실행되어야 합니다. 일회성 admin 프로세스들은 릴리즈를 기반으로 실행되며, 해당 릴리즈를 기반으로 돌아가는 모든 프로세스처럼 같은 [코드베이스](./codebase)와 [설정](./config)를 사용해야 합니다. admin 코드는 동기화 문제를 피하기 위해 애플리케이션 코드와 함께 배포되어야 합니다.

모든 프로세스 타입들에는 동일한 [종속성 분리](./dependencies) 기술이 사용되어야 합니다. 예를 들어,
루비 웹 프로세스가 `bundle exec thin start` 명령어를 사용한다면, 데이터베이스 마이그레이션은 `bundle exec rake db:migrate`를 사용해야합니다. 마찬가지로, virtualenv를 사용하는 파이썬 프로그램은 tornado 웹 서버와 모든 `manage.py`  admin 프로세스가 같은 virtualenv에서의 `bin/python`을 사용해야 합니다.

Twelve-Factor는 별도의 설치나 구성없이 REPL shell을 제공하는 언어를 강하게 선호합니다. 이러한 점은 일회성 스크립트를 실행하기 쉽게 만들어주기 때문입니다. 로컬 배포에서, 개발자는 앱을 체크아웃한 디렉토리에서 일회성 admin 프로세스를 shell 명령어로 바로 실행시킵니다. production 배포에서, 개발자는 ssh나 배포의 실행 환경에서 제공하는 다른 원격 명령어 실행 메커니즘을 사용하여 admin 프로세스를 실행할 수 있습니다.