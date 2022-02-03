import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordResetHashInitialMigration1643898055213
  implements MigrationInterface
{
  name = 'PasswordResetHashInitialMigration1643898055213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "password_reset_hash" (
                "id" SERIAL NOT NULL,
                "hash" character varying NOT NULL,
                "userId" integer NOT NULL,
                "expiresIn" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_011d91b7bb3ff4f2bf6feafeb4" UNIQUE ("userId"),
                CONSTRAINT "PK_149494c17f1fb75515551cf721f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "password_reset_hash"
            ADD CONSTRAINT "FK_011d91b7bb3ff4f2bf6feafeb48" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "password_reset_hash" DROP CONSTRAINT "FK_011d91b7bb3ff4f2bf6feafeb48"
        `);
    await queryRunner.query(`
            DROP TABLE "password_reset_hash"
        `);
  }
}
