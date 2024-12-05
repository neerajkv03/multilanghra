import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModules } from 'src/app/primeng.module';
import { CommonService } from '@services/common.service';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, PrimeNGModules],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private globalService: GlobalService
  ) {}
  isSidebarOpen: boolean = false;

  ngOnInit(): void {
    this.commonService.getSidebarSubjectRef().subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }
  toggleSidebar() {
    this.commonService.setSidebarState(!this.isSidebarOpen);
  }
}
