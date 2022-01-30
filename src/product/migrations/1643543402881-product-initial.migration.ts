import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductInitialMigration1643543402881
  implements MigrationInterface
{
  name = 'ProductInitialMigration1643543402881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "tags" character varying array,
        "categoryId" integer NOT NULL,
        "subcategoryId" integer NOT NULL,
        "description" character varying,
        "newPrice" numeric NOT NULL,
        "oldPrice" numeric,
        "contains" boolean NOT NULL DEFAULT true,
        "properties" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
        CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug"),
        CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_29a733971f71626611bb3808eb" ON "product" ("description")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_6b71c587b0fd3855fa23b759ca" ON "product" ("createdAt")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "public"."IDX_6b71c587b0fd3855fa23b759ca"
    `);

    await queryRunner.query(`
      DROP INDEX "public"."IDX_29a733971f71626611bb3808eb"
    `);

    await queryRunner.query(`
      DROP TABLE "product"
    `);
  }
}
