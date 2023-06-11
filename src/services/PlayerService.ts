import ContainerConsts from "@src/constants/ContainerConsts";
import Player from "@src/models/Player/Player";
import { inject, injectable } from "tsyringe";
import { IPlayerCreationOptions, IPlayerRepository } from "../repositories/PlayerRepository";

export interface IPlayerService{
    GetById(id: string):Promise<Player | null>,
    DeleteById(id: string):Promise<void>
    Create(options: IPlayerCreationOptions): Promise<Player>
    GetAll():Promise<Player[]>
}



@injectable()
export class PlayerService implements IPlayerService{
    public constructor(@inject(ContainerConsts.Player.DefaultRepository) private _repository: IPlayerRepository){

    }

    public GetAll(): Promise<Player[]> {
        return this._repository.GetAll();
    }

    public GetById(id: string): Promise<Player | null> {
        return this._repository.GetById(id);
    }
    public DeleteById(id: string): Promise<void> {
        return this._repository.DeleteById(id);
    }
    public Create(options: IPlayerCreationOptions): Promise<Player> {
        return this._repository.Create(options);
    }   
}