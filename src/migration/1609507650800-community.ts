import {MigrationInterface, QueryRunner} from "typeorm";

export class community1609507650800 implements MigrationInterface {
    name = 'community1609507650800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "community_service_info" ("id" SERIAL NOT NULL, "readyPercent" smallint NOT NULL, "membersCount" smallint NOT NULL, CONSTRAINT "PK_c3ff9ef5ccd155b9026592ca40c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "community_service_info"`);
    }

}
