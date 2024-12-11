import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { ConfigpageComponent } from './subpages/configpage/configpage.component';
import { ConfiglangComponent } from './subpages/configlang/configlang.component';
import { ChatbotComponent } from './subpages/chatbot/chatbot.component';
import { AnalysisComponent } from './subpages/analysis/analysis.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'en/chatbot',
      },
      {
        path: 'configpage',
        component: ConfigpageComponent,
      },
      {
        path: 'configlang',
        component: ConfiglangComponent,
      },
      {
        path: ':lang/chatbot',
        component: ChatbotComponent,
      },
      {
        path: ':lang/analysis',
        component: AnalysisComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
export const MainRoutingComponents = [
  ConfigpageComponent,
  ConfiglangComponent,
  ChatbotComponent,
  AnalysisComponent,
]; // must be followed
