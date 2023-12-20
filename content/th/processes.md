## VI. Processes
### รันแอพพลิเคชันเป็นหนึ่งหรือมากกว่าให้เป็น stateless processes

App ทำงานในสภาพแวดล้อมการดำเนินงานด้วยหนึ่งหรือมากกว่า *processes*

ในกรณีที่ง่ายที่สุดคือ code คือ stand-alone script, สภาพแวดล้อมการดำเนินงานคือเครื่องคอมพิวเตอร์อง developer ที่ติดตั้ง language runtime และวิธีการคือเปิด app ด้วยคำสั่ง (ตัวอย่างเช่น `python my_script.py`) ในอีกด้านหนึ่ง app ที่ซับซ้อนที่ deploy บน production ใช้หลาย [process types, instantiated into zero or more running processes](./concurrency)

**Twelve-factor processes เป็น stateless และ [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).** ข้อมูลใดๆที่จำเป็นต้องเก็บแบบถาวรจำเป็นต้องเก็บไว้ใน stateful [backing service](./backing-services) โดยปรกติจะเป็นฐานข้อมูล

พื้นที่หน่วยความจำหรือระบบไฟล์ของ process สามารถใช้เป็นช่วงสั้นๆ ได้, single-transaction cache. ตัวอย่างเช่น, การดาวน์โหลดไฟล์ขนาดใหญ่, ดำเนินงานกับไฟล์นั้น และเก็บผลลัพธ์ของการดำเนินงานไว้ในฐานข้อมูล twelve-factor app ไม่เคยสมมติว่ามีอะไรแคชในหน่วยความจำหรือบน disk จะพร้อมใช้งานใน request หรือ job ในอนาคต -- มีหลาย process ทำงานมีโอกาสสูงมากที่ในอนาคต request จะทำงานบน process ที่แตกต่างกัน แม้ว่าทำงาน process เดียว เมื่อมีการ restart (trigger โดย code deploy, config change หรือเปลี่ยนสภาพแวดล้อมการทำงาน) จะลบสภานะของ app ทั้งหมดอย่างสมบูรณ์ (เช่น หน่วยความจำ และระบบไฟล์)

Asset packagers อย่างเช่น [django-assetpackager](http://code.google.com/p/django-assetpackager/) ใช้ระบบไฟล์เป็นแคชของการ compiled asset. Twelve-factor app ชอบที่จะทำ compiling เช่นนี้ในระหว่าง [ขั้นตอนการ build](/build-release-run) Asset packagers อย่างเช่น [Jammit](http://documentcloud.github.com/jammit/) และ [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) สามารถตั้งค่าให้ pacakge asset ระหว่างขั้นตอนการ build ได้

บางระบบเว็บขึ้นอยู่กับ ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- นั้นคือ, ทำการแคชขอมูล user session ในหน่วยความจำของ app สำหรับดำเนินการในอนาคตจากผู้เยี่ยมชมเดียวกันที่เชื่อมโยงกับ process เดียวกัน, Sticky session เป็นการละเมิด twelve-factor และไม่ควรใช้หรือพึ่งพา, ข้อมูลสถานะ Session เป็นสิ่งที่เหมาะสมอย่างมากสำหรับที่เก็บข้อมูลที่มีการหมดเวลา (time-expireation) อย่างเช่น [Memcached](http://memcached.org/) หรือ [Redis](http://redis.io/)
