import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-release-history-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './release-history-table.component.html',
  styleUrl: './release-history-table.component.css'
})
export class ReleaseHistoryTableComponent {
  @Input() data!: any; // Input property to receive data from the parent
}
