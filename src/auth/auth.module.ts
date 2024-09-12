import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { ApiKeyStrategy } from './api-key.strategy'
import { AuthMiddleware } from './auth.middleware'
import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, ApiKeyStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude('/health')
      .exclude('/docs')
      .exclude('/docs/swagger-ui-init.js')
      .exclude('/docs/swagger-ui-standalone-preset.js')
      .exclude('/docs/swagger-ui-bundle.js')
      .exclude('/docs/swagger-ui.css')
      .exclude('/docs-json')
      .forRoutes('*')
  }
}
