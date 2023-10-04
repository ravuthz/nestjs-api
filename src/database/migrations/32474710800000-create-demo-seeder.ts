import { IsNull, MigrationInterface, Not, QueryRunner } from 'typeorm';
import { Demo } from '../../typeorm/entities/demo.entity';

export class CreateDemoSeeder32474710800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<Demo>(Demo, {
        name: 'Test 1',
        note: 'Demo Test 1',
      }),
    );

    await queryRunner.manager.insert<Demo>(Demo, {
      name: 'Test 2',
      note: 'Demo Test 2',
    });

    await queryRunner.manager.insert<Demo>(Demo, {
      name: 'Test 3',
      note: 'Demo Test 3',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete<Demo>(Demo, {
      id: Not(IsNull()),
    });
  }
}
