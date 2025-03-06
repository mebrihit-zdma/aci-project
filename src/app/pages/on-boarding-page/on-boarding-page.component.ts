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

  isRoleNextButtonActive = false
  isProductsNextButtonActive = false
  isPersonalizeDashboardNextButtonActive = false

  roleAnswered(){
    this.isRoleNextButtonActive = true
  }

  productsAnswered(){
    this.isProductsNextButtonActive = true
  }

  personalizeDashboardAnswered(){
    this.isPersonalizeDashboardNextButtonActive = true
  }

  goToPoductsSection() {
    this.disableRoleSection = !this.disableRoleSection;
    this.hiddenProductsSection = !this.hiddenProductsSection; 

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
