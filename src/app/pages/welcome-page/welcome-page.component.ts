import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  standalone:true,
  imports: [RouterModule, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private auth: AuthService) {
    this.loadUser();
  }
  userName:string|undefined = "";
  async loadUser() {
    const user = await firstValueFrom(this.auth.user$);
    if (user) {
      this.userService.setUserName(user.name);
      this.userName = user.name;
      console.log('user:', user);
    } else {
      console.warn('User not available yet');
    }
  }
  // userName:string|undefined = "";
  ngOnInit() {
    this.userName = this.userService.getUserName();
  }
  
  goToOnboarding() {
    this.router.navigate(['/on-boarding-page']);
  }

}
