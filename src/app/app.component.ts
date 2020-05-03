import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABC Bank Loans';
  todaysDate = new Date();

  constructor() {
    //setInterval as asynchronous
    setInterval(() => {
      // to show date and time
      this.todaysDate = new Date();
    }, 1000);
  }
}
