import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeGuardGuard } from '@auth-middlewares/route-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule), // lazy loading a module's all routes,
    canActivate: [routeGuardGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@components/notfound/notfound.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
