## The Twelve Factors

<ul class="list pl0">
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./codebase" class="link purple underline-hover">I. Codebase</a></b>
        <span class="f4 db lh-copy">มีเพียง codebase เดียวที่ติดตามด้วย version control, มีหลาย deploy</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./dependencies" class="link purple underline-hover">II. Dependencies</a></b>
        <span class="f4 db lh-copy">มีการประกาศและแยกการอ้างอิง (dependency) ทั้งหมดอย่างชัดเจน</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./config" class="link purple underline-hover">III. Config</a></b>
        <span class="f4 db lh-copy">จัดเก็บการตั้งค่า (config) ไว้ในสิ่งแวดล้อมของระบบ</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./backing-services" class="link purple underline-hover">IV. Backing services</a></b>
        <span class="f4 db lh-copy">จัดการกับบริการสนับสนุน (backing service) ให้เป็นทรัพยากรที่แนบมา</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./build-release-run" class="link purple underline-hover">V. Build, release, run</a></b>
        <span class="f4 db lh-copy">แยกขั้นตอนของการ build และ run อย่างเคร่งครัด</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./processes" class="link purple underline-hover">VI. Processes</a></b>
        <span class="f4 db lh-copy">รันแอพพลิเคชันเป็นหนึ่งหรือมากกว่าให้เป็น stateless processes</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./port-binding" class="link purple underline-hover">VII. Port binding</a></b>
        <span class="f4 db lh-copy">นำออกบริการด้วยการเชื่อมโยง port</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./concurrency" class="link purple underline-hover">VIII. Concurrency</a></b>
        <span class="f4 db lh-copy">ขยายออกของแอพพลิเคชันด้วยรูปแบบ process</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./disposability" class="link purple underline-hover">IX. Disposability</a></b>
        <span class="f4 db lh-copy">เพิ่มความแข็งแกร่งด้วยการเริ่มต้นระบบอย่างรวดเร็วและปิดระบบอย่างนุ่มนวล</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./dev-prod-parity" class="link purple underline-hover">X. Dev/prod parity</a></b>
        <span class="f4 db lh-copy">รักษา development, staging และ production ให้มีความใกล้เคียงกันที่สุด</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./logs" class="link purple underline-hover">XI. Logs</a></b>
        <span class="f4 db lh-copy">จัดการ logs ให้เป็นแบบ event stream</span>
    </li>
    <li class="pv4 pv4-ns bb b--black-10"><b class="db f4 mb1"><a href="./admin-processes" class="link purple underline-hover">XII. Admin processes</a></b>
        <span class="f4 db lh-copy">รันงานของผู้ดูแลระบบ/การจัดการให้เป็นกระบวนการแบบครั้งเดียว</span>
    </li>
</ul>
