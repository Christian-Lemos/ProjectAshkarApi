import {v4} from "uuid";
import { createClient, RedisClientType } from "redis";
import { injectable } from "tsyringe";

export interface IAuthTokenRepository<T>{
    Get(token:string):Promise<T | null>;
    Create(token:string, data: T): Promise<void>;
    Delete(token: string): Promise<void>;
}

export interface IPlayerAuthTokenRepository extends IAuthTokenRepository<string>{
    DeleteAllByPlayerId(playerId: string):Promise<void>;
}

const token_key_database = 1;
const playerId_key_database = 2;

@injectable()
export class PlayerAuthTokenRepository implements IPlayerAuthTokenRepository{
    
    private _connected = false;
    private _tokenDatabase: RedisClientType = createClient({database: token_key_database});
    private _playerIdDatabase: RedisClientType = createClient({database: playerId_key_database});

    public async Get(token: string): Promise<string|null> {
        await this.Connect();
        const value = await this._tokenDatabase.get(token);
        return value;
    }

    public async Create(token: string, userId: string): Promise<void> {
        await this.Connect();
        await this._tokenDatabase.set(token, userId, {EX:7200});
        await this._playerIdDatabase.set(`player-${userId}-${v4()}`, token, {EX:7200});
    }

    public async Delete(token: string): Promise<void> {
        await this.Connect();
        const userId = await  this.Get(token);
        await this._tokenDatabase.del(token);
        if(userId != null){
            const keys = await this._playerIdDatabase.keys(`player-${String(userId)}*`);
            for(const key of keys){
                const val = await  this._playerIdDatabase.get(key);
                if(val == token){
                    await this._playerIdDatabase.del(key);
                }
            }
        }
    }

    public async DeleteAllByPlayerId(playerId: string):Promise<void>{
        await this.Connect();
        const keys = await this._playerIdDatabase.keys(`player-${String(playerId)}*`);
        for(const key of keys){
            const val = await  this._playerIdDatabase.get(key);
            await this._playerIdDatabase.del(key);
            await this._tokenDatabase.del(String(val));
        }
    }

    private async Connect():Promise<void>{
        if(!this._connected){
            await this._tokenDatabase.connect();
            await this._playerIdDatabase.connect();
            this._connected = true;
        }
    }
}