import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import * as qs from 'qs';

export class SecurityGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const searchParams = req.headers['x-search-params'];
    const launchParams = searchParams.slice(searchParams.indexOf('?') + 1);
    if (verifyLaunchParams(launchParams, process.env.SECRET_KEY)) {
      const searchParams = qs.parse(launchParams);
      req.query.code = `${searchParams.vk_user_id}_${req.query.source}`;
      return true;
    }
    return false;
  }
}

interface IQueryParam {
  key: string;
  value: string;
}

function verifyLaunchParams(searchString: string, secretKey: string): boolean {
  let sign: string | undefined;
  const queryParams: IQueryParam[] = [];

  const processQueryParam = (key: string, value: any) => {
    if (key === 'sign') sign = value;
    else if (key.startsWith('vk_')) queryParams.push({ key, value });
  };

  for (const param of searchString.split('&')) {
    const [key, value] = param.split('=');
    processQueryParam(key, value);
  }

  const queryString = queryParams
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce<string>((acc, { key, value }, idx) => {
      return (
        acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`
      );
    }, '');

  const paramsHash = crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  return paramsHash === sign;
}
