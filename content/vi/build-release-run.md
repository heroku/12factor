## V. Xây dựng, phát hành, vận hành
### Tách biệt hoàn toàn giữa bước xây dựng và vận hành

[Mã gốc](./codebase) được chuyển sang (tạm dừng phát triển) triển khai thông qua ba bước:

* Bước xây dựng* là bước chuyển các đoạn mã thành các gói có khả năng thực thi được gọi là một *bản xảy dựng*. Sử dụng phiên bản của mã nguồn ở một bản cam kết (commit) quy định bở quy trình triển khai, bước xây dựng lấy về và cung cấp các [phụ thuộc](./dependencies) và biên dịch các thành phần và tài nguyên.
* Bước phát hành* sử dụng các kết quả của bước xây dựng và kết hợp với các [cấu hình](./config) triển khai hiện tại. Kết quả của *phát hành* bao gồm cả bản xây dựng và các câu hình cho phép ứng dụng có thể được vận hành trong môi trường vận hành.
* Bước vận hành* (được biết như là "thời gian vận hành" (runtime)) vận hành ứng dụng trong môi trường thực thi, bằng việc thực thi một tập các [tiến trình](./process) của của ứng dụng với một phiên bản phát hành cụ thể.

![Mã nguồn được xây dựng, kết hợp với các cấu hình để cung cập một phát hành.](/images/release.png)

**Ứng dụng sử dụng mười hai-hệ số tách biệt hoàn toàn giữa các bước xây dựng, phát hành và vận hành.** Ví dụ, chúng ta không thể tạo ra các thay đổi của mã nguồn khi đang vận hành, do đó không có khả năng quay ngược lại bước xây dựng.

Công cụ triển khai thường cung cấp công cụ quản lý phát hành, cùng với các ký pháp cho phép quay ngược lại bản phat hành trước đó. Ví dụ, công cụ triển khai [Capistrano](https://github.com/capistrano/capistrano/wiki) lưu trữ các phát hành trong thư mục con tên là `releases`, nơi mà phiên bản hiện tại được liên kết giả đến thư mục phát hành hiện tại. Lệnh `rollback` làm cho việc quay trở lại phiên bản trước trở nên dễ dàng. 

Mỗi phát hành đều có một định danh duy nhất ID, như là dựa vào thời gian phát hành (như `2011-04-06-20:32:17`) hoặc một số tự tăng (như `v100`). Các phiên bản được tạo ra thành một chuỗi liên tục và một phiên bản không thể thay đổi sau khi nó được tạo ra. Bất cứ thay đổi nào đểu tạo ra một bản phát hành mới.

Các bước xây dựng được khởi tạo với nhà phát triển ứng dụng khi mà mã nguồn được triển khai. Thời gian thực thi, ngược lại, có thể tự động xảy ra trong trường hợp các máy chủ được khởi động lại, hoặc tiến trình tạm dừng được khởi động lại bởi bộ quản lý các tiến trình. Do đó, bước vận hành nên được giữ các thành phần thay đổi càng ít càng tốt, vì các sự cố xảy ra làm ứng dụng không vận hành được có thể gây ra các thiệt hại lúc nửa đêm khi mà không có bất kỳ lập trình viên nào có thể khắc phục sự cố. Bước xây dựng có thể phức tạp hơn, vì các lỗi có thể xuất hiện trước mắt cho lập trình viên, người đang thực hiện triển khai biết được.
