import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModules } from 'src/app/primeng.module';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, PrimeNGModules],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.style.overflowY = 'hidden';
  }
  ngOnDestroy(): void {
    document.body.style.overflowY = 'visible';
  }
}
