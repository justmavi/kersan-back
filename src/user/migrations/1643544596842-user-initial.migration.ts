import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserInitialMigration1643544596842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "UQ_ac08b39ccb744ea6682c0db1c2d" UNIQUE ("slug"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
