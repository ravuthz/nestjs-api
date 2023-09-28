import { Test, TestingModule } from '@nestjs/testing';
import { KnexService } from './knex.service';
import { KnexModule } from './knex.module';
import knexConfig from './config';

describe('KnexService', () => {
  let service: KnexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.forRoot(knexConfig)],
      providers: [KnexService],
    }).compile();

    service = module.get<KnexService>(KnexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
