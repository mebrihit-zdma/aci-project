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

  sources = ['JIRA-ADA-516', 'JIRA-ADA-516'];
  templates = ['User ManuL', 'Release Notes'];


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


  skipTooltip(){
    this.skipTooltipValue = true;
  }

  // goToAciSourcesTemplateTooltip(){
  //   this.aciPaymentHubTooltip = true;
  //   this.dashboardModelDone = true;
  // }

  goToExportPublishTooltip(){
    this.sourcesTemplateTooltipDone = true;
    this.exportPublishTooltip = true;
  }

  goToGenerateTooltip(){
    this.exportPublishTooltipDone = true;
    this.generateTooltip = true;
  }
  goToEditorTooltip(){
    this.generateTooltipDone = true;
    this.editorTooltip = true;
  }
  doneWithTooltip(){
    this.editorTooltipDone = true;
  }
}
