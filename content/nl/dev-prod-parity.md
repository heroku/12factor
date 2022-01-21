## X. Dev/prod parity
### Keep development, staging, and production as similar as possible

Historically, there have been substantial gaps between development (a developer making live edits to a local [deploy](./codebase) of the app) and production (a running deploy of the app accessed by end users).  These gaps manifest in three areas:

* **The time gap**: A developer may work on code that takes days, weeks, or even months to go into production.
* **The personnel gap**: Developers write code, ops engineers deploy it.
* **The tools gap**: Developers may be using a stack like Nginx, SQLite, and OS X, while the production deploy uses Apache, MySQL, and Linux.

**The twelve-factor app is designed for [continuous deployment](http://avc.com/2011/02/continuous-deployment/) by keeping the gap between development and production small.**  Looking at the three gaps described above:

* Make the time gap small: a developer may write code and have it deployed hours or even just minutes later.
* Make the personnel gap small: developers who wrote code are closely involved in deploying it and watching its behavior in production.
* Make the tools gap small: keep development and production as similar as possible.

Summarizing the above into a table:

<table>
  <tr>
    <th></th>
    <th>Traditional app</th>
    <th>Twelve-factor app</th>
  </tr>
  <tr>
    <th>Time between deploys</th>
    <td>Weeks</td>
    <td>Hours</td>
  </tr>
  <tr>
    <th>Code authors vs code deployers</th>
    <td>Different people</td>
    <td>Same people</td>
  </tr>
  <tr>
    <th>Dev vs production environments</th>
    <td>Divergent</td>
    <td>As similar as possible</td>
  </tr>
</table>

[Backing services](./backing-services), such as the app's database, queueing system, or cache, is one area where dev/prod parity is important.  Many languages offer libraries which simplify access to the backing service, including *adapters* to different types of services.  Some examples are in the table below.

<table>
  <tr>
    <th>Type</th>
    <th>Language</th>
    <th>Library</th>
    <th>Adapters</th>
  </tr>
  <tr>
    <td>Database</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Queue</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Developers sometimes find great appeal in using a lightweight backing service in their local environments, while a more serious and robust backing service will be used in production.  For example, using SQLite locally and PostgreSQL in production; or local process memory for caching in development and Memcached in production.

**The twelve-factor developer resists the urge to use different backing services between development and production**, even when adapters theoretically abstract away any differences in backing services.  Differences between backing services mean that tiny incompatibilities crop up, causing code that worked and passed tests in development or staging to fail in production.  These types of errors create friction that disincentivizes continuous deployment.  The cost of this friction and the subsequent dampening of continuous deployment is extremely high when considered in aggregate over the lifetime of an application.

Lightweight local services are less compelling than they once were.  Modern backing services such as Memcached, PostgreSQL, and RabbitMQ are not difficult to install and run thanks to modern packaging systems, such as [Homebrew](http://mxcl.github.com/homebrew/) and [apt-get](https://help.ubuntu.com/community/AptGet/Howto).  Alternatively, declarative provisioning tools such as [Chef](http://www.opscode.com/chef/) and [Puppet](http://docs.puppetlabs.com/) combined with light-weight virtual environments such as [Docker](https://www.docker.com/) and [Vagrant](http://vagrantup.com/) allow developers to run local environments which closely approximate production environments. The cost of installing and using these systems is low compared to the benefit of dev/prod parity and continuous deployment.

Adapters to different backing services are still useful, because they make porting to new backing services relatively painless.  But all deploys of the app (developer environments, staging, production) should be using the same type and version of each of the backing services.
