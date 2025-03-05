import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './on-boarding-page.component.html',
  styleUrl: './on-boarding-page.component.css'
})
export class OnBoardingPageComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard-page']);
  }
}
