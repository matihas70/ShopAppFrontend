import { Injectable } from "@angular/core"
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from "@angular/common/http"
import { IAuthService } from "../Interfaces/IAuthService"
import { ICredentials } from "../Models/ICredentials"
import {Urls} from "../Consts/Urls"
import { Router } from "@angular/router"
@Injectable({providedIn: "root"})
export class AuthService implements IAuthService{

    constructor(private client: HttpClient, private router: Router){
 
    }
    public Login(credentials: ICredentials){
        this.client.post(Urls.login, credentials, {observe: 'response', responseType:'json', withCredentials:true})
        .subscribe((res:HttpResponse<any>) => {
             if(res.status == 200){
                this.router.navigate(['/home'])
             }
        },
        (error) =>{
            console.log(error)
        })
    }
}