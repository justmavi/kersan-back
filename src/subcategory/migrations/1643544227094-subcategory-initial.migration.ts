import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubcategoryInitialMigration1643544227094
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "subcategory" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "categoryId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_accfb3da1d9f29dbda6c7554b2e" UNIQUE ("name"),
        CONSTRAINT "UQ_fc90e7503abcc8e818f3a13987b" UNIQUE ("slug"),
        CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subcategory"`);
  }
}
