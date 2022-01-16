## Installation

```bash
$ yarn install
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
