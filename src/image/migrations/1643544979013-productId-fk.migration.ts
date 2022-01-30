import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductIdForeignKeyMigration1643544979013
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "image"
      ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"
    `);
  }
}
