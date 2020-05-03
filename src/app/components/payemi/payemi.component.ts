import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-payemi',
  templateUrl: './payemi.component.html',
  styleUrls: ['./payemi.component.css']
})
export class PayemiComponent implements OnInit {

  addForm:FormGroup;
  
  //form validation
  submitted:boolean=false;

  //class object
  userDetails:user=new user;
  
  //calculating emi left
  emiLeft:number=0;

  //alert variable
  loanExists:boolean=false;
  paidEmi:boolean=false;

  //message
  message:string="Paid EMI Successfully..!!";
  error:string;

  //payment page confirm variable
  confirmPay:boolean=false;

  constructor(private formBuilder:FormBuilder,private router:Router,private service:LoanService) { }

  ngOnInit() {
    //showing user details
    if(localStorage.username!=null){
      this.service.getUser().subscribe(data=>{
        this.userDetails=data;
        if(this.userDetails.loanAmount!=0){
          this.emiLeft=this.userDetails.loanBal/this.userDetails.emi;
        }
      });
    }
    else{
      this.router.navigate(['login']);
    }

    //creating form and validation
    if (localStorage.username != null) {
      this.addForm = this.formBuilder.group({
        card: ['', [Validators.required,Validators.pattern("[0-9]{16}")]],
        month: ['', Validators.required],
        year:['',Validators.required],
        cvv:['',[Validators.required,Validators.pattern("[0-9]{3}")]]
      });
    }
  }

  //confirm pay
  payEmiConfirm(){
      this.confirmPay=true;
  }

  //payEmi function
  payEmi(){
    this.submitted=true;

    //form validation
    if(this.addForm.invalid){
      return;
    }

      this.service.payEmi(localStorage.username).subscribe(data=>{
        //on emi payment
        this.userDetails=data;
        
        //updating emi left
        this.emiLeft-=1;
        
        //display variables to show/hide content 
        this.paidEmi=true;
        this.loanExists=false;
        this.confirmPay=false;
        
      },err=>{
        //if no loan exists
        this.loanExists=true;
        this.paidEmi=false;
        this.confirmPay=false;

        //getting error message
        this.error=err.error;
      });
  }
}