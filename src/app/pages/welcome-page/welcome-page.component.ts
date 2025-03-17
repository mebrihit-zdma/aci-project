import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone:true,
  imports: [RouterModule, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit {
  userName: string | null = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
    });
  }
  
  goToOnboarding() {
    this.router.navigate(['/on-boarding-page']);
  }

}
