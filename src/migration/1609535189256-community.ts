import {MigrationInterface, QueryRunner} from "typeorm";

export class community1609535189256 implements MigrationInterface {
    name = 'community1609535189256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "community_service_info" ("id" SERIAL NOT NULL, "readyPercent" smallint NOT NULL, "membersCount" smallint NOT NULL, CONSTRAINT "PK_c3ff9ef5ccd155b9026592ca40c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "community_subscribe" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userIp" character varying(20) NOT NULL, "userDevice" character varying(50) NOT NULL, "userAgent" character varying(150) NOT NULL, "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "tariff" character varying(20) NOT NULL, CONSTRAINT "UQ_c750640dbc1eb4fbcaa064843d3" UNIQUE ("email"), CONSTRAINT "PK_416cbe66bb19251fa52b3a821ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "community_readiness" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userIp" character varying(20) NOT NULL, "userDevice" character varying(50) NOT NULL, "userAgent" character varying(150) NOT NULL, "id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, CONSTRAINT "UQ_3a11ca0ab6acad7f8a2b8d2bfad" UNIQUE ("email"), CONSTRAINT "PK_92941855e78e87c62c2e3ce60ec" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "community_readiness"`);
        await queryRunner.query(`DROP TABLE "community_subscribe"`);
        await queryRunner.query(`DROP TABLE "community_service_info"`);
    }

}
