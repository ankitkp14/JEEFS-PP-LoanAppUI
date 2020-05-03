import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    // if user is logged in
    if(localStorage.username!=null){
      this.router.navigate(['home']);
    }
  }
}