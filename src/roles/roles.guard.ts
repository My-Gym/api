import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import * as qs from 'qs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { RolesService } from './roles.service';
import { codeUserCode } from '../utils';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject(RolesService) private roleService: RolesService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { vk_user_id } = qs.parse(req.headers['x-search-params']);

    const usersRole = await this.roleService.getUserRolesByCode(
      codeUserCode(Number(vk_user_id), req.query.source),
    );

    return usersRole.some((role) => requiredRoles.includes(role.value));
  }
}
