## X. 开发环境与线上环境等价
### 尽可能的保持开发，预发布，线上环境相同

从以往经验来看，开发环境（即开发人员的本地 [部署](./codebase)）和线上环境（外部用户访问的真实部署）之间存在着很多差异。这些差异表现在以下三个方面：

* **时间差异：** 开发人员正在编写的代码可能需要几天，几周，甚至几个月才会上线。
* **人员差异：** 开发人员编写代码，运维人员部署代码。
* **工具差异：** 开发人员或许使用 Nginx，SQLite，OS X，而线上环境使用 Apache，MySQL 以及 Linux。

**12-Factor 应用想要做到 [持续部署](http://avc.com/2011/02/continuous-deployment/) 就必须缩小本地与线上差异。** 再回头看上面所描述的三个差异:

* 缩小时间差异：开发人员可以几小时，甚至几分钟就部署代码。
* 缩小人员差异：开发人员不只要编写代码，更应该密切参与部署过程以及代码在线上的表现。
* 缩小工具差异：尽量保证开发环境以及线上环境的一致性。

将上述总结变为一个表格如下：

<table>
  <tr>
    <th></th>
    <th>传统应用</th>
    <th>12-Factor 应用</th>
  </tr>
  <tr>
    <th>每次部署间隔</th>
    <td>数周</td>
    <td>几小时</td>
  </tr>
  <tr>
    <th>开发人员 vs 运维人员</th>
    <td>不同的人</td>
    <td>相同的人</td>
  </tr>
  <tr>
    <th>开发环境 vs 线上环境</th>
    <td>不同</td>
    <td>尽量接近</td>
  </tr>
</table>

[后端服务](./backing-services) 是保持开发与线上等价的重要部分，例如数据库，队列系统，以及缓存。许多语言都提供了简化获取后端服务的类库，例如不同类型服务的 *适配器* 。下列表格提供了一些例子。

<table>
  <tr>
    <th>类型</th>
    <th>语言</th>
    <th>类库</th>
    <th>适配器</th>
  </tr>
  <tr>
    <td>数据库</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>队列</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>缓存</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

开发人员有时会觉得在本地环境中使用轻量的后端服务具有很强的吸引力，而那些更重量级的健壮的后端服务应该使用在生产环境。例如，本地使用 SQLite 线上使用 PostgreSQL；又如本地缓存在进程内存中而线上存入 Memcached。

**12-Factor 应用的开发人员应该反对在不同环境间使用不同的后端服务** ，即使适配器已经可以几乎消除使用上的差异。这是因为，不同的后端服务意味着会突然出现的不兼容，从而导致测试、预发布都正常的代码在线上出现问题。这些错误会给持续部署带来阻力。从应用程序的生命周期来看，消除这种阻力需要花费很大的代价。

与此同时，轻量的本地服务也不像以前那样引人注目。借助于[Homebrew](http://mxcl.github.com/homebrew/)，[apt-get](https://help.ubuntu.com/community/AptGet/Howto)等现代的打包系统，诸如Memcached、PostgreSQL、RabbitMQ 等后端服务的安装与运行也并不复杂。此外，使用类似 [Chef](http://www.opscode.com/chef/) 和 [Puppet](http://docs.puppetlabs.com/) 的声明式配置工具，结合像 [Vagrant](http://vagrantup.com/) 这样轻量的虚拟环境就可以使得开发人员的本地环境与线上环境无限接近。与同步环境和持续部署所带来的益处相比，安装这些系统显然是值得的。

不同后端服务的适配器仍然是有用的，因为它们可以使移植后端服务变得简单。但应用的所有部署，这其中包括开发、预发布以及线上环境，都应该使用同一个后端服务的相同版本。
