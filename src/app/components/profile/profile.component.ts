import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type ProfileType = {
  businessPhones: string,
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
}

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile as ProfileType;
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration') ?? '';
  }
}
