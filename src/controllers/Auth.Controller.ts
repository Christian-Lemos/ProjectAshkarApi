import { IAuthAppService } from "@src/appservices/AuthAppService";
import ContainerConsts from "@src/constants/ContainerConsts";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import IPlayerLoginRequest from "@src/models/Auth/IPlayerLoginRequest";
import IPlayerLoginResponse from "@src/models/Auth/IPlayerLoginResponse";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { inject, injectable } from "tsyringe";


@injectable()
export default class AuthController{

    public  constructor(@inject(ContainerConsts.Auth.PlayerAppService) private _appService: IAuthAppService){

    }

    public async Login(req: IReq<IPlayerLoginRequest>, res: IRes): Promise<void>{
        try{
            let result: IPlayerLoginResponse;
            try{
                result = await this._appService.Login(req.body);
            }
            catch(err){
                res.status(HttpStatusCodes.BAD_REQUEST).json({message: err.message});
                return;
            }
            
            res.status(HttpStatusCodes.OK).json(result);
            
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }

    public async Logout(req: IReq, res: IRes): Promise<void>{
        try{
            console.log(req.authToken)
            if(req.authToken != null){
                await this._appService.Logout(req.authToken);
                res.status(HttpStatusCodes.OK).end();
            }
            else{
                res.status(HttpStatusCodes.BAD_REQUEST).json({message: "Auth token not provided"});
            }
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }


    public HasValidToken(req: IReq, res: IRes): void{
        try{
            console.log(req.userId)
            res.status(HttpStatusCodes.OK).json(req.userId != null);
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }

}