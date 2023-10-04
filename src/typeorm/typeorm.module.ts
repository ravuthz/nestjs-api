import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeormService } from './typeorm.service';
import { SeederService } from './seeder.service';

@Module({})
export class TypeormModule extends TypeOrmModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    const parent = super.forRoot(options);
    const services = [TypeormService, SeederService];
    return {
      module: parent.module,
      imports: parent.imports,
      exports: [...(parent?.exports || []), ...services],
      providers: [...(parent?.providers || []), ...services],
    };
  }
}
