import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: []
})
export class ApplyComponent implements OnInit {

  //to get form data
  addForm: FormGroup;

  //for form validation
  submitted: boolean = false;

  //class object
  users: user = new user;

  //loan variables for alerts
  loanExists: boolean = false;
  loanApplied: boolean = false;

  //message variables
  error: string;
  message: any;

  //injecting dependencies
  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoanService) { }

  ngOnInit() {
    if (localStorage.username != null) {
      this.addForm = this.formBuilder.group({
        loanAmt: ['', [Validators.required, Validators.min(100000), Validators.max(10000000)]],
        time: ['', Validators.required],
        loanType: ['', Validators.required]
      });
    }
    else {
      this.router.navigate(['login']);
    }

    //user details to display loan information
    this.service.getUser().subscribe(data => {
      this.users = data;
    });
  }

  //loan application function
  apply() {
    //validation
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    //setting form values to send to database
    this.users.loanAmount = this.addForm.controls.loanAmt.value;
    this.users.duration = this.addForm.controls.time.value;
    this.users.loanType = this.addForm.controls.loanType.value;

    this.service.applyLoan(this.users).subscribe(data => {
      //if loan is appplied successfully

      //setting alert variables
      this.loanApplied = true;
      this.loanExists = false;

      //getting message
      this.message = data;
    }, err => {
      //on error during applying loan

      //setting alert variables
      this.loanExists = true;
      this.loanApplied = false;

      //getting error messages
      this.error = err.error;
    });
  }
}