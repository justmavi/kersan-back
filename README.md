## Installation

1. Clone repository

```bash
$ git clone git@github.com:justmavi/kersan-back.git
$ cd kersan-back
```

2. Install packages with `yarn`

```bash
$ yarn install
```

3. Create `.env` file and describe variables

```bash
$ touch .env
```

## Environment variables

```
NODE_ENV=production
HTTP_PORT=3000

UPLOADS_FOLDER=./images
ALLOWED_EXTENSIONS_TO_UPLOAD=jpg,jpeg,png

JWT_SECRET=$2a$15$pgeoqtvOHk7t5DBSg0Nfm.xuUX5snozrWuEcjvq7zoFxskjmV7IyK
JWT_EXPIRATION_TIME=24h

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=kersanuser
POSTGRES_PASSWORD=ABshXc4ahs3
POSTGRES_DATABASE=kersan

```

## Running the app

1. Delete old sources

```bash
$ yarn prebuild
```

2. Build the app

```bash
$ yarn build
```

3. Run docker containers

```bash
$ docker-compose up --build -d
```

4. Run application

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

For debug mode just press `F5`. App will start automatically by `launch.json` configurations.

## IDE

Recommended to use [Visual Studio Code](https://code.visualstudio.com).<br>
**Necessarily** setup [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).<br>
Check guide: [Config ESLint and Prettier in Visual Studio Code](https://medium.com/how-to-react/config-eslint-and-prettier-in-visual-studio-code-for-react-js-development-97bb2236b31a).

## Stay in touch

- Author - [Grish Poghosyan](https://www.linkedin.com/in/grishpoghosyan)
