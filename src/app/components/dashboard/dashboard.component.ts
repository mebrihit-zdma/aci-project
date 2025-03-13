import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SummaryCardComponent } from '../../components/cards/summary-card/summary-card.component';
import { CategoryCardComponent } from '../../components/cards/category-card/category-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SummaryCardComponent, CategoryCardComponent, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
  releaseHistory = [
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "UTF", 
      type: "Release Notes",
      status: "In Progress",
      deliveryDate: "",
      executedBy: "Gulse",
      view: "",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "UTF", 
      type: "Release Notes",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Jeannie",
      view: "View",
    },
    { documentation: "Payment_Hub_1.2.3-A", 
      product: "UTF", 
      type: "User Manual",
      status: "Published",
      deliveryDate: "Jan 13, 2025",
      executedBy: "Meera",
      view: "View",
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

  pieData = [
    {
      title:'JIRA Issues Summary', 
      view: [120, 120] as [number, number],
      pieChartData: [
        { name: 'In Progress', value: 1, color:'#6A94E5'},
        { name: 'Open', value: 1, color:'#C1D3FA'},
        { name: 'Resolved', value: 3, color:'#1F4BB9'},
        { name: 'test', value: 5, color:'red'},
      ],
      customColors: [
        { name: 'In Progress', value: '#6A94E5' },
        { name: 'Open', value: '#C1D3FA' },
        { name: 'Resolved', value: '#1F4BB9' },
        { name: 'test', value: 'red' }
      ]
    }
  ]

  // Chart properties
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = true;
  arcWidth = 0.2; // Controls thickness of the ring
}
