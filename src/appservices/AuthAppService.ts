import ContainerConsts from "@src/constants/ContainerConsts";
import IPlayerLoginResponse from "@src/models/Auth/IPlayerLoginResponse";
import  { IPlayerAuthService } from "@src/services/AuthService";
import { inject, injectable } from "tsyringe";
import IPlayerLoginRequest from "../models/Auth/IPlayerLoginRequest"
;
export interface IAuthAppService{
   Login(request: IPlayerLoginRequest):Promise<IPlayerLoginResponse>
   Logout(authToken: string):Promise<void>,
}


@injectable()
export class AuthAppService implements IAuthAppService{

    public constructor (@inject(ContainerConsts.Auth.PlayerService) private _service: IPlayerAuthService){

    }

    public async Login(request: IPlayerLoginRequest): Promise<IPlayerLoginResponse> {
        const result = await this._service.Login(request.email, request.password);
        if(result.success){
            return {token:result.token as string};
        }
        else{
            throw new Error("Email or password incorrect");
        }
    }
    public Logout(authToken: string): Promise<void> {
        return this._service.DeleteToken(authToken);
    }

}