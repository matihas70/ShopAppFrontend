import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { AuthService } from './Services/AuthService';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ItemService } from './Services/ItemService';
import { IAuthService } from './Interfaces/IAuthService';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { TreeviewComponent } from './components/treeview/treeview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SvgIconComponent,
    HomeComponent,
    ItemsViewComponent,
    TreeviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
