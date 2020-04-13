import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MapsComponent } from './modules/maps/maps.component';
import { RegisterComponent } from './modules/register/register.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { EssentialsComponent } from './modules/essentials/essentials.component';
import { AboutComponent } from './modules/about/about.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },{
    path: 'maps',
    component: MapsComponent
  },{
    path: 'register',
    component: RegisterComponent
  },{
    path: 'reports',
    component: ReportsComponent
  },{
    path: 'essentials',
    component: EssentialsComponent
  },{
    path: 'about',
    component: AboutComponent
  }]
},{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
