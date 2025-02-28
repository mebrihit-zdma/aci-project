import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  documentationData = [
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
    { 
      latestUpdate: "Last Release", 
      title: "What’s new in Payment Hub 1.2.3-A", 
      updateList: [
        "Added batch processing for large transactions to increase efficiency.",
        "Improved error logging to simplify troubleshooting for failed payments.",
      ],
      learnMore:"View Past Release Notes"
    },
  ]
}
