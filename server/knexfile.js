// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  
  development: {
    client: 'pg',
    
    connection: {
      connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    },
    migrations: {
      directory: __dirname + '/config/db/migrations',
    },
    seeds: {
      directory: __dirname + '/config/db/seeds'
    }
  }
};
