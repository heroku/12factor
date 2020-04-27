## X. Dev/prod parity
### ทำให้ development, staging และ production ให้มีความใกล้เคียงกันที่สุด

ในอดีต มีช่องว่างที่มากมายระหว่าง development (developer แก้ไข app ในเครื่องตัวเอง [deploy](./codebase)) และ production (deploy ที่ทำงานและใช้งานโดยผู้ใช้งานที่แท้จริง) ช่องว่างที่ชัดเจนมี 3 เรื่่อง:

* **ช่องว่างของเวลา** developer จะทำงานบน code ที่ใช้เวลาเป็นวัน, เป็นอาทิตย์ หรือเป็นเดือนที่จะเอาขึ้นสู่ production 
* **ช่องว่างของบุคคล** developer เขียน code แต่วิศวกร ops ทำการ deploy code
* **ช่องว่างของเครื่องมือ** developer อาจจะใช้ stack อย่างเช่น Nginx, SQLite และ OSX ขณะที่ production deploy ใช้ Apache, MySQL และ Linux

**Twelve-factor app ถูกออกแบบสำหรับ [การ deployment อย่างต่อเนื่อง (continuous deployment)](http://avc.com/2011/02/continuous-deployment/) ด้วยการรักษาช่องว่างระหว่าง development และ production ให้แคบที่สุด** โดยพิจารณาจากช่องว่าง 3 เรื่องด้านบน:

* ทำให้เวลาสั้นลง: developer อาจจะเขียน code และทำการ deploy ในเวลาเพียงชั่วโมงเดียวหรือเพียงไม่กี่นาทีหลังจากเขียน code เสร็จ
* ทำให้ช่องว่างบุคคลแคบลง: developer เป็นคนเขียน code และเป็นคนที่ deploy code เองและเป็นคนที่ดูใน production เอง
* ทำให้ช่องว่างเครื่องมือแคบลง: ทำให้ใช้เครื่องมือ developement และ production เหมือนกันมากที่สุดเท่าที่จะทำได้

สรุปข้างบนเป็นตาราง:

<table>
  <tr>
    <th></th>
    <th>Traditional app</th>
    <th>Twelve-factor app</th>
  </tr>
  <tr>
    <th>เวลาระหว่าง deploys</th>
    <td>สัปดาห์</td>
    <td>ชั่วโมง</td>
  </tr>
  <tr>
    <th>คนเขียน code vs คน deploy code </th>
    <td>คนละคน</td>
    <td>คนเดียวกัน</td>
  </tr>
  <tr>
    <th>สภาพแวดล้อม Dev vs production</th>
    <td>แตกต่างกัน</td>
    <td>เหมือนกันมากที่สุด</td>
  </tr>
</table>

[Backing services](./backing-services) อย่างเช่น ฐานข้อมูลของ app, ระบบคิว, หรือ ระบบแคช เป็นสิ่งที่ dev/prod ควรมีควมคล้ายคลึงกันมากที่สุด หลายภาษามี library ซึ่งทำให้เข้าถึง backing service ได้ง่าย รวมทั้ง *adapter* กับบริการที่แตกต่างกัน ตัวอย่างบางส่วนในตารางนี้:

<table>
  <tr>
    <th>Type</th>
    <th>Language</th>
    <th>Library</th>
    <th>Adapters</th>
  </tr>
  <tr>
    <td>Database</td>
    <td>Ruby/Rails</td>
    <td>ActiveRecord</td>
    <td>MySQL, PostgreSQL, SQLite</td>
  </tr>
  <tr>
    <td>Queue</td>
    <td>Python/Django</td>
    <td>Celery</td>
    <td>RabbitMQ, Beanstalkd, Redis</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td>Ruby/Rails</td>
    <td>ActiveSupport::Cache</td>
    <td>Memory, filesystem, Memcached</td>
  </tr>
</table>

Developer บางครั้งหาวิธีที่ใช้ backing service ง่ายๆ ในเครื่องตัวเอง ในขณะที่ backing service ใช้งานอย่างเคร่งครัดและแข็งแกร่งใน production ตัวอย่างเช่น ใช้ SQLite ในเครื่องพัฒนา และใช้ PostgreSQL ใน production หรือใช้ local process memory สำหรับแคชใน development และ Memcached ใน production

**Twelve-factor developer ต่อต้านกำใช้งาน backing service ที่แตกต่างกันระหว่าง development และ production** แม้ว่าเมื่อใช้ adapter ในทางทฤษฎีแล้วไม่มีความแตกต่างกันใน backing service ความแตกต่างระหว่าง backing service หมายความว่าความไม่เข้ากันเพียงเล็กน้อยที่เป็นสาเหตุให้ code ทำงานได้และผ่านการทดสอบใน development หรือ staging แต่ไปทำงานผิดพลาดใน production ความผิดหลาดเหล่านี้สร้างความไม่ลงรอยกันกับการ delopyment อย่างต่อเนื่อง และราคาของความไม่ลงรอยกันนี้และความผันผวนตามมาของการ deployment อย่างต่อเนื่องสูงมากเมื่อพิจารณาตลอดอายุการทำงานของ application

Lightweight local service ไม่น่าสนใจมากเหมือนเมื่อก่อน ด้วย backing service สมัยใหม่อย่างเช่น Memcached, PostgreSQL และ RabbitMQ ไม่มีความแตกต่างกันในการติดตั้งและทำงาน ต้องขอบคุณระบบ packaging สมัยใหม่ อย่างเช่น [Homebrew](http://mxcl.github.com/homebrew/) และ [apt-get](https://help.ubuntu.com/community/AptGet/Howto) อีกทางเลือกหนึ่ง เครืองมือจัดเตรียมที่เปิดเผยอย่างเช่น [Chef](http://www.opscode.com/chef/) และ [Puppet](http://docs.puppetlabs.com/) รวม light-weight สิ่งแวดล้อมเสมือนอย่างเช่น [Docker](https://www.docker.com/) และ [Vagrant](http://vagrantup.com/) ทำให้ developer รัน app ในสิ่งแวดล้องของเครื่องได้ใกล้เคียงกับสิ่งแวดล้อมของ production มากที่สุด และค่าใช้จ่ายของการติดตั้งและใช้งานระบบเหล่านี้ต่ำมากถ้าเทียบกับประโยชน์ที่ได้รับสำหรับความเท่าเทียมกันของ dev/prod และการ deployment ที่ต่อเนื่อง

Adapter ไปยัง backing service ที่แตกต่างกันยังคงมีประโยชน์อยู่ เพราะว่าจะทำให้ port ไปใช้กับ backing service ใหม่ๆ ได้อย่างง่ายดาย แต่การ deploy ทั้งหมดของ app (developer environment, staging, production) ควรจะใช้ชนิดและเวอร์ชันที่เหมือนกันของแต่ล่ะ backing service.


