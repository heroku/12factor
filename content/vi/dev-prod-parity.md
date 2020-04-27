## X. Sự tương đồng giữa quá trình phát triển và vận hành thực tế
### Đảm bảo sự tương đồng giữa môi trường phát triển, kiểm thử và thực tế 

Trước đây, có sự khác biệt nhất định giữa quá trình phát triển (lập trình viên có thể tạo ra các bản chỉnh sửa [triển khai](./codebase) cục bộ của ứng dụng) và vận hành thực tế (phiên bản được triển khai thực tế và truy cập bởi khách hàng). Khác biệt này được thể hiện ở ba lĩnh vực:

* **Về thời gian**: Lập trình viên có thể làm việc với mã nguồn hàng ngày, tuận, thậm chỉ là hàng tháng để có một phiên bản vận hành thực tế.
* **Về tính cá nhân**: Lập trình viên viết mã nguồn, người vận hành triển khai mã nguồn đó.
* **Về công cụ**: Lập trình viên có thể sử dụng tập các công cụ như là Nginx, SQLite, và OS X, trong khi triển khai thực tế sử dụng Apache, MySQL, và Linux.

**Ứng dụng áp dụng mười hai hệ số được thiết kế để [triển khai liên tục](http://www.avc.com/a_vc/2011/02/continuous-deployment.html) bằng việc giảm thiểu khác biệt giữa quá trình triển khai và vận hành thực tế.** Chúng ta cùng xem lại các sự khác biệt ở trên:

* Giảm thiểu thời gian: lập trình viên có thể viết mã nguồn và nó được triển khai vài giờ, thậm chí vài phút sau đó.
* Giảm thiểu tính cá nhân: lập trình viên người viết ra các dòng lệnh, có thể tham gia trực tiếp vào quá trình triển khai và quan sát các hình vi của ứng dụng trong môi trường vận hành thực tế.
* Giảm thiểu các công cụ: đảm bảo sự tương đồng giữa môi trường phát triển và vận hành.

Tổng kết vấn đề trên thông qua bảng sau:
<table>
  <tr>
    <th></th>
    <th>Ứng dụng truyền thống</th>
    <th>Ứng dụng sử dụng mười hai hệ số</th>
  </tr>
  <tr>
    <th>Thời gian giữa các lần triển khai</th>
    <td>Hàng tuần</td>
    <td>Hàng giờ</td>
  </tr>
  <tr>
    <th>Tác giả và người triển khai mã nguồn</th>
    <td>Khác nhau</td>
    <td>Cùng một người</td>
  </tr>
  <tr>
    <th>Môi trường phát triển và thực tế</th>
    <td>Không đồng nhất</td>
    <td>Tương đồng</td>
  </tr>
</table>

[Dịch vụ hỗ trợ](./backing-services), như là cơ sở dữ liệu của ứng dụng, hệ thống hàng đợi hoặc bộ đệm, là nơi mà thường có sự khác biệt giữa môi trường phát triển và vận hành. Rất nhiều ngôn ngữ cung cấp các thư viện, bao gồm nhiều *mô phỏng* của các loại dịch vụ khác nhau được cung cấp để làm đơn giản hoá việc truy cập các dịch vụ hỗ trợ. Một vài ví dụ ở bảng sau:

<table>
  <tr>
    <th>Loại</th>
    <th>Ngôn ngữ</th>
    <th>Thư viện</th>
    <th>Mô phỏng</th>
  </tr>
  <tr>
    <td>Cơ sở dữ liệu</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Hàng đợi</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Bộ đệm</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Lập trình viên thường thích sử dụng các dịch vụ hỗ trợ đơn giản trên môi trường cục bộ của họ, trong khi nhiều dịch vụ hỗ trợ mạnh mẽ và an toàn hơn được sử dụng trong môi trường vận hành thực tế. Ví dụ, sử dụng SQLite ở cục bộ và Postgresql trong vận hành, hoặc sử dụng trực tiếp bộ nhớ cho bộ đệm trong phát triển và Memcached trong vận hành.

**Ứng dụng sử dụng mười hai hệ số không cho phép sử dụng dịch vụ hỗ trợ khác nhau giữa môi trường phát triển và vận hành**, mặc dù các bộ mô phỏng có thể trừu tượng hoá bất kỳ sự khác biệt của dịch vụ hỗ trợ. Sự khác biệt giữa dịch vụ hỗ trợ có nghĩa là dù bất kỳ sự không đồng bộ nhỏ nào cũng có thể mở rộng, là nguyên nhân cho việc mã nguồn có thể hoạt động tốt ở môi trường phát triển hoặc kiểm thử nhưng không hoạt động trong môi trường thực tế. Các kiểu lỗi này làm cản trở quá trình triển khai liên tục. Chi phí cho các cản trở và làm giảm ảnh hưởng cho chúng thường rất tốn kém trong suốt quá trình phát triển của một ứng dụng.

Các dịch vụ đơn giản ở cục bộ không được ưu tiên như các dịch vụ tương tự. Các dịch vụ hỗ trợ hiện đại như  Memcached, PostgreSQL, và RabbitMQ không quá khó để cài đặt thông qua các dịch vụ đóng gói như là [Homebrew](http://mxcl.github.com/homebrew/) và [apt-get](https://help.ubuntu.com/community/AptGet/Howto). Ngoài ra, các công cụ cung cấp khai báo [Chef](http://www.opscode.com/chef/) và [Puppet](http://docs.puppetlabs.com/) kết hợp với các môi trường ảo hoá đơn giản [Vagrant](http://vagrantup.com/) cho phép lập trình viên có thể vận hành ở cục bộ một môi trường khá giống với môi trường vận hành thực tế. Chi phí cho việc cài đặt và sử dụng nhỏ hơn rất nhiều so với chi phí của triển khai liên tục và sự khác biệt giữa môi trường phát triển và vận hành.

Bộ mô phỏng đối với các dịch vụ hỗ trợ vẫn có ích, vì chúng làm giảm ảnh hưởng của việc chuyển đổi sang dịch vụ hỗ trợ mới. Nhưng tất cả các bước triển khai của ứng dụng (môi trường của lập trình viên, kiểm thử, vân hành thực tế) nên sử dụng cùng một loại và phiên bản của các kiểu dịch vụ hỗ trợ.
