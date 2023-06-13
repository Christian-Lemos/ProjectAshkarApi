import UserRepo from "@src/repos/UserRepo";

import PwdUtil from "@src/util/PwdUtil";
import { tick } from "@src/util/misc";

import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/other/classes";
import { IUser } from "@src/models/User";
import { inject, injectable } from "tsyringe";
import ContainerConsts from "@src/constants/ContainerConsts";
import { IPlayerAuthTokenRepository } from "@src/repositories/AuthTokenRepository";
import jwt from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";
import { IPlayerRepository } from "@src/repositories/PlayerRepository";

// **** Variables **** //

// Errors
export const Errors = {
    Unauth: "Unauthorized",
    EmailNotFound(email: string) {
        return `User with email "${email}" not found`;
    },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<IUser> {
    // Fetch user
    const user = await UserRepo.getOne(email);
    if (!user) {
        throw new RouteError(
            HttpStatusCodes.UNAUTHORIZED,
            Errors.EmailNotFound(email),
        );
    }
    // Check password
    const hash = (user.pwdHash ?? ""),
        pwdPassed = await PwdUtil.compare(password, hash);
    if (!pwdPassed) {
        // If password failed, wait 500ms this will increase security
        await tick(500);
        throw new RouteError(
            HttpStatusCodes.UNAUTHORIZED, 
            Errors.Unauth,
        );
    }
    // Return
    return user;
}

export interface IPlayerAuthService{ 
    CreateToken(playerId:string): Promise<string>;
    DeleteToken(token:string): Promise<void>;
    GetPlayerId(token:string):Promise<string | null>
    DeleteAllTokens(playerId: string):Promise<void>
    Login(email: string, password: string): Promise<{success: boolean, token:string | null}>
}

@injectable()
export class PlayerAuthService implements IPlayerAuthService{

    public constructor (
        @inject(ContainerConsts.Auth.PlayerRepository) private _repository: IPlayerAuthTokenRepository,
        @inject(ContainerConsts.Player.DefaultRepository) private _playerRepository: IPlayerRepository,
    ){

    }
    public async Login(email: string, password: string): Promise<{ success: boolean; token: string | null; }> {
        const player = await this._playerRepository.GetByEmail(email);
        if(player == null){
            return {success:false, token: null};
        }
        else{
            const rightPassword = await PwdUtil.compare(password, player.passwordHash);

            if(rightPassword){
                return {success: true, token: await this.CreateToken(player.id)};
            }
            else{
                return {success:false, token: null};
            }
        }
    }

    public GetPlayerId(token: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, EnvVars.Auth.SecretKey, async (err, decoded) => {
                if(err){
                    reject(err);
                }
                else{
                    const inRepositoryPlayerId = await  this._repository.Get(decoded as string);
                    if(inRepositoryPlayerId != null){
                        resolve(decoded as string);
                    }
                    else{
                        resolve(null)
                    }
                }
            });
        });
    }

    public async CreateToken(playerId: string): Promise<string> {
        const token: string = jwt.sign(playerId, EnvVars.Auth.SecretKey);
        await this._repository.Create(token, playerId);
        return token;
    }
    public async DeleteToken(token: string): Promise<void> {
        const id = await this.GetPlayerId(token);
        if(id != null){


            await this._repository.Delete(token);
        }
        
    }

    public DeleteAllTokens(playerId: string):Promise<void>{
        return this._repository.DeleteAllByPlayerId(playerId);
    }

}
