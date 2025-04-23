import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  constructor(private userService: UserService ) {}
  userName = "";
  userRole = "";
  ngOnInit() {
    this.userName = this.userService.getUserName();
    this.userRole = this.userService.getUserRole();
  }

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'dashboard',
      icon: 'home',
      label: 'Dashboard',
    },
    {
      routeLink: 'documentation',
      icon: 'feed',
      label: 'Documentation',
    },
    {
      routeLink: 'chat',
      icon: 'chat_bubble',
      label: 'Chat',
    },
    {
      routeLink: 'start-new-chat',
      icon: 'add_circle_outline',
      label: 'Start New Chat',
    },
    {
      routeLink: 'search-previous-chats',
      icon: 'search',
      label: 'Search Previous Chats',
    },
    {
      routeLink: 'saved-chats',
      icon: 'bookmark',
      label: 'Saved Chats',
    },
    {
      routeLink: 'chat-history',
      icon: 'history',
      label: 'Chat History',
    },
  ];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  openSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(false);
  }

  //mobile
  isOpen = false; // Sidebar state

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  getFirstLetter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }
}
