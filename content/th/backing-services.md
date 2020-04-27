## IV. Backing services
### จัดการกับบริการสนับสนุน (backing service) ให้เป็นทรัพยากรที่แนบมา

*บริการสนับสนุน (backing service)** เป็นบริการใดๆ ที่ app ใช้บริการผ่านระบบเครือข่ายซึ่งเป็นส่วนหนึ่งของการดำเนินงาน (operation) ตัวอย่างเช่น รวมที่เก็บข้อมูล (datastore) (เช่น [MySQL](http://dev.mysql.com/) หรือ [CouchDB](http://couchdb.apache.org/)), ระบบ messaging/queueing (เช่น [RabbitMQ](http://www.rabbitmq.com/) หรือ [Beanstalkd](https://beanstalkd.github.io)), บริการ SMTP สำหรับส่งอีเมล์ออก (เช่น [Postfix](http://www.postfix.org/)), และระบบ caching (เช่น [Memcached](http://memcached.org/))

บริการสนับสนุนอย่างเช่นฐานข้อมูลเป็นการจัดการแบบดั่งเดิมด้วยผู้จัการระบบเดียวกันกับ app ที่ทำงานหลังจาก deploy เพิ่มเติมจากบริการจัดการภายใน, app อาจจะมีบริการที่ให้บริการและจัดการโดยบริการภายนอก (third parties) ตัวอย่างเช่น รวมบริการ SMTP (เช่น [Postmark](http://postmarkapp.com/)), บริการ metrics-gathering (เช่น [New Relic](http://newrelic.com/) หรือ [Loggly](http://www.loggly.com/)), บริการ binary asset (เช่น [Amazon S3](http://aws.amazon.com/s3/)), และแม้แต่บริการ API-accessible consumer (เช่น [Twitter](http://dev.twitter.com/), [Google Maps](https://developers.google.com/maps/), หรือ [Last.fm](http://www.last.fm/api)).

**code สำหรับ twelve-factor app จะไม่มีความแตกต่างระหว่างบริการภายใน (local) และบริการภายนอก (third party)** ใน app ทั้งสองบริการจะเป็นทรัพยากรที่แนบอยู่ใน app และเข้าถึงได้ด้วย URL หรือที่เก็บ locator/credentials อื่นๆใน [การตั้งค่า](./config). [deploy](./codebase) ของ twelve-factor app ควรจะส่ามารถสลับสับเปลี่ยนฐานข้อมูล MySQL ใน app ด้วยบริการภายนอก (เช่น [Amazon RDS](http://aws.amazon.com/rds/)) โดยไม่ต้องเปลี่ยน code ของ app เหมือนกับ SMTP ภายใน app ควรสามารถสลับสับเปลี่ยนด้วยบริการ SMTP ภายนอกได้ (เช่น Postmark) โดยไม่ต้องเปลี่ยน code ในทั้งสองกรณีทรัพยากรจัดการด้วยการตั้งค่าที่จะต้องเปลี่ยนเท่านั้น

สิ่งที่แตกต่างกันของบริการสนับสนุนคือ *ทรัพยากร* ตัวอย่างเช่น ฐานข้อมูล MySQL เป็นทรัพยากร; ฐานข้อมูล MySQL 2 ฐานข้อมูล (ใช้สำหรับ sharding ใน application layer) มีคุณสมบัติเป็นทรัพยากรที่แตกต่างกัน 2 แหล่ง, twelve-factor app จักการฐานข้อมูลเป็น *ทรัพยากรแนบ (attached resouces)* ซึ่งเป็นการระบุ loose coupling กับ deploy ที่ทรัพยากรเหล่านี้แนบใช้งาน

<img src="/images/attached-resources.png" class="full" alt="A production deploy attached to four backing services." />

ทรัพยากรสามารถแนบและถอดออกจาก deploy ได้ ตัวอย่างเช่น ถ้าฐานข้อมูลของ app ทำงานผิดปรกติเนื่องจากปัญหาของฮาร์ดแวร์ ผู้ดูแลระบบของ app อาจจะ spin up เซิร์ฟเวอร์ฐานข้อมูลขึ้นมาใหม่จากการข้อมูลที่สำรองล่าสุด ฐานข้อมูลของ production ปัจจุบันควรจะถอดออกและแนบด้วยฐานข้อมูลใหม่ -- ทั้งหมดนี้ไม่มีการเปลี่ยนแปลง code
