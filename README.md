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

1. Clone `.env.example` file into `.env`

```bash
$ cp .env.example .env
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

4. Run migrations

```bash
$ yarn migrate:run
```

5. Run application

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
