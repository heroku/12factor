## I. Mã gốc (codebase)
### Một mã gốc (codebase) được theo dõi với hệ thống quản lý phiên bản, và nhiều lần triển khai (deploy)

Một ứng dụng 12-hệ số luôn luôn được theo dõi bới hê thống quản lý phiên bản, như là [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), hay [Subversion](http://subversion.apache.org/). Một bản lưu của cơ sở dữ liệu các phiên bản được gọi là **kho mã (code repository)**, và hay được viết vắn tắt thành *code repo* hay *repo*.

Một *mã gốc* là bất kì một repo riêng lẻ (trong một hệ thống quản lý phiên bản thống nhất như Subversion), hoặc bất kì một nhóm các repo chia sẻ cùng một commit nguồn (root commit) (trong một hệ thống quản lý phiên bản kiểu phân quyển như Git).

![Một mã gốc được gắn với nhiều triển khai](/images/codebase-deploys.png)

Sẽ luôn luôn là sự tương quan một-với-một giữa mã gốc và ứng dụng:

* Nếu có nhiều mã gốc, đấy không phải là một ứng dụng -- mà là một hệ thống phân tán. Với các
phần tử trong một hệ thống phân tán là một ứng dụng, với mỗi cá thể tuân theo luật 12-hệ số.
* Nhiều ứng dụng chia sẻ cùng một mã là vi phạm luật của 12-hệ số. Giải pháp ở đây là xem xét
để nhóm các mã chia sẻ thành các thư viện mà có thể được nhúng vào thông qua [trình quản lý các gói phụ thuộc (dependency manager)](./dependencies).

Chỉ có một mã gốc từng ứng dụng, nhưng sẽ có nhiều triển khai của một ứng dụng. Một *triển khai* là một đối tượng thực thi của ứng dụng đó. Đây là trường hợp rất phổ biến của các trang
đã đi vào hoạt động, và của một vài trang thử nghiệm. Thêm vào đó mỗi lập trình viên sẽ có một
bản lưu của ứng dụng đang chạy trên môi trường phát triển cá nhân, mỗi bản đều được coi như là
một triển khai.

Mã gốc sẽ giống nhau trên các triển khai, tuy là phiên bản khác nhau có thể hoạt dộng trong mỗi triển khai. Lấy một ví dụ, một lập trình viên có nhiều commit nhưng chưa triển khai vào
hệ thống thử (staging); hệ thống thử có nhiều commit mà chưa được triển khai trên hệ thống sản xuất (production). Nhưng cả hai đều chia sẻ cùng một mã gốc; thế nên phải định dạng chúng
như những cá thể triển khai của cùng một ứng dụng.
