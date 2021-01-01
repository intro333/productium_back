import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CommunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
