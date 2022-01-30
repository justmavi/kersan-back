import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryIdSubcategoryIdForeignKeyMigration1643545126660
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "product"
      ADD CONSTRAINT "FK_904b30d0611df66f73164e999db" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product" DROP CONSTRAINT "FK_904b30d0611df66f73164e999db"
    `);

    await queryRunner.query(`
      ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"
    `);
  }
}
