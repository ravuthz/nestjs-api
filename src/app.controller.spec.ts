import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!');
    });
  });

  describe('root db version', () => {
    it('should return database version', async () => {
      const version = await controller.getDatabaseVersion();
      expect(version).toBeTruthy();
    });
  });
});
