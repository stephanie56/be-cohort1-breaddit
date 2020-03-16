## How to Test

- Clone this repository
- Run `npm install` to install packages
- Run `npm run start` to start the application
- The server is open at `http://localhost:3000/`
- Swagger documentation is available at `http://localhost:3000/api-docs`

## Installation

Install Docker Compose:
https://docs.docker.com/compose/install/

Build the app and run it:

```sh
$ yarn
$ docker-compose up --build
```

You should only need to do this the first time.

## Run the app locally

You should only have to build with docker compose the first time you install the app, if you add new dependencies or if the Dockerfile configuration changes. Once you've built it you should be able to run the app locally using:

```sh
$ docker-compose up
```

## Run the app in production

```
$ yarn start
```

## Database

To create a new migration

```sh
$ npm run db:migrate:create -- <migration_name>
```

To run a migration

```sh
$ npm run db:migrate:latest
```

To rollback a migration

```sh
$ npm run db:migrate:rollback
```

To seed the database

```sh
$ npm run db:seed
```

## Middleware

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

Middleware can be at the application level or at the router level.

## Testing

Using `jest` and `supertest` for API testing.

## Environment variables

Environment variables are to be loaded in through a `.env` file. Anything that needs to be configured by environment or kept a secret should live in the `.env` file and it should never be checked in.

## Commit messages

In order to keep a clean git history merges should always be squashed with a consistent commit message style.
