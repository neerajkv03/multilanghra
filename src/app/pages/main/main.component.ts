import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CommonService } from '@services/common.service';

@Component({
  selector: 'app-main',
  template: `<router-outlet></router-outlet>`,
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor(
    private commonService: CommonService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  isSidebarOpen: boolean = false;

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
