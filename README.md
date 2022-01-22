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
NODE_ENV=development
HTTP_PORT=3000
UPLOADS_FOLDER=./images
JWT_SECRET=$2a$15$pgeoqtvOHk7t5DBSg0Nfm.xuUX5snozrWuEcjvq7zoFxskjmV7IyK
JWT_EXPIRATION_TIME=24h
BCRYPT_PASS_HASH_ROUNDS=10
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

3. Run application

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Stay in touch

- Author - [Grish Poghosyan](https://www.linkedin.com/in/grishpoghosyan)
