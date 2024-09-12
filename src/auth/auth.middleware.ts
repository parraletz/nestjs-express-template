import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { Request, Response } from 'express'
import passport from 'passport'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    passport.authenticate('headerapikey', value => {
      if (value) {
        next()
      } else {
        throw new UnauthorizedException('Unauthorized')
      }
    })(req, res, next)
  }
}
