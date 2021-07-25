import {MigrationInterface, QueryRunner} from "typeorm";

export class Project1627137584092 implements MigrationInterface {
    name = 'Project1627137584092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "activityStatus" character varying(50) NOT NULL, "creator" bigint, "isShared" boolean, "slides" json NOT NULL, "cases" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_user" ("project_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_24501949f01da032daa3c5f3b6e" PRIMARY KEY ("project_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a781b3f2de389d1c6ea41f48f" ON "project_user" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e376a33a7ef5ae8911a43a53de" ON "project_user" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "project_user" ADD CONSTRAINT "FK_2a781b3f2de389d1c6ea41f48f5" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_user" ADD CONSTRAINT "FK_e376a33a7ef5ae8911a43a53de7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_user" DROP CONSTRAINT "FK_e376a33a7ef5ae8911a43a53de7"`);
        await queryRunner.query(`ALTER TABLE "project_user" DROP CONSTRAINT "FK_2a781b3f2de389d1c6ea41f48f5"`);
        await queryRunner.query(`DROP INDEX "IDX_e376a33a7ef5ae8911a43a53de"`);
        await queryRunner.query(`DROP INDEX "IDX_2a781b3f2de389d1c6ea41f48f"`);
        await queryRunner.query(`DROP TABLE "project_user"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
