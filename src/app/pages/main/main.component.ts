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
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  isSidebarOpen: boolean = false;

  ngOnInit(): void {
    this.commonService.getSidebarSubjectRef().subscribe((state: boolean) => {
      const wWidth = window.innerWidth;
      this.isSidebarOpen = state;

      if (this.isSidebarOpen && wWidth < 768) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.isSidebarOpen && window.innerWidth <= 768) {
      this.commonService.setSidebarState(false);
      document.body.style.overflowY = 'auto';
    }
  }
  toggleSidebar() {
    this.commonService.setSidebarState(!this.isSidebarOpen);
  }
}
