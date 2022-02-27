## IV. Сторонні служби
### Вважайте сторонні служби (backing services) підключеними ресурсами

*Стороння служба* — це будь-яка служба, яка доступна застосунку по мережі і необхідна для його нормальної роботи: бази даних (наприклад, [MySQL](http://dev.mysql.com/) або [CouchDB](http://couchdb.apache.org/)), системи черг повідомлень (наприклад, [RabbitMQ](http://www.rabbitmq.com/) або [Beanstalkd](https://beanstalkd.github.io)), служби SMTP для вихідної пошти (наприклад, [Postfix](http://www.postfix.org/)), системи кешування (наприклад, [Memcached](http://memcached.org/)) тощо.

Допоміжні служби, такі як бази даних, традиційно управляються тими ж системними адміністраторами, які розгортають застосунок. Окрім локальних служб, застосунок може також використовувати служби, що надаються і керуються третіми сторонами: SMTP-сервіси (наприклад, [Postmark](http://postmarkapp.com/)), сервіси збору метрик (наприклад, [New Relic](http://newrelic.com/) або [Loggly](http://www.loggly.com/)), сховища бінарних даних (наприклад, [Amazon S3](http://aws.amazon.com/s3/)), а також різні сервіси, що надають доступ через API (наприклад, [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), або [Last.fm](http://www.last.fm/api)).

**Код застосунку дванадцяти факторів не бачить жодних відмінностей між локальними і сторонніми сервісами.** Для застосунку кожен з них є підключеним ресурсом, доступним за URL-адресою або іншими даними, що зберігаються в [конфігурації](./config). [Розгортання](./codebase) застосунку дванадцяти факторів повинно мати можливість, наприклад, замінити локальну базу даних MySQL на будь-яку керовану третьою стороною (наприклад, [Amazon RDS](http://aws.amazon.com/rds/)) без жодних змін в коді застосунку. Крім того, локальний сервер SMTP може бути замінений на сторонній SMTP-сервіс (наприклад, Postmark) без зміни коду. В обох випадках необхідно змінити лише налаштування відповідного ресурсу в конфігурації застосунку.

Кожна окрема стороння служба є *ресурсом*. Наприклад, база даних MySQL є ресурсом; дві бази даних MySQL (що використовуються для шардінгу на рівні застосунку) кваліфікуються як два різних ресурси. Застосунок дванадцяти факторів сприймає ці бази даних як *підключені ресурси*, що вказує на їхній слабкий зв'язок з розгортанням, в якому вони підключені.

<img src="/images/attached-resources.png" class="full" alt="production-розгортання, в якому підключені чотири сторонні служби" />

Ресурси за необхідності можуть бути підключені та відключені до розгортання застосунку. Наприклад, якщо база даних застосунку функціонує некорекно у зв'язку з апаратними проблемами, адміністратор може запустити новий сервер бази даних, відновленої з останньої резервної копії. Поточна база даних може бути відключена, а нова база даних підключена — все це без будь-яких змін коду.