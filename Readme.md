
## Documentation

Code structur using S.O.L.I.D Principles

## Run Locally

Clone the project

```bash
  git clone https://github.com/gilangginti/backend-seryu
```

Go to the project directory

```bash
  cd backend-seryu
```

Install dependencies

```bash
  npm install
```
Migrate schema using prisma or execute file migration.sql from folder Prisma/migration/migration.sql

```bash
prisma migrate dev --name init
```
 
Start the server

```bash
  npm run dev
```

For documentation API visit http:://localhost:8080/api-docs