## VII. Port binding
### นำออกบริการด้วยการเชื่อมโยง port

เว็บแอพ (Web App) บางครั้งทำงานข้างใน webserver container. ตัวอย่างเช่น PHP app จะทำงานเป็นโมดูลข้างใน [Apache HTTPD](http://httpd.apache.org/) หรือ Java app จะทำงานข้างใน [Tomcat](http://tomcat.apache.org/) เป็นต้น

**Twelve-factor app เป็น self-contained โดยสมบูรณ์** และไม่ขึ้นอยู่กับ runtime injection ของ webserver เข้ามายังสภาพแวดล้อมการดำเนินงานเพิ่อสร้าง web-facing service. เว็บแอพ **นำออก HTTP เป็นบริการโดยเชื่อมโยงกับ port** และคอยตรวจสอบ request ที่เข้ามาจาก port นั้น

นี้เป็นการทำงานปรกติโดยใช้ [ประกาศการอ้างอิง](./dependencies) เพื่อเพิ่ม webserver library ของ app, เช่น [Tornado](http://www.tornadoweb.org/) สำหรับ Python, [Thin](http://code.macournoyer.com/thin/) สำหรับ Ruby หรือ [Jetty](http://www.eclipse.org/jetty/) สำหรับ Java และภาษา JVM-based อื่นๆ เกิดขึ้นใน *user space* นั้นคือภายใน code ของ app ซึ่งสัญญากับสภาพแวดล้อมการดำเนินงานที่เชื่อมโยงกับ port เพื่อบริการ request ที่เข้ามา

HTTP ไม่เป็นเพียง service ที่สามารถนำออกโดยการเชื่อมโยง port, server software เกือบทุกชนิดสามารถทำงานผ่านการเชื่อมโยง process ไปยัง port และรอ request ที่เข้ามา, ตัวอย่างรวมทั้ง ejabberd](http://www.ejabberd.im/) (speaking [XMPP](http://xmpp.org/)), และ [Redis](http://redis.io/) (speaking the [Redis protocol](http://redis.io/topics/protocol))

หมายเหตุ, วิธีการเชื่อมโยง port หมายความว่า app จะกลายเป็น [backing service](./backing-services) สำหรับ app อื่นๆ โดยการให้ URL กับ backing app เป็นตัวจัดการทรัพยากรใน [การตั้งค่า](./config) สำหรับใช้งาน app
