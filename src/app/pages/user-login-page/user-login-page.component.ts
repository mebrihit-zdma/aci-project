import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user-login-page',
  standalone:true,
  imports: [RouterModule, CommonModule, FormsModule ],
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
  constructor(private router: Router) {}
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
        console.log("test mz, ttt", this.userName,  this.userRole)
        this.router.navigate(['/welcome-page']);
        alert('User Login Successfully' )
      }else{
        alert('Wrong credentials')
      }
    }
  }

}
