## VI. Tiến trình
### Vận hành ứng dụng như là một hoặc nhiều tiến trình phi trạng thái

Ứng dụng được vận hành trong môi trường vận hành như là một hoặc nhiều *tiến trình*.

Trong trường hợp đơn giản, mã nguồn là các kịch bản độc lập, môi trường vận hành chính là máy tính của nhà phát triển với ngôn ngữ thực thi được cài đặt, và tiến trình được khởi chạy thông qua dòng lệnh (ví dụ, `python my_script.py`). Ở một khía cạnh khác, triển khai thực tế của ứng dụng phức tạp có thể sử dụng nhiều [xử lý từ không đến nhiều kiểu tiến trình ngay lập tức](./concurrency).

**Tiến trình áp dụng mười hai hệ số là phi trạng thái và không chia sẻ bất cứ tài nguyên nào](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Bất kỳ dữ liệu nào cần lưu trữ lâu dài cần được lưu trữ trong [dịch vụ hỗ trợ](./backing-services) đầy đủ trạng thái, thông thường là cơ sở dữ liệu.

Không gian bộ nhớ hoặc hệ thống tệp tin của tiến trình có thể được sử dụng như là bộ đệm tạm thời, thông qua luồng xử lý duy nhất. Ví dụ, việc tải một tệp tin lớn, tiến trình tải xuống và lưu trữ kết quả của tiến trình được lưu trữ trong cơ sở dữ liệu. Ứng dụng theo mười hai hệ số không bao giờ giả sử rằng có bất cứ cơ chế đệm nào của bộ nhớ hay ổ đĩa cứng sẵn sàng cho các yêu cầu hoặc công việc trong tương lai -- với nhiều tiến trình mà mỗi kiểu vận hành, mà tỷ cao các yêu cầu trong tương lai được xử lý bởi tiến trình khác. Mặc dù chỉ chạy một tiến trình, việc khởi động lại (được kích hoạt bởi mã nguồn triển khai, thay đổi cấu hình hoặc môi trường thực thi được thay đổi lại đến một tài nguyên vật lý khác), thường sẽ loại bỏ toàn bộ trạng thái cục bộ (như là bộ nhớ và hệ thống tệp tin).

Bộ đóng gói tài nguyên (như [Jammit](http://documentcloud.github.com/jammit/) hoặc [django-compressor](http://django-compressor.readthedocs.org/)) sử dụng hệ thống tệp tin như là bộ đệm cho việc biên dịch các tài nguyên. Ứng dụng sử dụng mười hai hệ số thường thực thi việc biên dịch này trong [bước xây dựng](./build-release-run), như [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), hơn là ở bước vận hành.

Một vài hệ thống web dựa vào ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- đó là cơ chế lưu trữ tạm thời các dữ liệu của người dùng theo phiên làm việc trong bộ nhớ của các tiến trình vận hành ứng dụng và trông đợi các yêu cầu từ cùng một người dùng được định hướng tới cùng tiến trình. *Sticky sessions* đã vi phạm nguyên tắc của mười hai hệ số và không nên được sử dụng hoặc áp dụng theo. Dữ liệu trạng thái của các phiên làm việc là nên được lưu trữ trong các nơi lưu trữ cung cấp khả năng hết hạn theo thời gian như là [Memcached](http://memcached.org/) hoặc [Redis](http://redis.io/).
