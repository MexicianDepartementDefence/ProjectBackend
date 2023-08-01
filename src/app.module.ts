import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './Latihan/latihan.module';

@Module({
  imports: [LatihanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
