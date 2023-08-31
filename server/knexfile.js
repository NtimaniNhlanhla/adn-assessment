// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/config/db/migrations',
    },
    seeds: {
      directory: __dirname + '/config/db/seeds'
    }
  }
};
