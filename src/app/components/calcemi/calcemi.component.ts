import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calcemi',
  templateUrl: './calcemi.component.html',
  styleUrls: ['./calcemi.component.css']
})
export class CalcemiComponent implements OnInit {

  //variables to display form and loan emi details 
  submitted:boolean=false;
  submit1:boolean=true;
  submit2:boolean=false;

  //to take form input
  addForm:FormGroup;

  //variables to store values and display
  loanAmount:number;
  duration:number;
  emi:number;
  rate:number;
  loanType:string;

  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    //form validations
    if(localStorage.username!=null){
      this.addForm=this.formBuilder.group({
        amount:['',[Validators.required,Validators.min(100000),Validators.max(10000000)]],
        duration:['',Validators.required],
        loanType:['',Validators.required]
      });
    }
    else{
      this.router.navigate(['login']);
    }
  }

  //function to calculate
  calculate(){
    this.submitted=true;

    //invalid form
    if(this.addForm.invalid){
      return;
    }
    else{
      this.submit2=true;
      this.submit1=false;
    }

    //getting data from user input
    this.loanAmount=this.addForm.controls.amount.value;
    this.duration=this.addForm.controls.duration.value;
    this.loanType=this.addForm.controls.loanType.value;

    //setting rate accordingly
    if(this.loanType=="Home Loan"){
      this.rate=10.5;
    }
    else if(this.loanType=="Car Loan"){
      this.rate=9.7;
    }
    else if(this.loanType=="Education Loan"){
      this.rate=10;
    }

    //calculating emi
    this.emi=Math.round((this.loanAmount * Math.pow((1+this.rate/100),this.duration/12))/this.duration);
  }
}