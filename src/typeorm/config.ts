import 'dotenv/config';

import { join } from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_SSL,
  DB_SSL_REJECT_UNAUTHORIZE,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
  DB_DEBUG,
} = process.env;

const sourceDir = join(__dirname, '..');
const entitiesDir = sourceDir;
const seedingDir = join(sourceDir, 'database', 'seeders');
const migrationsDir = join(sourceDir, 'database', 'migrations');
const subscribersDir = join(sourceDir, 'database', 'subscribers');

const factories = [
  // factories: ['src/database/factories/**/*{.ts,.js}'],
  join(sourceDir, 'database', 'factories', '**', '*{.ts,.js}'),
];

const seeds = [
  // 'src/database/seeders/**/*{.ts,.js}',
  // 'src/database/seeders/setting.seed.ts',
  // 'src/database/seeders/project.seed.ts',
  join(sourceDir, 'database', 'seeders', 'setting.seed.ts'),
  join(sourceDir, 'database', 'seeders', 'project.seed.ts'),
];

// console.log({
//   __dirname,
//   entitiesDir,
//   migrationsDir,
//   subscribersDir,
// });

export const typeOrmOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  logging: DB_DEBUG == 'true',
  synchronize: false,
  migrationsRun: false,
  entities: [join(entitiesDir, '**', '*.entity.{ts,js}')],
  migrations: [join(migrationsDir, '*.{ts,js}')],
  subscribers: [join(subscribersDir, '*.{ts,js}')],
  autoLoadEntities: true,
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    entitiesDir,
    migrationsDir,
    subscribersDir,
  },
  extra: {
    ssl:
      DB_SSL === 'true'
        ? {
            rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZE === 'true',
            ca: DB_SSL_CA,
            key: DB_SSL_KEY,
            cert: DB_SSL_CERT,
          }
        : false,
  },

  baseDirectory: '.',
  factories,
  seeds,
};

export const AppDataSource = new DataSource(
  typeOrmOptions as DataSourceOptions,
);

export default typeOrmOptions as TypeOrmModuleOptions;
