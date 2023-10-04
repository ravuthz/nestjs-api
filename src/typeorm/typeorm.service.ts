import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

const logger = new Logger('TypeormService');

@Injectable()
export class TypeormService {
  constructor(private manager: EntityManager) {}

  getManager(): EntityManager {
    return this.manager;
  }

  getDatabaseVersion(): Promise<any> {
    return this.getManager()
      .query('SELECT version() as version')
      .then((res) => {
        logger.debug(res);
        return res;
      })
      .catch((err) => {
        logger.error(err);
        return err;
      });
  }

  closeConnection(): Promise<any> {
    return this.getManager()
      .connection.destroy()
      .then((res) => {
        logger.debug(res);
        return res;
      })
      .catch((err) => {
        logger.error(err);
        return err;
      });
  }
}
