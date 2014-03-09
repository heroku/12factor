## XI. Логи
### Рассматривает логи как потоки событий

*Логи* обеспечивают видимость поведения работающего приложения. Обычно в серверной среде они записываются в файл на диске ("logfile"), но это только выходной формат.

Лог - это [поток](http://adam.heroku.com/past/2011/4/1/logs_are_streams_not_files/) агрегированных, упорядоченных по времени событий, собранных из потока вывода всех запущенных процессов и вспомогательных сервисов.  Логи в сыром виде обычно представлены текстовым форматом с одним событием на строчку (хотя трассировки исключений может занимать несколько строк).  Логи не имеют фиксированного начала и конца, поток сообщений непрерывен, пока работает приложение.

**Twelve-Factor приложение никогда не занимается маршрутизацией или хранением своего потока вывода.**  Приложение не должно записывать лог в файл или управлять файлами логов.  Вместо этого каждый выполняющийся процесс записывает свой поток событий, без буферизации, в `stdout`.  Во время локальной разработки разработчик может просматривать этот поток в терминале, чтобы наблюдать за поведением приложения.

При промежуточном или продакшн развертывании поток вывода каждого процесса будет захвачен средой выполнения, собран вместе со всеми другими потоками вывода приложения, и направляен к одному или нескольким конечным пунктам назначения для просмотра и долгосрочной архивации.  Эти архивные направления не являются видимыми для приложения и настраиваемыми приложением, вместо этого полностью управляются средой выполнения. Маршрутизаторы логов с открытым исходным кодом (например, [Logplex](https://github.com/heroku/logplex) и [Fluent](https://github.com/fluent/fluentd)) доступны для этой цели.

Поток событий приложения может быть направлен в файл для просмотра конца файла в режиме реального времени в терминале.  Самое главное, поток может быть направлен в сиситемы индексирования и анализа логов, такие как [Splunk](http://www.splunk.com/) или системы общего назначения хранения данных, таких как [Hadoop/Hive](HTTP://hive.apache.org/).  Эти системы обладают большей мощности и гибкостью для внутреннего анализа поведения приложение с течением времени, в том числе:

* Поиск конкретных события в прошлом.
* Крупномасштабные графики трендов (например, запросов в минуту).
* Активное оповещение по определённым пользователем параметрам (например, оповещение, когда количество ошибок в минуту превышает определенный порог).