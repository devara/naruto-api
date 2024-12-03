import { Module } from '@nestjs/common';
import { AllConfigModule } from './config/config.module';
import { DatabaseMongooseModule } from './database/db.mongoose.module';
import { ApiModule } from './api/api.module';
import { BaseModule } from './api/base/base.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AllConfigModule,
    DatabaseMongooseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 45,
      },
    ]),
    BaseModule,
    ApiModule,
  ],
})
export class AppModule {}
