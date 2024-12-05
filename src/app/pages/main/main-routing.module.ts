import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from './subpages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
export const MainRoutingComponents = [DashboardComponent]; // must be followed
