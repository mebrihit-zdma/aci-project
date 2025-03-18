import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-bug-fixes-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bug-fixes-table.component.html',
  styleUrl: './bug-fixes-table.component.css'
})
export class BugFixesTableComponent {
  @Input() data!: any; // Input property to receive data from the parent
}
