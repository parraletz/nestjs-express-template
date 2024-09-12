import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  private readonly apiKey: string
  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('API_KEY')
  }

  validateApiKey(apiKey: string): boolean {
    return this.apiKey === apiKey
  }
}
