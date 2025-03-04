import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone:true,
  imports: [RouterModule, CommonModule, ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/dashboard-page']);
    // this.router.navigate(['/on-boarding-page']);
  }
}
