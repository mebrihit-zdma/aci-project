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
}
