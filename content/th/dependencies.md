## II. Dependencies
### มีการประกาศและแยกการอ้างอิง (dependency) ทั้งหมดอย่างชัดเจน

ภาษาโปรแกรมส่วนใหญ่จะมีระบบ packaging สำหรับรองรับ library ต่างๆ อย่างเช่น [CPAN](http://www.cpan.org/) สำหรับ Perl หรือ [Rubygems](http://rubygems.org/) สำหรับ Ruby, Library จะถูกติดตั้งผ่านทางระบบ packaging สามารถติดตั้ง system-wide (เรียกว่า "site packages") หรือกำหนดขอบเขตเป็นไดเรกทรอรีที่มี app (เรียกว่า "vendoring" หรือ "bundling")

**twelve-factor app ไม่ขึ้นอยู่กับ implicit existence of system-wide packages.** โดยประกาศการอ้างอิงทั้งหมด อย่างครบถ้วน และอย่างแน่นอน ด้วย *dependency declaration* manifest นอกจากนี้ใช้เครื่องมือ *dependency isolation* ระหว่างทำงานเพื่อให้แน่ใจว่าไม่มีการอ้างอิงแบบปริยาย "รั่ว (leak in)" จากระบบรอบๆ, รายละเอียดการอ้างอิงที่ครบถ้วนและชัดเจนใช้รูปแบบเดียวกันทั้ง production และ development

ตัวอย่างเช่น [Bundler](https://bundler.io/) สำหรับ Ruby มีรูปบบ `Gemfile` manifest สำหรับประการการอ้างอิง และ `bundle exec` สำหรับแยกการอ้างอิง ใน Python มีเครื่องมือ 2 ตัวสำหรับแต่ละขั้นตอน -- [Pip](http://www.pip-installer.org/en/latest/) ใช้สำหรับประกาศอ้างอิง และ [Virtualenv](http://www.virtualenv.org/en/latest/) สำหรับแยกการอ้างอิง แม้อย่าง C มี [Autoconf](http://www.gnu.org/s/autoconf/) สำหรับประการการอ้างอิง และ static linking สามารถทำแยกการอ้างอิงได้ ไม่ว่าจะใช้เครื่องมืออะไรก็ตามแต่การประการศและแยกการอ้างอิงจำเป็นเสมอที่ใช้ร่วมกัน -- ถ้ามีเพียงหนึ่งหรืออื่นๆ ไม่เพียงพอที่ตรงตาม twelve-factor

ประโยชน์อย่างหนึ่งของการประกาศการอ้างอิงที่ชัดเจนคือลดความยุ่งยากในการติดตั้งสำหรับ developer ใหม่สำหรับ app, developer ใหม่สามารถ check out codebase ของ app มายังเครื่องที่ใช้ development ต้องการเพียงแค่ติดตั้ง language runtime และ dependency manager เป็นข้อกำหนดเบื้องต้น พวกเขาจะสามามารถติดตั้งทุกสิ่งที่ต้องการเพื่อจะรัน code ของ app ด้วย *build command* ตัวอย่างเช่น ใช้ build command สำหรับ Ruby/Bundler คือ `bundle install` ขณะที่ Clojure/[Leiningen](https://github.com/technomancy/leiningen#readme) คือ `lein deps`

Twelve-factor app ยังคงไม่ขึ้นอยู่กับเครื่องมือที่มีอยู่แล้ว ตัวอย่างเช่นใช้ shell out ไปยัง ImageMagick หรือ `curl` ขณะที่เครื่องมือเหล่านี้อาจจะมีอยู่บนระบบส่วนใหญ่แล้ว ซึ่งจะไม่รับประกันว่าจะมีอยู่บนเครื่องทั้งหมดซึ่ง app จะทำงานในอนาคต หรือ version ที่หาเจอในเครื่องที่จะไปทำงานในอนาคตจะเข้ากันได้กับ app ถ้า app จำเป็น shell out ใช้เครื่องมือของเครื่อง ที่เครื่องมืออาจจะ vendord ให้ app
