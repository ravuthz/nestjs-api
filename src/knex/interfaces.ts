import { ModuleMetadata, Type } from '@nestjs/common';
import { Knex } from 'knex';

export type KnexOptions = Knex.Config;

export interface IKnexService {
  getConnection();
}

export interface KnexConnectOptions {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface KnexOptionsFactory {
  createKnexOptions(): Promise<KnexOptions> | KnexOptions;
}

export interface KnexAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<KnexOptionsFactory>;
  useClass?: Type<KnexOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KnexOptions> | KnexOptions;
}
