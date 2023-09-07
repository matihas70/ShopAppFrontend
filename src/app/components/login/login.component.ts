import { Component, Input, Output, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import { IAuth } from 'src/app/Interfaces/IAuth';
import { AuthService } from 'src/app/Services/AuthService';
import { ICredentials } from 'src/app/Interfaces/ICredentials';
import { Paths } from 'src/app/Consts/Paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent {
  emailIcon = Paths.icons + "email.svg"
  passwordIcon = Paths.icons + "lock.svg"
  constructor(private auth: AuthService){
  }

  icons =["google", "facebook", "github"]
  iconsPath:string = Paths.icons
  
  login(email:string, password:string){
    this.auth.login({Email:email, Password:password});
  }
}
