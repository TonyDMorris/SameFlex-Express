# Project Title

NC-NEWS is my attemp at a replication of a back-end news website.
I created this to learn more about Express.js, Knex.js, TDD, and Node.js in general.

a working version of this back end is hosted on [Heroku](https://pure-falls-39051.herokuapp.com/api).

## Getting Started

For this project a number of scripts are included but the following instructions will tell you how to do this using the native knex and psql commands

#### first things first

for this to work you will need to install psql, you can follow the tutorial here for linux [psql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)

##### IT IS HIGHLY RECOMENDED THAT YOU SETUP PSQL WITH A NEW PASSWORD YOU HAVE NOT USED ANYWHERE ELSE AS SOME MISTAKES COULD LEAD TO YOU COMMITING THIS INFORMATION TO THE INTERNET.

As the setup is different on linux than on other systems i will be focusing on linux but the instructions are genrally relevant to all systems
the main diffrence is that knex requires your database username and password to make a connection.
but we will cover this further down.

#### npm install

```bash
npm install
```

This will install a number of dependencies including mocha, chai,chai-sorted, pg, knex,supertest, and express.

##### please note you will need to install knex globally to make use of the raw knex commands that are about to follow

####In order to setup this project locally you should run the setup.sql file located under ./db/setup.sql

You can do this by executing this command.

```bash
psql -f ./db/setup.sql
```

#### linux users only

Once your database is up and running you will need to navigate to ./knexfile.js

and change the username, and password to reference your psql username and psql password.

you should find some code that looks like this, you only need to change the development and test keys.

```js
const customConfigs = {
  development: {
    connection: {
      database: "nc_news",
      username: "YOUR PSQL USERNAME",
      password: "YOUR PSQL PASSWORD"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "YOUR PSQL USERNAME",
      password: "YOUR PSQL PASSWORD"
    }
```

##### its highly recommended that you import these in from a file that is gitignored so that when these files are commited to your remote repository your private information is not available for all to see.

#### Once you have initialised your dev and test databases you can use knex migrate to make use of the supplied migration files under ./db/migrations

the following command will tell knex to execute each of the migration files in time stamp order.

```bash
knex migrate:latest
```

this will create all of the necessary tables for your database with the correct columns.

#### Once the tables and columns have been established we need to seed them, luckily knex has another command which allows us to do this.

Using knex seed run tells knex to execute the seed file located in ./knexfile.js
e.g...

```js
const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
const baseConfig = {
  client: "pg",

  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds" //<------------------
  }
};
```

You will notice that the first line of this file makes use of a conditional statment, this is used for testing but we'll speak more on this later.

for now execute this command

```bash
knex seed:run
```

this will seed the database with some data, you can find the raw data here --> ./db/data/dev-data if you should like to take a look.

#### Lets see if it worked

To check your migrations and seeding worked you can login to psql \c into nc_news and select \* from articles
to receive a huge list of articles.

### testing

## Deployment

## Built With

## Contributing

## Versioning

## Authors

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
