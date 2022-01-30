import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImageInitialMigration1643543989074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "image" (
        "id" SERIAL NOT NULL,
        "path" character varying NOT NULL,
        "name" character varying NOT NULL,
        "realName" character varying NOT NULL,
        "productId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
