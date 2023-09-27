import { ICredentials } from "../Models/ICredentials";

export interface IAuthService{
    Login(credentials: ICredentials): void
}