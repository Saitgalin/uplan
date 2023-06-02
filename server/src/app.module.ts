import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('ACCESS_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
