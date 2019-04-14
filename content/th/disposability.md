## IX. Disposability
### เพิ่มความแข็งแกร่งด้วยการเริ่มต้นระบบอย่างรวดเร็วและปิดระบบอย่างนุ่มนวล

**Process ของ twelve-factor app จะต้อง **disposable**, หมายความว่าสามารถเริ่มต้นหรือหยุดในขณะที่แจ้งให้ทราบล่วงหน้า** นี่ส่งเสริมให้ขนายยื่ดหยุ่นอย่างรวดเร็ว, deployment ของการเปลี่ยนแปลง [code](./codebase) หรือ [การตั้งค่า](./config) อย่างรวดเร็ว และแข็งแกร่งสำหรับ production deploy

Process ควรจะมุ่งมั่นที่จะ **ลดเวลาเริ่มต้น** จะเป็นการดีถ้า process ใช้เวลาไม่กี่วินาทีจากคำสั่งเปิดใช้งานถูกประมวลผลจนกระทั่ง process ทำงานและพร้อมสำหรับรับ request หรือ job, การใช้เวลาเริ่มต้นที่สั้นนี้จะทำให้คล่องตัวสำหรับกระบวนการ [release](./build-release-run) และขยายออก และช่วยให้แข็งแกร่งเพราะเป็นการรับประกันว่าตัวจัดการ process สามารถย้าย process ไปยังเครื่องใหม่ได้ง่าย

Process จะต้อง **ปิดระบบอย่างนุ่มนวลเมื่อรับสัญญาณ [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM)** จากตัวจัดการ process สำหรับ process ของเว็บ การปิดระบบอย่างอย่างนุ่มนวลสำเร็จได้ด้วยสิ้นสุดการเฝ้าดู service port (ปฏิเสธ request ที่เข้ามาใหม่) ประมวลผล request ที่รับเข้ามาแล้วให้เสร็จ และออกจากโปรแกรม โดยนัยในรูปแบบนี้คือ HTTP request จะสั้นมาก (ไม่มากไปกว่าสองสามวินาที) หรือในกรณีของการประมวลผลที่ยาวนาน, client ควรจะพยายามต่อเนื่องที่จะติดต่ออีกครั้งเมื่อการเชื่อมต่อขาดหายไป

สำหรับ worker process การปิดระบบอย่างนุมนวลสำเร็จได้ด้วยการคืนงานที่ทำอยู่กลับให้ work queue ตัวอย่างเช่น บน [RabbitMQ](http://www.rabbitmq.com/) worker สามารถส่ง [`NACK`](http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack), บน [Beanstalkd](https://beanstalkd.github.io) งานจะถูกส่งกลับไปยัง queue อัตโนมัติเมือใดก็ตามที่ worker ขาดการติดต่อ ระบบ Lock-based เช่น [Delayed Job](https://github.com/collectiveidea/delayed_job#readme) จำเป็นต้องทำให้แน่ใจว่าปล่อยงานที่ลํอกไว้ออกให้หม โดยนัยในรูปแบบนี้งานทั้งหมดเป็น [reentrant](http://en.wikipedia.org/wiki/Reentrant_%28subroutine%29) ซึ่งโดยปรกติจะสำเร็จด้วยการห่อผลลัพธ์ใน transaction หรือสร้างตัวดำเนินงาน [idempotent](http://en.wikipedia.org/wiki/Idempotence)

Process ควรจะ **ทนทานต่อการหยุดการทำงานอย่างฉับพลัน** ในกรณีนี้ความผิดพลาดที่เกิดขึ้นในฮาร์ดแวร์ ในขณะที่กรณีนี้เกิดขึ้นน้อยมากกว่าการปิดระบบอย่างนุ่มนวลด้วย `SIGTERM` มันก็ยังมีโอกาสเกิดขึ้นได้ วิธีที่แนะนำคือใช้ robust queueing backend อย่างเช่น Beanstalkd ที่จะส่งกลับงานไปยัง queue เมื่อ client ขาดการติดต่อหรือหมดเวลา ทั้งสองวิธี twelve-factor app จะถูกออกแบบให้จัดการกับสิ่งที่คาดไม่ถึง, มีการปิดที่ผิดปรกติ [Crash-only design](http://lwn.net/Articles/191059/) ใช้แนวคิดนี้กับ [logical conclusion](http://docs.couchdb.org/en/latest/intro/overview.html)

