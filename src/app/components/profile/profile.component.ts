import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, AccountInfo } from '@azure/msal-browser';

type ProfileType = {
  businessPhones: string[],
  displayName: string,
  givenName: string,
  jobTitle: string,
  mail: string,
  mobilePhone: string,
  officeLocation: string,
  preferredLanguage: string,
  surname: string,
  userPrincipalName: string,
  id: string
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile!: ProfileType;
  tokenExpiration: string = '';

  constructor(private http: HttpClient, private msalService: MsalService) {}

  ngOnInit() {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) {
      console.error('No active account found.');
      return;
    }

    const tokenRequest = {
      scopes: ['User.Read'], // ensure this matches your Azure app registration
      account: account
    };

    this.msalService.acquireTokenSilent(tokenRequest)
      .subscribe({
        next: (result: AuthenticationResult) => {
          const headers = {
            Authorization: `Bearer ${result.accessToken}`
          };

          this.http.get<ProfileType>('https://graph.microsoft.com/v1.0/me', { headers })
            .subscribe(profile => {
              this.profile = profile;
            });
        },
        error: (err: any) => {
          console.error('Token acquisition failed:', err);
        }
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration') ?? '';
  }
}
