import { Component } from '@angular/core';
import { Item } from './criteria/criteria.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  criteria: Item[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'text',
      required: true,
      defaultValue: 'Open',
    },
    {
      key: 'qty',
      label: 'Quantity',
      type: 'number',
      disabled: true,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
    },
  ];

  onSearch(data: unknown): void {
    console.log(data);
  }
}
