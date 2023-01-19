import { MigrationInterface, QueryRunner } from 'typeorm';

export class workstation1673662756449 implements MigrationInterface {
  name = 'workstation1673662756449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /*await queryRunner.query(
      `CREATE TABLE "workstation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "ip" character varying NOT NULL, "gateway" character varying NOT NULL, "cityId" uuid, "parentWorkstationId" uuid, CONSTRAINT "PK_305422595c2601e928ff7520516" PRIMARY KEY ("id"))`,
    );
    //await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
    await queryRunner.query(
      `ALTER TABLE "workstation" ADD CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workstation" ADD CONSTRAINT "FK_6c475015220473ee5da99ed649c" FOREIGN KEY ("parentWorkstationId") REFERENCES "workstation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );*/
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /*await queryRunner.query(
      `ALTER TABLE "workstation" DROP CONSTRAINT "FK_6c475015220473ee5da99ed649c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workstation" DROP CONSTRAINT "FK_e0c23ad33264d7ee0f16c72a1b7"`,
    );
    //await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "workstation"`);*/
  }
}
