import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css'
})
export class DocumentationComponent {
  selectedOption1 = '';  
  selectedOption2 = '';  

  templates = ['User Manual', 'Release Notes'];
  sources = ['JIRA-ADA-516', 'JIRA-ADA-516'];
  // tooltip
  skipTooltipValue = false;
  sourcesTemplateTooltip = false;
  exportPublishTooltip = false;
  generateTooltip =false;
  editorTooltip =false;

  sourcesTemplateTooltipDone = false;
  exportPublishTooltipDone = false;
  generateTooltipDone = false;
  editorTooltipDone = false;

  skipSourcesTemplateTooltip(){
    this.sourcesTemplateTooltipDone = true;
  }
  goToExportPublishTooltip(){
    this.sourcesTemplateTooltipDone = true;
    this.exportPublishTooltip = true;
  }
  skipExportPublishTooltip(){
    this.exportPublishTooltipDone = true;
  }
  goToGenerateTooltip(){
    this.exportPublishTooltipDone = true;
    this.generateTooltip = true;
  }
  skipGenerateTooltip(){
    this.generateTooltipDone = true;
  }
  goToEditorTooltip(){
    this.generateTooltipDone = true;
    this.editorTooltip = true;
  }
  skipEditorTooltip(){
    this.editorTooltipDone = true;
  }
  doneWithTooltip(){
    this.editorTooltipDone = true;
  }

  generatedDocument = [
    { title: "ACI Payment Gateway – Release Notes (Version 2.5.0)", 
      releaseDate: "March 15, 2025", 
      preparedBy: "Product Management Team",
      overview: "This release introduces enhanced security measures, improved payment processing speed, and new API integrations to streamline bank and   merchant operations. Several bug fixes and performance optimizations have also been included.",
      newFeaturesAndEnhancements: "FeatureDescriptionImpacted UsersEnhanced Transaction SecurityImplemented multi-layer fraud detection with AI-driven anomaly detection.Bank Operators, Compliance TeamsFaster Payment ProcessingOptimized transaction routing to reduce processing time by 20%.Merchants, IT TeamsNew API for Custom ReportsIntroduced API endpoints for real-time payment tracking and data export.Developers, Business Analysts",
      bugFixesAndPerformanceImprovements: "IssueResolutionPayment approval delays for high-volume transactions.Improved load balancing and optimized database queries.Incorrect currency conversion in multi-currency transactions.Fixed calculation logic and tested accuracy with various currencies.Help24 system lagging during peak hours.Upgraded infrastructure and optimized query processing.",
      knownIssuesAndWorkarounds: [
          "Issue: Some users may experience delays when accessing new API features Workaround: Clear cache or wait for server sync to complete within 5 minutes.",
          "Issue: Legacy integration users may see warning messages when processing transactions.Workaround: Update to the latest API version or contact support for assistance."
        ],
      forFurtherDetailsAndContact: [
          "ACI Support Team – support@aci.com", 
        ],
    },
  ];
}
