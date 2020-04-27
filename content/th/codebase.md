## I. Codebase
### มีเพียง codebase เดียวที่ติดตามด้วย version control, มีหลาย deploy

Twelve-factor app สามารถติดตามได้เสมอด้วย version control เช่น [Git](http://git-scm.com/), [Mercurial](https://www.mercurial-scm.org/), หรือ [Subversion](http://subversion.apache.org/) สำเนาของฐานข้อมูลติดตาม version เรียกว่า *code repository* หรือเรียกสั้นๆว่า *code repo* หรือเรียกเพียงแค่ *repo*

*codebase* เป็น repo เดียวใดๆ (ในระบบ version control ที่มีศูนย์กลางอย่างเช่น Subversion) หรือเป็นเซตของ repo ซึ่งแบ่งปัน root commit (ในระบบ version control ที่ไม่มีศูนย์กลางอย่างเช่น Git)

![One codebase maps to many deploys](/images/codebase-deploys.png)

มีความสัมพันธ์แบบ หนี่ง-ต่อ-หนึ่ง เสมอ ระหว่าง codebase และ app:

* ถ้ามีหลาย codebase, จะไม่เป็น app -- จะเป็นระบบกระจาย (distributed system) แต่ละคอมโพแนนท์ในระบบกระจายเป็น app, และแต่ล่ะคอมโพแนนท์จะปฏิบัติตาม twelve-factor
* ถ้ามีหลาย app ที่ใช้งาน code เดียวกันจะเป็นการละเมิด twelve-factor วิธีแก้ปัญหาในที่นี้คือเอา code ที่ใช้ร่วมกันทำเป็น libraries ซึ่งสามารถเข้ากับ factor [dependency manager](./dependencies)

มีเพียงหนึ่ง codebase ต่อ app แต่มีหลาย deploy หรือการนำไปใช้งานของ app, หนึ่ง *deploy* จะรัน instance ของ app นี่เป็น production site และมีหนึ่งหรือมากว่า staging site เพิ่มเติม, developer ทุกคนจะมีสำเนาเดียวของ app ที่ทำงานอยู่บนสิ่งแวดล้อมพัฒนาในเครื่องของตนเอง ซึ่งจัดได้ว่าเป็น deploy ด้วยเช่นกัน

Codebase จะเหมือนกันตลอดทั้ง deploy ทั้งหมด แม้ว่า version จะแตกต่างกันอาจจะทำงานในแต่ล่ะ deploy ตัวอย่างเช่น developer มีบาง commit ที่ยังไม่ได้ deploy ไปยัง staging ซึ่ง staging จะมีบาง commit ที่ยังไม่ได้ deploy ไปยัง production แต่ทั้งหมดจะใช้ codebase เดียวกัน ดังนั้นจะต้องทำให้ระบุตัวตนได้ว่าเป็น deploy ที่แตกต่างกันของ app เดียวกัน

