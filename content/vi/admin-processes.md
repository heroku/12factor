## XII. Tiến trình quản trị
### Thực thi nhiệm vụ quản trị như là một tiến trình 

[Công thức cho các tiến trình](./concurrency) là danh sách các tiến trình được sử dụng để thực thi các nghiệp vụ của ứng dụng (như là điều khiển web) khi chúng vận hành. Ngoài ra, lập trình viên thường mong muốn thực hiện các nhiệm vụ quản trị ứng dụng như là: 

* Áp dụng các thay đổi cho cơ sở dữ liệu (như là `manage.py migrate` với Django, `rake db:migrate` với Rails).
* Giao diện điều khiển trực tiếp ứng dụng (được biết đến như là vỏ [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop)) để vận hành các đoạn mã nguồn tuỳ ý hoặc kiểm tra các mô hình của ứng dụng đối với cơ sở dữ liệu hiện tại. Hầu hết các ngôn ngữ cung cấp REPL bằng cách thực thi một bộ biên dịch không có tham số như là (e.g. `python` or `perl`) hoặc trong vài trường hợp có các câu lệnh đặc biệt (như là `irb` với Ruby, `rails console` với Rails).
* Thực thi một lần đoạn kịch bản được quản lý trên kho mã nguồn của ứng dụng (như là `php scripts/fix_bad_records.php`).

Tiến trình quản trị thực thi một lần nên đươcj vận hành trong một môi trường giống như [tiến trình vận hành lâu dài](./processes) của ứng dụng. Với một bản [phát hành](./build-release-run), các tiến trình quản trị sử dụng cùng [mã gốc](./codebase) và [cấu hình](./config) như bất kỳ các tiến trình vận hành trong bản phát hành đó. Đoạn mã quản trị cần được triển khai cùng với mã của ứng dụng để đảm bảo không có các vấn đề về mặt động bộ hoá.

Kỹ thuật [cô lập phụ thuộc](./dependencies) tương tự được sử dụng cho cùng một kiểu tiến trình. Ví dụ tiến trình web sử dụng Ruby sử dụng câu lệnh `bundle exec thin start`, sau đó việc đồng bộ hoá cơ sở dữ liệu sử dụng câu lệnh `bundle exec rake db:migrate`. Tương tự, một chương trình Python sử dụng môi trường ảo cung cấp câu lệnh `bin/python` cho việc vận hành máy chủ web Tornado và bất cứ tiến trình quản trị thông qua `manage.py`.

Mười hai hệ số ưu tiên sử dụng các ngôn ngữ cung cấp vỏ REPL linh hoạt, và làm nó trở nên dễ dàng cho việc thực thi một lần các kịch bản. Trong môi trường triển khai cục bộ, lập trình viên thực thi các tiến trình quản trị bằng cách thực thi trực tiếp các câu lệnh trong thư mục lưu trữ mã nguồn của ứng dụng. Trong môi trường vận hành thực tế, lập trình viên có thể sử dụng ssh hoặc các câu lệnh điều khiển thực thi cơ chế được cung cấp bởi môi trường vận hành của quá trình triển khai để thực thi các tiến trình.
