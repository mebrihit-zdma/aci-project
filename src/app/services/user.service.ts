// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   constructor() { }
  
//   private userName: string = '';
//   private userRole: string = '';

//   setUserName(userName: string) {
//     this.userName = userName;
//   }
//   setUserRole(role: string) {
//     this.userRole = role;
//   }

//   getUserName(): string {
//     return this.userName;
//   }

//   getUserRole(): string {
//     return this.userRole;
//   }
// }
// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  setUserName(name: string) {
    this.userNameSubject.next(name);
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }
}
