import { IPlayerAppService } from "@src/appservices/PlayerAppService";
import ContainerConsts from "@src/constants/ContainerConsts";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IPlayerCreationOptions } from "@src/repositories/PlayerRepository";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { inject, injectable } from "tsyringe";

@injectable()
export default class PlayerController{

    public  constructor(@inject(ContainerConsts.Player.AppService) private _appService: IPlayerAppService){

    }
    
    public async GetAll(req: IReq, res: IRes): Promise<void>{
        try{
            const players = await this._appService.GetAll();
            res.status(HttpStatusCodes.OK).json(players);
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }


    public async GetById(req: IReq, res: IRes): Promise<void>{
        const id: string = req.params.id;
        try{
            try{
                const user = await this._appService.GetById(id);
                if(user == null){
                    res.status(HttpStatusCodes.NOT_FOUND).end();
                }
                else{
                    res.status(HttpStatusCodes.OK).json(user);
                }
            }
            catch(err){
                res.status(HttpStatusCodes.BAD_REQUEST).json({message: err.message});
            }
            
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }

    public async Create(req: IReq<IPlayerCreationOptions>, res: IRes): Promise<void>{
        try{
            try{
                const user = await this._appService.Create(req.body);
                res.status(HttpStatusCodes.OK).json(user);
                
            }
            catch(err){
                res.status(HttpStatusCodes.BAD_REQUEST).json({message: err.message});
            }
            
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }

    public async DeleteById(req: IReq, res: IRes): Promise<void>{
        const id: string = req.params.id;
        try{
            const players = await this._appService.DeleteById(id);
            res.status(HttpStatusCodes.OK).json(players);
        }
        catch(err){
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }

}