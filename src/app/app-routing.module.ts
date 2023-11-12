import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';


const routes: Routes = [
  {path: "Login", component: LoginComponent},
  {path: "Home", component: HomeComponent},
  {path: "Items/:catType", component: ItemsViewComponent, pathMatch: "prefix"},
  {path: "Items", component: ItemsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
