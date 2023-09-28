import knexConfig from './config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  staging: {
    // client: 'postgresql',
    ...knexConfig,
  },
  production: {
    // client: 'postgresql',
    ...knexConfig,
  },
  development: {
    // client: "sqlite3",
    // connection: {
    //   filename: "./dev.sqlite3",
    // },
    // client: 'postgresql',
    ...knexConfig,
  },
};
