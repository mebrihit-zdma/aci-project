
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy,} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Required for MSAL
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  defaultUserRole: string = "Product Owner";
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private userService: UserService,
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => {
        const account = this.authService.instance.getAllAccounts()[0];
        if (account) {
          this.authService.instance.setActiveAccount(account);
          const tokenRequest = {
            scopes: ['User.Read'],
            account: account
          };
  
          this.authService.acquireTokenSilent(tokenRequest).subscribe({
            next: (authResult) => {
              const headers = { Authorization: `Bearer ${authResult.accessToken}` };
              this.http.get<any>('https://graph.microsoft.com/v1.0/me', { headers }).subscribe(profile => {
                console.log("profile: ", profile)
                this.userService.setUserName(profile.displayName);
                if(profile.jobTitle != null){
                  this.userService.setUserRole(profile.jobTitle);
                }else{
                  this.userService.setUserRole(this.defaultUserRole);
                }
              });
              // Redirect to welcome page after login
              this.router.navigate(['/welcome-page']);
            },
            error: (err) => console.error('Token error after redirect', err)
          });
        }
      },
      error: (err) => console.error('Redirect error:', err)
    });
  
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
  
        // Auto-login if no user is signed in
        const accounts = this.authService.instance.getAllAccounts();
        if (accounts.length === 0) {
          if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
          } else {
            this.authService.loginRedirect();
          }
        }
      });
  }
  
  // If the user is logged in, present the user with a "logged in" experience
  setLoginDisplay() {
    this.loginService.setLoginDisplay(this.authService.instance.getAllAccounts().length > 0)
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
