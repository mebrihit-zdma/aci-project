import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  
  private userName: string|undefined = '';
  private userRole: string = '';

  setUserName(userName: string|undefined) {
    this.userName = userName;
  }
  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserName(): string|undefined {
    return this.userName;
  }

  getUserRole(): string {
    return this.userRole;
  }
}
