## VII. קשירת פורטים
### הוצא שירותים על ידי קשירת פורטים

אפליקציות ווב לרוב מורצות בתוך סביבה של שרת ווב. לדוגמא, אפליקציות PHP יכולות לרוץ כמודול בתוך [Apache HTTPD](http://httpd.apache.org/), או אפליקציות Java ירוצו ב-[Tomcat](http://tomcat.apache.org/).

**אפליקצייה על פי שניים-עשר הגורמים היא עצמאית לחלוטין** ולא מסתמכת על שרת ווב אחר בסביבה על מנת לרוץ. אפליקציית הווב **מאפשרת גישת HTTP על ידי היקשרות לפורט** ומאזינה לבקשות מהפורט הזה.

בסביבת הפיתוח, מפתחים יגשו לשירות דרך כתובת כמו `http://localhost:5000/`. בסביבות פרודקשיין, שכבת ניתוב תעביר את הבקשות מהצד הציבורי אל האפליקציה.

לרוב זה ממומש על ידי [הצהרת תלויות](./dependencies) להוספת שרת ווב לאפליקציה, כמו [Tornado](http://www.tornadoweb.org/) עבור Python, [Thin](http://code.macournoyer.com/thin/) עבור Ruby, או [Jetty](http://www.eclipse.org/jetty/) עבור Java ושפות JVM-based אחרות.

HTTP איננו השירות היחיד שניתן לייצא על ידי קשירת פורטים. ניתן להריץ כמעט כל שירות כך שיאזין לפורט מסוים ויחכה לבקשות. לדוגמא [ejabberd](http://www.ejabberd.im/) (אשר מדבר [XMPP](http://xmpp.org/)), ו-[Redis](http://redis.io/) (אשר מדבר ב-[פרוטוקול Redis](http://redis.io/topics/protocol)).

שים לב כי גישה זו אומרת גם שאפליקצייה אחת יכולה להפוך [לשירות מגבה](./backing-services) של אפליקציה אחרת, על ידי הגדרת ה-URL שלה ב-[קונפיגורציה](./config) של האפליקצייה שצריכה להשתמש בה.

Note also that the port-binding approach means that one app can become the [backing service](./backing-services) for another app, by providing the URL to the backing app as a resource handle in the [config](./config) for the consuming app.
