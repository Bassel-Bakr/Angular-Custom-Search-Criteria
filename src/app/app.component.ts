import { Component } from '@angular/core';
import { CriteriaBuilder, Item } from './criteria/criteria.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  builder = new CriteriaBuilder();

  criteria: Item[] = [
    this.builder.createTextField('status', 'Status'),
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
