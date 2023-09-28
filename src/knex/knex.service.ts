import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IKnexService, KnexOptions } from './interfaces';
import { KNEX_OPTIONS } from './constants';
import { Knex, knex } from 'knex';

@Injectable()
export class KnexService implements IKnexService {
  private readonly logger: Logger;
  private connection: any;

  constructor(@Inject(KNEX_OPTIONS) private options: KnexOptions) {
    this.logger = new Logger('KnexService');
    this.logger.log(`Options: ${JSON.stringify(this.options, null, 2)}`);
  }

  getConnection(): Knex {
    if (!this.connection) {
      this.connection = knex(this.options);
    }
    return this.connection;
  }

  getDatabaseVersion() {
    return this.getConnection()
      .raw('SELECT version() as version')
      .then(({ rows }) => rows[0]?.version);
  }

  findAll(table: string) {
    return this.getConnection().table(table);
  }

  findOne(table: string, id: number) {
    if (!id) {
      throw new NotFoundException(`The ${table} ${id} does not exist`);
    }
    return this.getConnection().table(table).where('id', id);
  }

  create(table: string, payload: any) {
    try {
      return this.getConnection().table(table).insert(payload);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  update(table: string, id: number, payload: any) {
    try {
      return this.getConnection().table(table).where('id', id).update(payload);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  remove(table: string, id: number) {
    if (!id) {
      throw new NotFoundException(`The ${table} ${id} does not exist`);
    }
    return this.getConnection().table(table).where('id', id).del();
  }
}
