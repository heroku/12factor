## VIII. Concurrency
### ขยายออกของแอพพลิเคชันด้วยรูปแบบ process

โปรแกรมคอมพิวเตอร์ใดๆ เมื่อทำงานแล้วจะถูกแทนที่ด้วย 1 หรือมากกว่า process เว็บแอพมีหลายรูปแบบของ process-execution ตัวอย่างเช่น PHP process ทำงานเป็น process ลูกของ Apache, เริ่มต้นตามความต้องการตามปริมาณคำขอ, Java process มีวิธีที่ตรงกันข้ามซึ่ง JVM จะใช้หนึ่ง uberprocess ขนาดใหญ่ที่สงวนบล็อกขนาดใหญ่สำหรับทรัพยากรระบบ (CPU และหน่วยความจำ) ในตอนเริ่มต้น ซึ่งจัดการ concurrency ภายในด้วย thread ทั้งสองกรณี process ที่ทำงานเป็นส่วนที่มองเห็นน้อยมากสำหรับ developer ของ app

![Scale is expressed as running processes, workload diversity is expressed as process types.](/images/process-types.png)

**ใน twelve-factor app, process เป็นพลเมืองชั้นหนึ่ง** Process ใน twelve-factor app จะใช้คำแนะนำจาก [the unix process model for running service daemons](https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/) การใช้รูปแบบนี้ developer สามารถออกแบบ app เพื่อจัดการกับ workload ที่หลากหลายโดยการกำหนดให้ work แต่ละชนิดเป็น *process type** ตัวอย่างเช่น HTTP request อาจจะจัดการด้วย web process และ long-running background tasks จัดการด้วย worker process

ไม่รวม process ย่อยจากการจัดการ multiplexing ภายใน ด้วย thread ข้างใน runtim VM หรือ async/evnted model ที่พบในเครื่องมือเช่น [EventMachine](https://github.com/eventmachine/eventmachine), [Twisted](http://twistedmatrix.com/trac/) หรือ [Node.js](http://nodejs.org/) แต่ VM แต่ละตัวสามารถเติบโตได้มากเท่านั้น (การขยายแนวตั้ง) ดังนั้น application จำเป็นต้องสามารถขยายเป็นหลาย process ทำงานบนหลายเครื่องได้

รูปแบบ process ดีมากเมือมากับ time to scale out [share-nothing, horizontally partitionable nature of twelve-factor app processes](./processes) หมายความว่าเพิ่ม concurrency ได้ง่ายและทำงานได้น่าเชื่อถือ อาเรย์ชนิดของ process และจำนวนของ process ของแต่ละชนิด รู้จักกันใน *process formation*

Process ของ twelve-factor app [should never daemonize](http://dustin.github.com/2010/02/28/running-processes.html) หรือเขียนไฟล์ PID แต่จะขึ้นอยู่กับตัวจัดการ process ของระบบปฏิบัติการแทน (เช่น [systemd](https://www.freedesktop.org/wiki/Software/systemd/), ตัวจัดการ process กระจายบน cloud platform หรือเครื่องมือ อย่างเช่น [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) ใน development) เพื่อจัดการ [output streams](./logs) ตอบสนองต่อ process ที่ล้มเหลว และจัดการ user-initiated restarts และ shutdowns

