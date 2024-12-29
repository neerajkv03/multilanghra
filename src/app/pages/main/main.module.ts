import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PrimeNGModules } from 'src/app/primeng.module';
import { NotFoundComponent } from '@components/notfound/notfound.component';

import {
  MainRoutingModule,
  MainRoutingComponents,
} from './main-routing.module';
import { MainComponent } from './main.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/data/', '.json');
}

@NgModule({
  declarations: [MainComponent, ...MainRoutingComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotFoundComponent,
    MainRoutingModule,
    PrimeNGModules,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class MainModule {}
