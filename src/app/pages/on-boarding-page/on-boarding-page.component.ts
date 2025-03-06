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

  // hide the questions at the beginning 
  hiddenProductsSection = true;
  hiddenPersonalizeDashboardSection = true;

  // disable the questions after answered
  disableRoleSection= false;
  disableProductsSection = false;
  disablePersonalizeDashboardSection = false;

  goToRoleSection() {
    
  }
  isActive = false;
  goToPoductsSection() {
    this.disableRoleSection = !this.disableRoleSection;
    this.hiddenProductsSection = !this.hiddenProductsSection; 
    // this.isActive = !this.isActive;
  }
  goToPersonalizeDashboardSection() {
    this.disableProductsSection = !this.disableProductsSection;
    this.hiddenPersonalizeDashboardSection = !this.hiddenPersonalizeDashboardSection; 
  }


  goToPervSection() {
    this.router.navigate(['/dashboard-page']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard-page']);
  }

}
