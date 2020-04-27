## [XI. Nhật ký](./logs)
### Nhật ký là các luồng sự kiện

*Nhật ký* cung cấp khả năng thể hiện các hình vi của ứng dụng đang vận hành, trong môi trường máy chủ chúng thường được ghi lại thành các tệp tin trên ổ đĩa cứng (a "logfile"); nhưng chỉ có một định dạng biểu diễn duy nhất.

Nhật ký như là [luồng](http://adam.heroku.com/past/2011/4/1/logs_are_streams_not_files/) của sự kết hợp, theo trình tự thời gian của các sự kiện, được thu thập từ các luồng ra của các tiến trình đang vận hành và dịch vụ hỗ trợ của ứng dụng. Nhật ký ở dạng nguyên gốc thường là các chuỗi ký tự được định dạng với mỗi sự kiện trên một dòng (mặc dù các truy vết của ngoại lệ thường chia thành nhiều dòng). Nhật ký không có định điểm bắt đầu hay kết thúc, nhưng là luồng liên tục miễn là ứng dụng vẫn đang vận hành. 

**Ứng dụng sử dụng mười hai hệ số không bao giờ quan tâm đến việc điều hướng hay lưu trữ luồng đầu ra.** Ứng dụng không nên ghi hoặc quản lý các logfiles. Thay vào đó, mỗi tiến trình đang vận hành ghi các luồng sự kiện, không có bộ đệm, ra `stdout`. Trong môi trường phát triển cục bộ, lập trình viên sẽ xem các luồng này ở trên thiết bị đầu cuối để nắm bắt được hành vi của ứng dụng.

Trong quá trình triển khai kiểm thử hoặc kiểm thử, mỗi luồng của tiến trình sẽ được lưu trữ bởi môi trường thực thi, thu tập cùng với tất các các luồng của ứng dụng, và định hướng đến một hoặc nhiều điểm đến cuối cùng để đọc và lưu trữ lâu dài. Các bộ định hướng nhật ký nguồn mở (như là [Logplex](https://github.com/heroku/logplex) và [Fluent](https://github.com/fluent/fluentd)) luôn sẵn sàng cho mục đích này.

Luồng sự kiện của ứng dụng có thể định hướng ra các tệp tin, hoặc xem xét thời gian thực ở thiết bị đầu cuối. Hơn nữa, luồng còn có thể được đánh chỉ mục và phân tích bởi hệ thống như là [Splunk](http://www.splunk.com/), hoặc hệ thống phân tích dữ liệu tổng quát như là [Hadoop/Hive](http://hive.apache.org/). Các hệ thống này cung cấp các công cụ mạnh mẽ và linh hoạt cho việc phân tích hành vi của ứng dụng theo thời gian như là:

* Tìm kiếm các sự kiện đặc biệt trong quá khứ
* Đồ thị hoá xu hướng tổng quát (đồ thị số lượng yêu cầu theo phút)
* Kích hoạt các cảnh báo theo kinh nghiệm của người dùng (như là cảnh báo khi số lượng lỗi theo phút vượt quá ngưỡng nào đó).
