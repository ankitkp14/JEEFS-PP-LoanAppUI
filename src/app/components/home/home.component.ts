import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //class object
  userDetails: user = new user;

  constructor(private service: LoanService, private router: Router) { }

  //display user name
  ngOnInit() {
    if (localStorage.username != null) {
      this.service.getUser().subscribe(data => {
        this.userDetails = data;
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  //log out function
  logOut() {
    if (localStorage.username != null) {
      localStorage.removeItem("username");
      this.router.navigate(['/index']);
    }
  }
}