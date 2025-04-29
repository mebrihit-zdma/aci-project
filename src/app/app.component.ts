// import { Component, HostListener, OnInit, signal  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent{
//   title = 'aci';
// }
// Required for Angular
import { Component, OnInit, Inject, OnDestroy, HostListener, signal } from '@angular/core';

// Required for MSAL
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';

// Required for RJXS
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular - MSAL Example';
  loginDisplay = false;
  tokenExpiration: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  // On initialization of the page, display the page elements based on the user state
  // ngOnInit(): void {
  //   this.msalBroadcastService.inProgress$
  //       .pipe(
  //       filter((status: InteractionStatus) => status === InteractionStatus.None),
  //       takeUntil(this._destroying$)
  //     )
  //     .subscribe(() => {
  //       this.setLoginDisplay();
  //     });

  //     this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)).subscribe(msg => {
  //     this.tokenExpiration=  (msg.payload as any).expiresOn;
  //     localStorage.setItem('tokenExpiration', this.tokenExpiration);
  //   });
  // }
  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe(); // <-- This is critical
  
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => this.setLoginDisplay());
  }
  

  // If the user is logged in, present the user with a "logged in" experience
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  // Log the user in and redirect them if MSAL provides a redirect URI otherwise go to the default URI
  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  // Log the user out
  logout() {
    this.authService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
