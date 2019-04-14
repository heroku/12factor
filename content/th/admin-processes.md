## XII. Admin processes
### รันงานของผู้ดูแลระบบ/การจัดการให้เป็นกระบวนการแบบครั้งเดียว

[process formation](./concurrency) เป็นอาร์เรย์ของ process ที่ใช้ในการทำธุรกิจปรกติของ app (เช่นการจัดการ reqeust ของเว็บ) ขณะทำงาน developer มักต้องการทำการดูแลหรือบำรุงรักษาเพียงคนเดียวสำหรับ app เช่น:

* รันการย้ายข้อมูลฐานข้อมูล (เช่น `manage.py migrate` ใน Django, `rake db:migrate` ใน Rails)
* รันคอนโซล (เป็นที่รู้จักในชื่อ [REPL](http://en.wikipedia.org/wiki/Read-eval-print_loop) shell) เพื่อรัน code แบบทันทีทันใดหรือตรวจสอบโมเดลของ app ที่ติดต่อกับฐานข้อมูลทันที ภาษาคอมพิวเตอร์ส่วนใหญ่มี REPL โดยการรัน interpreter โดยไม่ต้องมี argument ใดๆ (เช่น `python` หรือ `perl`) หรือในบางกรณีมีการแยกคำสั่ง (เช่น `irb` สำหรับ Ruby, `rails console` สำหรับ Rails) 
* รันสคริปต์ครั้งเดียวที่ commit ไปที่ repo ของ app (เช่น `php scripts/fix_bad_records.php`)

การดูแล process ครั้งเดียวควรจะทำงานในสภาพแวดล้อมที่เหมือนกับทั้วไป [long-running processes](./processes) สำหรับ app ซึ่งทำงานกับ [release](./build-release-run) ใช้ [codebase](./codebase) and [การตั้งค่า](./config) เดียวกันกับ process ใดๆที่ทำงานกับ release ผู้ดูแลระบบของ code จำเป็นต้อง ship ด้วย application code เพื่อหลีกเลี่ยงปัญหาการประสาน (synchronization)

เทคนิค [dependency isolation](./dependencies) เดียวกันควรจะใช้กับชนิดของ process ทั้งหมด ตัวอย่างเช่น ถ้า Ruby web process ใช้คำสั่ง `bundle exec thin start` ดังนั้นการย้ายข้อมูลฐานข้อมูลควรจะใช้คำสั่ง `bundle exec rake db:migrate` ในทำนองเดียวกันกับ Python program ใช้ Virtualenv ควรจะใช้คำสั่ง `bin/python` สำหรับทำงานทั้ง Tornado webserver และการดูแลระบบ process `manage.py` ใดๆ

Twelve-factor ชื่นชอบภาษาคอมพิวเตอร์ที่มี PERL shell out of the box เป็นอย่างมาก และซึ่งทำให้ง่ายสำหรับรันสคริปต์ครั้งเดียว ใน local deploy, developer ใช้กระบวนการดูแลระบบครั้งเดียวโดยใช้คำสั่ง shell ข้างใน app ใน production deploy, developer สามารถใช้ ssh หรือคำสั่งรีโมทอื่นที่กลไกกำทำงานโดยสภาพแวดล้อมการดำเนินงานของ deploy เพื่อรัน process


