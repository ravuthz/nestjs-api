import { Test, TestingModule } from '@nestjs/testing';

import { TypeormModule } from './typeorm.module';
import { TypeormService } from './typeorm.service';
import typeOrmOptions from './config';

describe('TypeormService', () => {
  let app: TestingModule;
  let service: TypeormService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [TypeormModule.forRoot(typeOrmOptions)],
    }).compile();

    service = app.get<TypeormService>(TypeormService);
  });

  afterEach(async () => {
    await service.closeConnection();
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get database version', async () => {
    const res = await service.getDatabaseVersion();
    expect(res[0]).toHaveProperty('version');
  });
});
