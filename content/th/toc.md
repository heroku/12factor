The Twelve Factors
==================

## [I. Codebase](./codebase)
### มีเพียง codebase เดียวที่ติดตามด้วย version control, มีหลาย deploy

## [II. Dependencies](./dependencies)
### มีการประกาศและแยกการอ้างอิง (dependency) ทั้งหมดอย่างชัดเจน

## [III. Config](./config)
### จัดเก็บการตั้งค่า (config) ไว้ในสิ่งแวดล้อมของระบบ

## [IV. Backing services](./backing-services)
### จัดการกับบริการสนับสนุน (backing service) ให้เป็นทรัพยากรที่แนบมา

## [V. Build, release, run](./build-release-run)
### แยกขั้นตอนของการ build และ run อย่างเคร่งครัด

## [VI. Processes](./processes)
### รันแอพพลิเคชันเป็นหนึ่งหรือมากกว่าให้เป็น stateless processes

## [VII. Port binding](./port-binding)
### นำออกบริการด้วยการเชื่อมโยง port

## [VIII. Concurrency](./concurrency)
### ขยายออกของแอพพลิเคชันด้วยรูปแบบ process

## [IX. Disposability](./disposability)
### เพิ่มความแข็งแกร่งด้วยการเริ่มต้นระบบอย่างรวดเร็วและปิดระบบอย่างนุ่มนวล

## [X. Dev/prod parity](./dev-prod-parity)
### รักษา development, staging และ production ให้มีความใกล้เคียงกันที่สุด

## [XI. Logs](./logs)
### จัดการ logs ให้เป็นแบบ event stream

## [XII. Admin processes](./admin-processes)
### รันงานของผู้ดูแลระบบ/การจัดการให้เป็นกระบวนการแบบครั้งเดียว
