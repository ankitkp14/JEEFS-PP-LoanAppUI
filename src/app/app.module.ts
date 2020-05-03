import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ShowbalComponent } from './components/showbal/showbal.component';
import { ForecloseComponent } from './components/foreclose/foreclose.component';
import { PayemiComponent } from './components/payemi/payemi.component';
import { CalcemiComponent } from './components/calcemi/calcemi.component';
import { PrintComponent } from './components/print/print.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ApplyComponent,
    ShowbalComponent,
    ForecloseComponent,
    PayemiComponent,
    CalcemiComponent,
    PrintComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
