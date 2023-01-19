import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntity1674085723217 implements MigrationInterface {
    name = 'UpdateEntity1674085723217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workstation" DROP CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7"`);
        await queryRunner.query(`ALTER TABLE "workstation" ADD "is_regional" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workstation" ADD CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workstation" DROP CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7"`);
        await queryRunner.query(`ALTER TABLE "workstation" DROP COLUMN "is_regional"`);
        await queryRunner.query(`ALTER TABLE "workstation" ADD CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
