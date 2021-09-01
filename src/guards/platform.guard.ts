import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class PlatformGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('PlatformGuard');
    const req = context.switchToHttp().getRequest();

    return req.query.source === process.env.PLATFORM;
  }
}
