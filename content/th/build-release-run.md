## V. Build, release, run
### แยกขั้นตอนของการ build และ run อย่างเคร่งครัด

[codebase](./codebase) จะเปลี่ยนแปลงไปเป็น (non-development) deploy ด้วย 3 ขั้นตอน:

* *ขั้นตอนการ build* เป็นการแปลงซึ่งเป็นการเปลี่ยน code repo ไปเป็นโปรแกรมที่ทำงานได้ (executable bundle) เรียกว่าการ *build* ใช้ version ของ code ที่ระบุ commit ด้วยกระบวนการ deployment ซึ่งขั้นตอนการ build นี้จะดึง[การอ้างอิง](./dependencies) และ compile เป็น binariy และ assets.
* *ขั้นตอนการ release* จะนำ build ที่ได้จากขั้นตอนการ build และรวามเข้ากับ [การตั้งค่า](./config) ของ deploy ซึ่งจะได้ *release* ที่มีทั้ง build และ การตั้งค่า ที่พร้อมจะทำงานได้ในสิ่งแวดล้อมการทำงาน
* *ขั้นตอนการ run* (หรือเรียกว่า "runtime") เป็นการทำให้ app ทำงานในสิ่งแวดล้อมการทำงาน ด้วยการเริ่มใช้งานบางเซตของ app [processes](./processes) ด้วย release ที่ถูกเลือก

![Code becomes a build, which is combined with config to create a release.](/images/release.png)

**Twelve-factor app ใช้การแยกขั้นตอนการ build, release และ run ออกจากกันอย่างเคร่งครัด** ตัวอย่างเช่น เป็นไปไม่ได้ที่ทำการเปลี่ยนแปลงของ code ในขณะทำงาน เนื่องจากไม่มีวิธีใดในการเผยแพร่การเปลี่ยนแปลงกลับสู่สถานะ build

เครื่องมื่อสำหรับ deployment โดยทั่วไปจะมีเครื่องมือจัดการการ release อยู่แล้ว และส่วนใหญ่จะมีความสามารถ roll back กลับสู่ release ก่อนหน้าได้ ตัวอย่างเช่น [Capistrano](https://github.com/capistrano/capistrano/wiki) เป็นเครื่องมือ deployment ที่เก็บการ release ในไดเรกทอรีย่อยชื่อว่า `releases` ที่ซึ่ง release ปัจจุบันเชื่อมโยงเข้ากับไดเรกทอรี release ปัจจุบัน สามารถใช้คำสั่ง `rollback` เพื่อทำให้มัน roll back กลับไปเป็น release ก่อนหน้าอย่างรวดเร็ว

ทุกๆ release ควรจะมี release ID เฉพาะเสมอ เช่น timestamp ของ release (เช่น `2011-04-06-20:32:17`) หรือจำนวนนับที่เพิ่มขึ้น (เช่น `v100`), release เป็นบัญชีแยกประเภทที่เพิ่มขึ้นได้เท่านั้นและ release ไม่สามารถแก้ไขได้เมื่อถูกสร้างขึ้นแล้ว ทุกๆ การเปลี่ยนแปลงจำเป็นต้องสร้าง release ใหม่เสมอ

การ build เริ่มต้นโดย developer ของ app เมื่อไรก็ตามที่ code ใหม่ถูก deploy, การทำงานในขณะทำงาน ในทางตรงกันข้าม สามารถเกิดขึ้นได้โดยอัตโนมัติในกรณีที่ server reboot หรือ crashed process ถูก restart โดย process manager ดังนั้นขั้นตอนการ run ถูกทำให้มีขั้นตอนน้อยที่สุดเท่าที่จะเป็นไปได้ เพื่อป้องกันปัญหา app สามารถหยุดการทำงานได้ในเวลาตอนกลางคืนเมื่อไม่มี developer อยู่ทำงาน ขั้นตอนการ build สามารถเป็นขั้นตอนที่ซับซ้อนได้ ในเมื่อ error จะแสดงต่อ developer ผู้ซึ่งทำการ deploy มัน

