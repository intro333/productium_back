import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectsAll1621625673303 implements MigrationInterface {
    name = 'ProjectsAll1621625673303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects_all" ("id" SERIAL NOT NULL, "projects" json NOT NULL, "slides" json NOT NULL, "cases" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_565cd4532513ba80dcbc126fb73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects_all" ADD "userId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_all" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "projects_all"`);
    }

}
