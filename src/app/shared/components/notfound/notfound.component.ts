// Angular modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PrimeNGModules } from 'src/app/primeng.module';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule, PrimeNGModules],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  gotToLoginPage() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
