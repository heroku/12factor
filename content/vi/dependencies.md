## II. Các phụ thuộc
### Khai báo và phân cách các phụ thuộc

Hầu hết các ngôn ngữ lập trình đều cung cấp hệ thống gói để phân phối các gói thư viện hỗ trợ, ví dụ như [CPAN](http://www.cpan.org/) cho Perl hay [Rubygems](http://rubygems.org/) cho Ruby.  Các thư viện cài đặt thông qua một hệ thống gói có thể được cài đặt ở mức phủ hệ thống (được biết đến với thuật ngữ "site packages") hay được nhóm và trong một thư mục có kèm ứng
dụng (được biết đến với thuật ngữ "vendoring" hay "bundling").

**Một ứng dụng 12-hệ số không bao giờ phụ thuộc vào sự hiện diện tuyệt đối của các gói hệ
thống.** Nó khai báo toàn bộ các phụ thuộc hoàn toàn thông qua bản kê khai *khai báo phụ thuộc*. Hơn thế nữa nó còn sử dụng công cụ *phân cách phụ thuộc* trong quá trình thực thi để
đảm bảo rằng không có các phụ thuộc tuyệt đối nào bị "lọt" vào trong các hệ thống xung quanh.
Khai báo đầy đủ và rõ ràng các phụ thuộc được áp dụng đồng đều cho cả hệ thống sản xuất và
phát triển.

Lấy ví dụ [Gem Bundler](http://gembundler.com/) của Ruby cung cấp định dạng kê khai `Gemfile` để khai báo phụ thuộc và `bundle exec` để phân cách phụ thuộc.  Với Python thì có công cụ riêng biệt cho các bước trên -- [Pip](http://www.pip-installer.org/en/latest/) được dùng để khai báo [Virtualenv](http://www.virtualenv.org/en/latest/) để phân cách.  Ngay cả C có [Autoconf](http://www.gnu.org/s/autoconf/) để khai báo phụ thuộc, và liên kết tĩnh (static linking) có thể cung cấp phân cách phụ thuộc.  Bất kể công cụ gì, kê khai phụ thuộc và phân cách luôn phải đi đôi với nhau -- chỉ cần thiếu một trong hai là không đạt yêu câu của của 12-hệ số.

Một ích lợi khác của khai báo phụ thuộc rõ ràng là nó đơn giản hoá quá trình cài đặt cho
lập trình viên mới tiếp nhận dự án.  Các lập trình viên mới có thể lấy về mã trên hệ thống
phát triển của họ, chỉ với một yêu cầu là cài đặt trước ngôn ngữ lập trình và trình quản lý
phụ thuộc.  Chúng có thể được dùng để thiết lập mọi thứ cần để vận hành một ứng dụng với một
*lệnh biên dịch/xây dựng* định sẵn.  Lấy một ví dụ cụ thể là lệnh thiết lập cho Ruby/Bundler là `bundle install`, còn với Clojure/[Leiningen](https://github.com/technomancy/leiningen#readme) là `lein deps`.

Các ứng dụng 12-hệ số đông thời có thể không phụ thuộc vào bất cứ sự hiện diện của các công cụ hệ thống tuyệt đối nào. Các ví dụ bao gồm các công cụ cài đặt sẵn như ImageMagick hay `curl`. Trong khi các công cụ trên có thể hiện diện trên đa số các hệ thống, nhưng không có gì bảo
đảm là chúng sẽ hiện diện trên toàn bộ các hệ thống mà ứng dụng có thể chạy trong tương la, hoặc có chăng phiên bản tìm thấy trên các hệ thống tương lai sẽ tương thích với ứng dụng.  Nếu ứng dụng cần được cài sẵn như một công cụ hệ thống, các công cụ đó nên được đi kèm cùng
với ứng dụng.
