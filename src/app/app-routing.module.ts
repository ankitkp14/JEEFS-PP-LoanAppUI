import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ShowbalComponent } from './components/showbal/showbal.component';
import { ForecloseComponent } from './components/foreclose/foreclose.component';
import { PayemiComponent } from './components/payemi/payemi.component';
import { CalcemiComponent } from './components/calcemi/calcemi.component';
import { PrintComponent } from './components/print/print.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'apply',component:ApplyComponent},
  {path:'show',component:ShowbalComponent},
  {path:'foreclose',component:ForecloseComponent},
  {path:'pay',component:PayemiComponent},
  {path:'calc',component:CalcemiComponent},
  {path:'print',component:PrintComponent},
  {path:'**',redirectTo:'/index',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }