import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1696157245108 implements MigrationInterface {
  name = 'InitialTables1696157245108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demo" ("id" SERIAL NOT NULL, "version" integer NOT NULL DEFAULT '0', "name" character varying NOT NULL, "note" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" integer, "updated_by" integer, "deleted_by" integer, CONSTRAINT "UQ_e3c5ed7809151d2010262f51275" UNIQUE ("name"), CONSTRAINT "PK_9d8d89f7764de19ec5a40a5f056" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "demo"`);
  }
}
