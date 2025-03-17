import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  
  private userName: string = '';
  private userRole: string = '';

  setUserName(userName: string) {
    this.userName = userName;
  }
  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserName(): string {
    return this.userName;
  }

  getUserRole(): string {
    return this.userRole;
  }
}
