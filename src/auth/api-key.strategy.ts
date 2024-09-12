import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'
import { AuthService } from './auth.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done) => {
      const checkKey = authService.validateApiKey(apiKey)
      if (!checkKey) {
        return done(false)
      }
      return done(true)
    })
  }
}
