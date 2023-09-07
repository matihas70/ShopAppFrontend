import { Injectable } from "@angular/core"
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from "@angular/common/http"
import { IAuth } from "../Interfaces/IAuth"
import { ICredentials } from "../Interfaces/ICredentials"
import {Urls} from "../Consts/Urls"
import { Router } from "@angular/router"
@Injectable({providedIn: "root"})
export class AuthService implements IAuth{

    constructor(private client: HttpClient, private router: Router){
 
    }
    public login(credentials: ICredentials){
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