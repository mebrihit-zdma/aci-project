import { Component, OnInit,  inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../services/user.service';

import { AuthService } from '@auth0/auth0-angular';
import { AuthModule } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-login-page',
  standalone:true,
  imports: [RouterModule, CommonModule, FormsModule, AuthModule ],
  templateUrl: './user-login-page.component.html',
  styleUrl: './user-login-page.component.css'
})
export class UserLoginPageComponent{
  signupUsers: any[] = [];

  signupObj: any = {
    userName:'',
    email:'',
    role:'',
    password:''

  };

  loginObj: any = {
    userName:'',
    password:''
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers))
    this.signupObj = {
      userName:'',
      email:'',
      role:'',
      password:''
  
    };
  }
  
  auth = inject(AuthService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  returnToUrl = this.isBrowser ? window.location.origin : '';

  constructor(private userService: UserService, private router: Router) {
    if (this.isBrowser) {
      this.auth.handleRedirectCallback().subscribe({
        next: (result) => {
          console.log('Auth0 callback handled:', result);
        },
        error: (error) => {
          console.error('Error handling callback:', error);
        }
      });
    }
  }

  userRole = "";
  userName = ""
  onLogin(){
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);

      const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
      if(isUserExist != undefined){
        this.userRole = isUserExist.role;
        this.userName = isUserExist.userName
        this.userService.setUserRole(this.userRole);
        this.userService.setUserName(this.userName);
        this.router.navigate(['/welcome-page']);
        alert('User Login Successfully' )
      }else{
        alert('Wrong credentials')
      }
    }
  }
}
