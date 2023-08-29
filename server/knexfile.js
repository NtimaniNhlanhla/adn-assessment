// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '576108',
      database: 'tickets_DB',
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
