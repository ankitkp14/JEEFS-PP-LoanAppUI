import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { transaction } from 'src/app/models/transaction';
import { user } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  //object to store transactions
  transactions:transaction[];
  accountNum:string;
  
  //error message variable
  error:string;
  
  //to show error alert
  emptyTransaction:boolean=false;

  constructor(private service:LoanService,private router:Router) { }

  ngOnInit() {
    if(localStorage.username!=null){
      this.service.printTransaction(localStorage.username).subscribe(data=>{
        this.transactions=data;
        this.accountNum=localStorage.username;
      },err=>{
        this.emptyTransaction=true;
        //getting error message
        this.error=err.error;
      });
    }
    else{
      this.router.navigate(['login']);
    }
  }
}