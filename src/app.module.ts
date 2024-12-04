import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AllConfigModule } from '@/config/config.module';
import { DatabaseMongooseModule } from '@/database/db.mongoose.module';
import { BaseModule } from '@/app/base/base.module';
import { ApiModule } from '@/app/api.module';

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
