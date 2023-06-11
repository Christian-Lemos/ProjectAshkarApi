import ContainerConsts from "@src/constants/ContainerConsts";
import { IPlayerMapper } from "@src/mappers/PlayerMapper";
import PlayerBasicResponse from "@src/models/Player/PlayerBasicResponse";
import { IPlayerCreationOptions } from "@src/repositories/PlayerRepository";
import { inject, injectable } from "tsyringe";
import { IPlayerService } from "../services/PlayerService";

export interface IPlayerAppService{
    GetById(id: string):Promise<PlayerBasicResponse | null>,
    DeleteById(id: string):Promise<void>
    Create(options: IPlayerCreationOptions): Promise<PlayerBasicResponse>
    GetAll(): Promise<PlayerBasicResponse[]>
}

@injectable()
export class PlayerAppService implements IPlayerAppService{

    public constructor(
        @inject(ContainerConsts.Player.Service) private _service: IPlayerService, 
        @inject(ContainerConsts.Player.Mapper) private _mapper: IPlayerMapper,
    ){

    }
    public async GetAll(): Promise<PlayerBasicResponse[]> {
        const arr:PlayerBasicResponse[] = [];
        const players = await this._service.GetAll();
        for(const player of players){
            arr.push(this._mapper.PlayerToBasicPlayerResponse(player));
        }
        return arr;
    }

    public async GetById(id: string): Promise<PlayerBasicResponse | null> {
        const result = await this._service.GetById(id);
        if(result != null){
            return this._mapper.PlayerToBasicPlayerResponse(result);
        }
        return null;
    }

    public DeleteById(id: string): Promise<void> {
        return this._service.DeleteById(id);
    } 

    public async Create(options: IPlayerCreationOptions): Promise<PlayerBasicResponse> {
        const usr = await this._service.Create(options);
        return this._mapper.PlayerToBasicPlayerResponse(usr);
    }
}