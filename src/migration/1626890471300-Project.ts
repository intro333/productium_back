import {MigrationInterface, QueryRunner} from "typeorm";

export class Project1626890471300 implements MigrationInterface {
    name = 'Project1626890471300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "activityStatus" character varying(50) NOT NULL, "slides" json NOT NULL, "cases" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_users_users" ("projectsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_b95933b7c73ac3da347cc5d3c44" PRIMARY KEY ("projectsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dba863a033479a80f18dc58c7f" ON "projects_users_users" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9181fa056d2ce94965926ac2e5" ON "projects_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_dba863a033479a80f18dc58c7fe" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_users_users" ADD CONSTRAINT "FK_9181fa056d2ce94965926ac2e55" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_9181fa056d2ce94965926ac2e55"`);
        await queryRunner.query(`ALTER TABLE "projects_users_users" DROP CONSTRAINT "FK_dba863a033479a80f18dc58c7fe"`);
        await queryRunner.query(`DROP INDEX "IDX_9181fa056d2ce94965926ac2e5"`);
        await queryRunner.query(`DROP INDEX "IDX_dba863a033479a80f18dc58c7f"`);
        await queryRunner.query(`DROP TABLE "projects_users_users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
