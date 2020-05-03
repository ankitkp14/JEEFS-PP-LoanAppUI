import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-foreclose',
  templateUrl: './foreclose.component.html',
  styleUrls: []
})
export class ForecloseComponent implements OnInit {

  //to create form
  addForm:FormGroup;
  
  //form validation
  submitted:boolean=false;

  //class objects
  userDetails: user = new user;

  //alert variables
  foreClosure:boolean=false;
  loanExists:boolean=false;

  //calculating new fields to display
  emiLeft: number=0;
  foreClose: number=0;
  
  //confirm variable to open payment page
  confirmForeclose:boolean=false;

  //message variables
  error:string;
  message:string="Loan Foreclosed Successfully...";

  constructor(private service: LoanService, private router: Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    if (localStorage.username != null) {
      //to show user details
      this.service.showUser(localStorage.username).subscribe(data => {
        this.userDetails = data;
        //calculating number of emi left
        if(this.userDetails.loanAmount!=0){
          this.emiLeft=this.userDetails.loanBal/this.userDetails.emi;
        }
        //calculating foreclose amount
        this.foreClose = Math.round(this.userDetails.loanBal * 1.04);
      });
    }
    else {
      this.router.navigate(['login']);
    }

    //form to apply loan
    if (localStorage.username != null) {
      this.addForm = this.formBuilder.group({
        card: ['', [Validators.required,Validators.pattern("[0-9]{16}")]],
        month: ['', Validators.required],
        year:['',Validators.required],
        cvv:['',[Validators.required,Validators.pattern("[0-9]{3}")]]
      });
    }
  }

  //confirmation function
  foreCloseConfirm(){
      this.confirmForeclose=true;
  }

  //foreclose function
  foreclose() {
    //form validation
    this.submitted=true;

    if(this.addForm.invalid){
      return;
    }
    
    this.service.foreClose(localStorage.username).subscribe(data => {
      //on foreclose success
      this.userDetails=data;
      this.emiLeft=0;
      this.foreClose=0;
      
      //setting alert variables
      this.foreClosure=true;
      this.loanExists=false;
      this.confirmForeclose=false;
      //to show payment page
    }, err => {
      //if loan does not exist
      this.loanExists=true;
      this.foreClosure=false;
      this.confirmForeclose=false;
      
      //getting error message
      this.error=err.error;
    });
  }
}