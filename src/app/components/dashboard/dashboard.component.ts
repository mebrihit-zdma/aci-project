import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SummaryCardComponent } from '../../components/cards/summary-card/summary-card.component';
import { CategoryCardComponent } from '../../components/cards/category-card/category-card.component';
import { PieChartCardComponent } from '../../components/cards/pie-chart-card/pie-chart-card.component';
import { ReleaseHistoryTableComponent } from '../../components/tables/release-history-table/release-history-table.component';
import { BugFixesTableComponent } from '../../components/tables/bug-fixes-table/bug-fixes-table.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SummaryCardComponent, CategoryCardComponent, NgxChartsModule, PieChartCardComponent, ReleaseHistoryTableComponent, BugFixesTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private userService: UserService ) {}
  userName = "";
  userRole = '';
  ngOnInit() {
    this.userName = this.userService.getUserName();
    this.userRole = this.userService.getUserRole();
  }
  // cards data
  paymentHubUpdates = [
    { 
      latestUpdate: "Latest Update", 
      title: "What’s new in Payment Hub 1.2.3-A", 
      updateList: [
        "Enhanced transaction security to prevent unauthorized access.",
        "Improved API response times by 30% for better performance.",
        "Introduced a new fraud detection feature to minimize risk.",
      ],
      learnMore:"Learn more"
    },
    // { 
    //   latestUpdate: "Latest Update", 
    //   title: "What’s new in Payment Hub 1.2.3-A", 
    //   updateList: [
    //     "Enhanced transaction security to prevent unauthorized access.",
    //     "Improved API response times by 30% for better performance.",
    //     "Introduced a new fraud detection feature to minimize risk.",
    //   ],
    //   learnMore:"Learn more"
    // },
  ]
  categoryData = [
    { 
      title: "Total Bug Raised", 
      bugNumber: "12", 
      month:"This month"
    },
    { 
      title: "User Engagement Metrics", 
      bugNumber: "80%", 
      month:"Customer Satisfaction Rate"
    }
  ]
  pieData = [
    {
      title:'JIRA Issues Summary', 
      view: [120, 120] as [number, number],
      pieChartData: [
        { name: 'In Progress', value: 1, color:'#6A94E5'},
        { name: 'Open', value: 1, color:'#C1D3FA'},
        { name: 'Resolved', value: 3, color:'#1F4BB9'},
      ],
      customColors: [
        { name: 'In Progress', value: '#6A94E5' },
        { name: 'Open', value: '#C1D3FA' },
        { name: 'Resolved', value: '#1F4BB9' },
      ]
    }
  ]

  // release history data 
  releaseHistory = [
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "Release Notes",
      status: "In Progress",
      deliveryDate: "",
      executedBy: "Gulse",
      view: "",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "Release Notes",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Jeannie",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "Payment Hub", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
    },
  ];

  // bug fixes data 
  bugFixes = [
    { issue: "SBI-323", 
      description: "Slow loading times", 
      priority: "Low",
      status: "Fix In Progress",
      assignedTo: "Adam",
      viewResolution: "",
    },
    { issue: "SBI-321", 
      description: "Payment approval delays for high volume", 
      priority: "Highest",
      status: "Resolved",
      assignedTo: "Adam",
      viewResolution: "View Resolution",
    },
    { issue: "SBI-319", 
      description: "Performance Optimizations", 
      priority: "High",
      status: "Resolved",
      assignedTo: "Adam",
      viewResolution: "View Resolution",
    },
  ];
  
  // tooltip
  skipTooltipValue = false;
  aciPaymentHubTooltip = false;
  createDocTooltip = false;

  dashboardModelDone = false;
  aciPaymentHubTooltipDone = false;
  createDocTooltipDone = false;

  skipTooltip(){
    this.skipTooltipValue = true;
  }

  goToAciPaymentHubTooltip(){
    this.aciPaymentHubTooltip = true;
    this.dashboardModelDone = true;
  }
  skipAciPaymentHubTooltip(){
    this.aciPaymentHubTooltipDone = true;
  }

  goToCreateDocTooltip(){
    this.createDocTooltip = true;
    this.aciPaymentHubTooltipDone = true;
  }
  skipCreateDocTooltip(){
    this.createDocTooltipDone = true;
  }
  doneWithTooltip(){
    this.createDocTooltipDone = true;
  }
}
