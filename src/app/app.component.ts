import { Component, HostListener, OnInit, signal  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftSidebarComponent, MainContentComponent, WelcomePageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'aci';
}
