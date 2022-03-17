## III. Cấu hình
### Lưu trữ cấu hình trong môi trường

Cấu hình của ứng dụng là những thứ có thể thay đổi qua các [triển khai](./codebase) (hệ thống thử, hệ thống sản xuất, môi trường phát triển, etc). Nó bao gồm:
* Tài nguyên xử lý cơ sở dữ liệu, Memcached, và [dịch vụ lớp dưới](./backing-services) khác
* Thông tin đăng nhập đến các dịch vụ như là Amazon S3 hay Twitter
* Các giá trị ứng với từng triển khai như như là tên của máy chủ để triển khai

Các ứng dụng thường lưu trữ các cấu hình như là hằng số trong mã nguồn. Điều này không phù hợp với nguyên tắc của 12-thừa số, yêu cầu **giới hạn tách biệt các cấu hình khỏi mã nguồn**. Các cấu hình thay đổi qua các triển khai, mã nguồn thì không.

Một litmus test cho ứng dụng có các cấu hình được thừa số hoá chính xác là mã gốc có khả năng nguồn mở hoá bất kỳ lúc nào mà không lo sợ bị mất các thông tin đăng nhập.

Chú ý rằng, định nghĩa của "cấu hình" không bao gồm các cấu hình nội tại của ứng dụng, như là `config/routes.rb` trong Rails, hoặc [các thành phần được kết nối](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) trong [Spring](http://spring.io/). Những cấu hình kiểu này thường không thay đổi giữa các triển khai, và do đó đã thực hiện tốt trong mã nguồn.

Một cách tiếp cận khác với các cấu hình là việc sử dụng tệp tin cấu hình mà tệp tin đó không được quản lý phiên bản, như là `config/database.yml` trong Rails. Đây là một cải tiến lớn so với việc
sử dụng hằng số trong mã nguồn đã được quản lý phiên bản, nhưng vẫn có điểm yếu: dễ bị thêm nhầm vào quản lý phiên bản, các tệp tin cấu hình dễ bị phân tán ở những nơi khác nhau và các định dạng khác
nhau, làm cho nó trở nên khó đọc và quản lý tất các cấu hỉnh một cách tập trung. Ngoài ra, định dạng của các tệp tin chứa cấu hình thường do đặc tả của ngôn ngữ- hoặc framework-.

**Ứng dụng áp dụng mười hai thừa số chứa các cấu hình trong *environment variables (biến môi trường)*** (thường viết tắt là *env vars* hoặc *env*). Các biến môi trường rất dễ để thay đổi giữa các triển khai
mà không phải thay đổi mã nguồn; không giống như tệp tin cấu hình, vẫn có khả năng để bị thêm vào kho mã (code repository); và không giống như các tệp tin cấu hình tuỳ chỉnh, hoặc cơ chế quảnl lý cấu 
hình như là *Java System Properties*, các biến môi trường là *agnostic standard* theo ngôn ngữ và hệ điều hành.

Một khía cạnh khác của quản lý cấu hình là nhóm các cấu hình. Đôi khi, các ứng dụng tổ chức các cấu hình theo nhóm (thường được gọi là "các môi trường") được đặt tên theo các triển khai, như là các môi trường`development`, `test`, and `production` trong Rails. Phương pháp này không mở rộng rõ ràng: nếu như có nhiều triển khải của ứng dụng được tạo ra, tên của các môi trường rất quan trọng, như là `staging` hoặc `qa`. Nếu một dự án phát triển sau này, lập trình viên có thể thêm các môi trường của riêng họ như là `joes-staging`, kết quả là một sự bùng nổ về các cấu hình, làm cho việc quản lý 
các triển khai trở nên không ổn định.

Trong một ứng dụng áp dụng mười hai thừa số, các biến môi trường được quản lý chi tiết, hoàn toàn độc lập với các biến môi trường khác. Chúng không được nhóm với nhau như là các "môi trường", nhưng
thay vào đó được quản lý độc lập theo các triển khai. Mô hình này giúp cho việc mở rộng trở nên trơn tru như là việc thêm vào các triển khai theo vòng đời của phần mềm được mở rộng một cách tự nhiên.
