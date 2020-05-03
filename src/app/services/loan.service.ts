import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userlogin } from '../models/userlogin';
import { user } from '../models/user';
import { transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  //base url to access apache tomcat server
  baseUrl: string = "http://localhost:8080/loan";

  constructor(private http: HttpClient) { }

  // to log in existing  user
  login(userlog: userlogin) {
    return this.http.post(this.baseUrl + "/login", userlog, { responseType: 'text' as 'json' });
  }

  //signing up new user
  createUser(users: user) {
    return this.http.post(this.baseUrl + "/add", users, { responseType: 'text' as 'json' });
  }

  //getting user details
  getUser() {
    return this.http.get<user>(this.baseUrl + "/home");
  }

  //apply fresh loan
  applyLoan(users: user) {
    return this.http.put(this.baseUrl + "/apply", users, { responseType: 'text' as 'json' });
  }

  //showing user details
  showUser(accountNum: string) {
    return this.http.get<user>(this.baseUrl + "/show/" + accountNum);
  }

  //closing loan before duration
  foreClose(accountNum: string) {
    return this.http.get<user>(this.baseUrl + "/foreclose/" + accountNum);
  }

  //paying loan emi
  payEmi(accountNum: string) {
    return this.http.get<user>(this.baseUrl + "/pay/" + accountNum);
  }

  //printing statement of transactions
  printTransaction(accountNum: string) {
    return this.http.get<transaction[]>(this.baseUrl + "/print/" + accountNum);
  }
}