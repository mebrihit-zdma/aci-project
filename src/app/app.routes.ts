
import { Routes} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ChatComponent } from './components/chat/chat.component';
import {UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { OnBoardingPageComponent } from './pages/on-boarding-page/on-boarding-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';


// app.routes.ts
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: 'welcome-page',component: WelcomePageComponent, canActivate: [MsalGuard]},
    // { path: '', redirectTo: 'user-login-page', pathMatch: 'full' },
    // { path: 'user-login-page', component: UserLoginPageComponent},
    // { path: 'welcome-page', component: WelcomePageComponent },
    { path: 'on-boarding-page', component: OnBoardingPageComponent },
    { path: 'dashboard-page', 
      component: DashboardPageComponent,
      children: [
          { path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'documentation', component: DocumentationComponent },
          { path: 'chat', component: ChatComponent },
        ] 
    },
    { path: '**', component: HomeComponent},
];


