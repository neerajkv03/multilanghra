import { Component, OnInit } from '@angular/core';

import { CommonService } from '@services/common.service';

@Component({
  selector: 'app-root',
  template: `<app-loader *ngIf="isLoading"></app-loader>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  isLoading: boolean = false;

  ngOnInit(): void {
    this.commonService.getLoaderSubjectRef().subscribe({
      next: (state: boolean) => {
        this.isLoading = state;
      },
    });
  }
}
