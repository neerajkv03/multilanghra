import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';

import { PrimeNGModules } from 'src/app/primeng.module';

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  imports: [CommonModule, PrimeNGModules],
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  constructor() {}
  menuitems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menuitems = [
      {
        label: 'Link 1',
        icon: 'pi pi-fw pi-home',
        routerLink: '#',
      },
      {
        label: 'Link 2',
        items: [
          {
            label: 'Link 21',
            icon: 'pi pi-fw pi-users',
            routerLink: '#',
          },
          {
            label: 'Link 22',
            icon: 'pi pi-fw pi-users',
            routerLink: '#',
          },
        ],
      },
    ];
  }
}
