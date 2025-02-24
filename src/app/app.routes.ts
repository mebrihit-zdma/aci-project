import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ChatComponent } from './components/chat/chat.component';

// import { PagesComponent } from './pages/pages.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'chat', component: ChatComponent },
    // { path: 'pages', component: PagesComponent },
];
