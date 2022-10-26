import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'nativescript-accordion',
    },
    {
      name: 'nativescript-mht-printer',
    },
    {
      name: 'nativescript-sms-receiver',
    },
  ];
}
