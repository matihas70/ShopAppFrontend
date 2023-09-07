import { ICredentials } from "./ICredentials";

export interface IAuth{
    login(credentials: ICredentials): void
}