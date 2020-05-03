import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { user } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showbal',
  templateUrl: './showbal.component.html',
  styleUrls: ['./showbal.component.css']
})
export class ShowbalComponent implements OnInit {

  //creating object 
  userDetails:user=new user;
  
  //calculating new fields
  emiLeft:number=0;
  foreClose:number=0;

  //alert variable
  alertVar:boolean=false;

  constructor(private service:LoanService,private router:Router) { }

  ngOnInit() {
    if(localStorage.username!=null){
      this.service.getUser().subscribe(data=>{
        //getting user details
        this.userDetails=data;
        if(this.userDetails.loanAmount!=0){
          this.emiLeft=this.userDetails.loanBal/this.userDetails.emi;
        }
        else{
          this.alertVar=true;
        }
        this.foreClose=Math.round(this.userDetails.loanBal*1.04);
      });
    }
    else{
      this.router.navigate(['login']);
    }
  }
}