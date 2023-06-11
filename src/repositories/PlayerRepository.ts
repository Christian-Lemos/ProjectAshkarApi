import Player from "@src/models/Player/Player";
import PwdUtil from "@src/util/PwdUtil";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { injectable } from "tsyringe";

export interface IPlayerCreationOptions{
    nickname:string,
    email:string,
    password:string,
}



export const PlayerCreationError = {
    Validation: "Failed validation",
    Email: "Repeated Email",
};

export interface IPlayerRepository{
    GetById(id:string): Promise<Player | null>;
    DeleteById(id:string): Promise<void>;
    Create(options: IPlayerCreationOptions): Promise<Player>;
    GetAll(): Promise<Player[]>
}

@injectable()
export class PlayerRepository implements IPlayerRepository{

    public GetAll(): Promise<Player[]> {
        return Player.findAll();
    }
    public async GetById(id: string): Promise<Player | null> {
        return Player.findOne({where:{id}});
    }
    public async DeleteById(id: string): Promise<void> {
        await Player.destroy({where:{id}});
    }
    public async Create(options: IPlayerCreationOptions): Promise<Player> {
        const player = new Player();
        player.nickname = options.nickname;
        player.email = options.email.toLowerCase();
        player.passwordHash = await PwdUtil.getHash(options.password);

        try{
            await player.validate();
        }
        catch(err: unknown){
            if(err instanceof ValidationError){
                const messages = [];
                for(const error of err.errors){
                    messages.push(error.message);
                }
                throw new Error(messages.join(","));
            }
            else{
                throw err;
            }
        }

        try{
            await player.save();
        }
        catch(err){
            if(err instanceof UniqueConstraintError){
                throw new Error(PlayerCreationError.Email);
            }
            else{
                throw err;
            }
        }
        return player;
    }
}