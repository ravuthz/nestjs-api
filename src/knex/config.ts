const {
  DB_SSL,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DATABASE_URL,
} = process.env;

const knexConfig = {
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL || null,
    host: DB_HOST,
    port: +DB_PORT,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    ssl: DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: '../database/seeds',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: '../database/migrations',
  },
  useNullAsDefault: true,
};

export default knexConfig;
