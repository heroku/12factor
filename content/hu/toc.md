The Twelve Factors
==================

## [I. Kódbázis](./codebase)
### Egy kódbázis kódtárban kezelve, több telepítés

## [II. Függőségek](./dependencies)
### Mindig explicit módon deklaráljuk és különítsünk el a függőségeket

## [III. Konfiguráció](./config)
### A konfigurációs beállításokat tároljuk a környezetben

## [IV. Háttérszolgáltatások](./backing-services)
### Kezeljük a háttérszolgáltatásokat csatolt erőforrásokként

## [V. Előállítás, telepítés, üzemeltetés](./build-release-run)
### Egyértelműen válasszuk külön a forráskód futtathatóvá alakítását (BUILD), telepítését (RELEASE) és telepített alkalmazásunk üzemeltetését (RUN)

## [VI. Folyamatok](./processes)
### Az alkalmazást egy vagy több állapot nélküli folyamatként futtassuk

## [VII. Hálózati port hozzárendelés](./port-binding)
### Tegyük a szolgáltatásainkat port hozzárendeléssel elérhetővé

## [VIII. Párhuzamos folyamatok](./concurrency)
### Szolgáltatásunkat a nagyobb terheléshez -az állapot nélküli- folyamat modellünknek köszönhetően méretezzük át menet közben

## [IX. Eldobhatóság](./disposability)
### Az elérhető legnagyobb hibatűrés gyors üzembehelyezéssel és egyszerű, gördülékeny leállítással

## [X. Egyensúly a fejlesztés és az üzemeltetés között](./dev-prod-parity)
### A fejlesztési és az üzemeltetési folyamatok legyenek annyira hasonlóak amennyire csak ez lehetséges

## [XI. Naplók](./logs)
### Kezeljük a naplókat esemény-folyamatként

## [XII. Adminisztratív folyamatok](./admin-processes)
### Futtassuk az adminisztrációs és felügyeleti feladatokat egyszer futó folyamatokként
