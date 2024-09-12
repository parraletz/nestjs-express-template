import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator
} from '@nestjs/terminus'

@Controller({ version: VERSION_NEUTRAL, path: 'health' })
export class HealthController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private health: HealthCheckService,
    // eslint-disable-next-line no-unused-vars
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('website', 'https://parraletz.space')
    ])
  }
}
