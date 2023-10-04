import { Injectable } from '@nestjs/common';
import { TypeormService } from './typeorm/typeorm.service';

@Injectable()
export class AppService {
  constructor(private typeormService: TypeormService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDatabaseVersion(): Promise<string> {
    const res = await this.typeormService.getDatabaseVersion();
    return res?.[0]?.version || null;
  }
}
