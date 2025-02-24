import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aci';
}
