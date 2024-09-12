import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-yet'
import * as Joi from 'joi'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { LoggerModule } from './config/logger'
import { HealthModule } from './health/health.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          }
        })
      }),
      inject: [ConfigService]
    }),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        API_KEY: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }),
    AuthModule,
    UsersModule,
    HealthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
