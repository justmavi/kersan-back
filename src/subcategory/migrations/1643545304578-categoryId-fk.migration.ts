import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryIdForeignKeyMigration1643545304578
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "subcategory"
      ADD CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "subcategory" DROP CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2"
    `);
  }
}
