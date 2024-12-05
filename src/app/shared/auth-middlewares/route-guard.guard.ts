import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { CommonService } from '@services/common.service';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  // const commonService = inject(CommonService);

  // const loggedInData: any = commonService.getLoggedInUserDetails() || null;

  // if (!loggedInData) {
  //   commonService.logout();
  // }
  return true;
};
