import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChatHistoryComponent } from '../../components/chats/chat-history/chat-history.component';
import { SavedChatsComponent } from '../../components/chats/saved-chats/saved-chats.component';
import { ChatService } from '../../services/chat.service';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, SavedChatsComponent, ChatHistoryComponent ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  constructor(private userService: UserService, private chatService: ChatService, private authService: MsalService, ) {}
  
  userName: string | null = null;
  userRole: string | null = null;
  ngOnInit() {
    this.userService.userName$.subscribe(name => {
      this.userName = name;
    });
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  dashboardItems = [
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
  ];
  chatItems = [
    {
      icon: 'add_circle_outline',
      label: 'Start New Chat',
    },
    {
      icon: 'search',
      label: 'Search Previous Chats',
    },
    {
      icon: 'bookmark',
      label: 'Saved Chats',
    },
    {
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
  getFirstLetter(name: string | null): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  // start new chat click event listener 
  startNewChat(){
    this.chatService.startNewChatEmitClick();
  };

  // Log the user out
  logout() {
    this.authService.logoutRedirect();
  }
}
