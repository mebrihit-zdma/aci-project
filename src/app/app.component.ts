import { Component, HostListener, OnInit, signal  } from '@angular/core';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftSidebarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'aci';
  isLeftSidebarCollapsed = signal<boolean>(true);
  


  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
