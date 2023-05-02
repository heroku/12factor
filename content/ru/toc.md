## Двенадцать факторов

<ul class="list pl0">
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./codebase" class="link purple underline-hover">I. Кодовая база</a></b>
        <span class="f4 db lh-copy">Одна кодовая база, отслеживаемая в системе контроля версий, -- множество развёртываний</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./dependencies" class="link purple underline-hover">II. Зависимости</a></b>
        <span class="f4 db lh-copy">Явно объявляйте и изолируйте зависимости</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./config" class="link purple underline-hover">III. Конфигурация</a></b>
        <span class="f4 db lh-copy">Сохраняйте конфигурацию в среде выполнения</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./backing-services" class="link purple underline-hover">IV. Сторонние службы (Backing Services)</a></b>
        <span class="f4 db lh-copy">Считайте сторонние службы (backing services) подключаемыми ресурсами</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./build-release-run" class="link purple underline-hover">V. Сборка, релиз, выполнение</a></b>
        <span class="f4 db lh-copy">Строго разделяйте стадии сборки и выполнения</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./processes" class="link purple underline-hover">VI. Процессы</a></b>
        <span class="f4 db lh-copy">Запускайте приложение как один или несколько процессов не сохраняющих внутреннее состояние (stateless)</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./port-binding" class="link purple underline-hover">VII. Привязка портов (Port binding)</a></b>
        <span class="f4 db lh-copy">Экспортируйте сервисы через привязку портов</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./concurrency" class="link purple underline-hover">VIII. Параллелизм</a></b>
        <span class="f4 db lh-copy">Масштабируйте приложение с помощью процессов</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./disposability" class="link purple underline-hover">IX. Утилизируемость (Disposability)</a></b>
        <span class="f4 db lh-copy">Максимизируйте надёжность с помощью быстрого запуска и корректного завершения работы</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./dev-prod-parity" class="link purple underline-hover">X. Паритет разработки/работы приложения</a></b>
        <span class="f4 db lh-copy">Держите окружения разработки, промежуточного развёртывания (staging) и рабочего развёртывания (production) максимально похожими</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./logs" class="link purple underline-hover">XI. Журналирование (Logs)</a></b>
        <span class="f4 db lh-copy">Рассматривайте журнал как поток событий</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./admin-processes" class="link purple underline-hover">XII. Задачи администрирования</a></b>
        <span class="f4 db lh-copy">Выполняйте задачи администрирования/управления с помощью разовых процессов</span>
    </li>
</ul>
