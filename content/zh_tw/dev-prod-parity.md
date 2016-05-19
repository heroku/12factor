## X. 開發環境與線上環境等價
### 盡可能的保持開發，預發布，線上環境相同

從以往經驗來看，開發環境（即開發人員的本地 [部署](./codebase)）和線上環境（外部用戶訪問的真實部署）之間存在著很多差異。這些差異表現在以下三個方面：

* **時間差異：** 開發人員正在編寫的代碼可能需要幾天，幾周，甚至幾個月才會上線。
* **人員差異：** 開發人員編寫代碼，運維人員部署代碼。
* **工具差異：** 開發人員或許使用 Nginx，SQLite，OS X，而線上環境使用 Apache，MySQL 以及 Linux。

**12-Factor 應用想要做到 [持續部署](http://www.avc.com/a_vc/2011/02/continuous-deployment.html) 就必須縮小本地與線上差異。** 再回頭看上面所描述的三個差異:

* 縮小時間差異：開發人員可以幾小時，甚至幾分鐘就部署代碼。
* 縮小人員差異：開發人員不隻要編寫代碼，更應該密切參與部署過程以及代碼在線上的表現。
* 縮小工具差異：盡量保証開發環境以及線上環境的一致性。

將上述總結變為一個表格如下：

<table>
  <tr>
    <th></th>
    <th>傳統應用</th>
    <th>12-Factor 應用</th>
  </tr>
  <tr>
    <th>每次部署間隔</th>
    <td>數周</td>
    <td>幾小時</td>
  </tr>
  <tr>
    <th>開發人員 vs 運維人員</th>
    <td>不同的人</td>
    <td>相同的人</td>
  </tr>
  <tr>
    <th>開發環境 vs 線上環境</th>
    <td>不同</td>
    <td>盡量接近</td>
  </tr>
</table>

[后端服務](./backing-services) 是保持開發與線上等價的重要部分，例如數據庫，隊列系統，以及緩存。許多語言都提供了簡化獲取后端服務的類庫，例如不同類型服務的 *適配器* 。下列表格提供了一些例子。

<table>
  <tr>
    <th>類型</th>
    <th>語言</th>
    <th>類庫</th>
    <th>適配器</th>
  </tr>
  <tr>
    <td>數據庫</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>隊列</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>緩存</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

開發人員有時會覺得在本地環境中使用輕量的后端服務具有很強的吸引力，而那些更重量級的健壯的后端服務應該使用在生產環境。例如，本地使用 SQLite 線上使用 PostgreSQL﹔又如本地緩存在進程內存中而線上存入 Memcached。

**12-Factor 應用的開發人員應該反對在不同環境間使用不同的后端服務** ，即使適配器已經可以幾乎消除使用上的差異。這是因為，不同的后端服務意味著會突然出現的不兼容，從而導致測試、預發布都正常的代碼在線上出現問題。這些錯誤會給持續部署帶來阻力。從應用程序的生命周期來看，消除這種阻力需要花費很大的代價。

與此同時，輕量的本地服務也不像以前那樣引人注目。借助於[Homebrew](http://mxcl.github.com/homebrew/)，[apt-get](https://help.ubuntu.com/community/AptGet/Howto)等現代的打包系統，諸如Memcached、PostgreSQL、RabbitMQ 等后端服務的安裝與運行也並不復雜。此外，使用類似 [Chef](http://www.opscode.com/chef/) 和 [Puppet](http://docs.puppetlabs.com/) 的聲明式配置工具，結合像 [Vagrant](http://vagrantup.com/) 這樣輕量的虛擬環境就可以使得開發人員的本地環境與線上環境無限接近。與同步環境和持續部署所帶來的益處相比，安裝這些系統顯然是值得的。

不同后端服務的適配器仍然是有用的，因為它們可以使移植后端服務變得簡單。但應用的所有部署，這其中包括開發、預發布以及線上環境，都應該使用同一個后端服務的相同版本。
