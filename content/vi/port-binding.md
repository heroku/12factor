## VII. Mở cổng mạng
### Cung cấp các dịch vụ thông qua mở cổng mạng

Các ứng dụng web thường được thực thi bên trong một máy chủ web. Ví dụ, ứng dụng PHP có thể thực thi như là một thành phần của [Apache HTTPD](http://httpd.apache.org/), hoặc ứng dụng Java có thể thực thi thông qua [Tomcat](http://tomcat.apache.org/).

**Ứng dụng áp dụng mười hai-hệ số có khả năng tự đóng gói hoàn toàn chính nó** và không phụ thuộc vào việc tích hợp thêm máy chủ web trong thời gian thực thi vào môi trường thực thi để tạo ra dịch vụ web. Ứng dụng web **cung cấp cơ chế HTTP như là dịch vụ bởi việc mở một cổng nhất định**, và lắng nghe các yêu cầu được gửi tới cổng này.

Trong môi trường phát triển cục bộ, lập trình viên có thể truy cập dịch vụ thông qua URL như là `http://localhost:5000/` để truy cập đến các dịch vụ được cung cấp bởi ứng dụng của họ. Trong triển khai, lớp điều khiển luồng sẽ điều khiểu các yêu cầu từ đường dẫn công khai thông qua tên máy chủ đến tiến trình cung cấp cổng của ứng dụng.

Việc này thường được triển khai bằng [các định nghĩa ràng buộc](./dependencies) để thêm các thư viện máy chủ cho ứng dụng như là [Tornado](http://www.tornadoweb.org/) cho Python, [Thin](http://code.macournoyer.com/thin/) cho Ruby, hoặc [Jetty](http://jetty.codehaus.org/jetty/) cho Java và các ngôn ngữ dựa trên máy ảo JVM. Điều này được xử lý ở *không gian của người dùng*, hay bên trong mã nguồn của ứng dụng. Ràng buộc đối với môi trường thực thi là việc mở cổng dịch vụ để lắng nghe các yêu cầu.

HTTP không phải là dịch vụ duy nhất mà có thể cung cấp bởi việc mở cộng mạng. Gần như bất kỳ máy chủ phần mềm nào cũng có thể vận hành như là tiến trình được mở cổng mạng và chờ đợi các yêu cầu được gửi tới. Ví dụ bao gôm [ejabberd](http://www.ejabberd.im/) (sử dụng [XMPP](http://xmpp.org/)), và [Redis](http://redis.io/) (sử dụng [giao thức Redis](http://redis.io/topics/protocol)).

Chú ý là cách tiếp cận bằng mở cổng mạng có nghĩa là ứng dụng có thể trở thành [dịch vụ hỗ trợ(./backing-services) cho bất kỳ ứng dụng nào khác, bằng việc cung cấp URL đến dịch vụ hỡ trợ như là tài nguyên được điều khiển tronng [cấu hình](./config) cho ứng dụng cần sử dụng dịch vụ.
