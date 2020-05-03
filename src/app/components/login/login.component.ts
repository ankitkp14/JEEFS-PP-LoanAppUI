import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { userlogin } from 'src/app/models/userlogin';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  //to get login data
  loginForm: FormGroup;

  //validation variable
  submitted: boolean = false;

  //alert variable
  invalidLogin: boolean = false;

  //to store error msg
  error: string;

  //class objects
  userLog: userlogin = new userlogin;

  //to store received data from server
  user: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoanService) { }

  ngOnInit() {
    if (localStorage.username == null) {
      this.loginForm = this.formBuilder.group({
        accountNum: ['', [Validators.required, Validators.pattern("[1-9][0-9]{10}")]],
        password: ['', [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]]
      });
    }
    else {
      //if already logged in user
      this.router.navigate(['home']);
    }
  }

  //login function
  verifyLogin() {
    //validaitons
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userLog = this.loginForm.value;

    this.service.login(this.userLog).subscribe(data => {
      //on login success
      this.user = data;

      //saving username to check and store login info
      localStorage.username = this.userLog.accountNum;
      sessionStorage.username = this.userLog.accountNum;

      //redirecting to home page after login
      this.router.navigate(['home']);
    }, err => {
      //on login failure
      this.invalidLogin = true;

      //getting error message
      this.error = err.error;
    });
  }
}