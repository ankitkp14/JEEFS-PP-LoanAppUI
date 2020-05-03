import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  //variables for http response messages
  error: string;
  user: any;

  //to collect form data 
  addForm: FormGroup;

  //alert variables
  invalidAccount: boolean = false;
  registerSuccess: boolean = false;

  //for form validation
  submitted: boolean = false;

  //class objects
  users: user = new user;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoanService) { }

  ngOnInit() {
    if (localStorage.username == null) {
      this.addForm = this.formBuilder.group({
        accountNum: ['', [Validators.required, Validators.pattern("[1-9][0-9]{10}")]],
        password: ['', [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]],
        name: ['', [Validators.required, Validators.pattern("[A-Za-z_ ]+")]],
        gender: ['', Validators.required],
        otp: ['', [Validators.required, Validators.pattern("[0-9]{6}")]]
      });
    }
    else {
      this.router.navigate(['home']);
    }
  }

  //function to create account
  addUser() {
    //if validations are false
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    this.users = this.addForm.value;

    this.service.createUser(this.users).subscribe(data => {
      //when account is successfully created
      this.user = data;        //getting message
      this.registerSuccess = true;
      this.invalidAccount = false;
    }, err => {
      //if account already exists
      this.invalidAccount = true;
      this.registerSuccess = false;
      this.error = err.error;    //getting error message
    });
  }
}