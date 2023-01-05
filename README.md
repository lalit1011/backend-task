Installation and Setup
Run npm install to install dependencies

Copy .env.example to .env and replace appropriate variables

Running Migrations `npx sequelize-cli db:migrate` or `npm run migrate`

then Running seeds `npx sequelize-cli db:seed:all` or `npm run seeds`

After that use below credential to login as admin: 
  `email='admin@example.com'`
  `password='123456'`

Navigate routes with http://localhost:8081/*

### Here is env simple
==========================

# Development Admin ENV File
APP_NAME=Test-task
PORT=8081
NODE_ENV=development

# Token Secret
ACCESS_TOKEN_SECRET=sec$@$$re89tKey
ACCESS_TOKEN_EXPIRY=1y

CRYPTO_KEY=test@6684
WEB_TMP_DIRECTORY=tmp/

=============================
