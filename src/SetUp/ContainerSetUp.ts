import { AuthAppService, IAuthAppService } from "@src/appservices/AuthAppService";
import { IPlayerAppService, PlayerAppService } from "@src/appservices/PlayerAppService";
import ContainerConsts from "@src/constants/ContainerConsts";
import AuthController from "@src/controllers/Auth.Controller";
import PlayerController from "@src/controllers/PlayerController";
import { IPlayerMapper, PlayerTokenMapper } from "@src/mappers/PlayerMapper";
import { IPlayerAuthTokenRepository, PlayerAuthTokenRepository } from "@src/repositories/AuthTokenRepository";
import { IPlayerRepository, PlayerRepository } from "@src/repositories/PlayerRepository";
import { IPlayerAuthService, PlayerAuthService } from "@src/services/AuthService";
import { IPlayerService, PlayerService } from "@src/services/PlayerService";
import { container } from "tsyringe";



export function SetUpContainers(){
    container.registerSingleton<IPlayerRepository>(ContainerConsts.Player.DefaultRepository, PlayerRepository);
    container.registerSingleton<IPlayerService>(ContainerConsts.Player.Service, PlayerService);
    container.registerSingleton<IPlayerAppService>(ContainerConsts.Player.AppService, PlayerAppService);
    container.registerSingleton<IPlayerMapper>(ContainerConsts.Player.Mapper, PlayerTokenMapper);
    
    container.registerSingleton<IPlayerAuthTokenRepository>(ContainerConsts.Auth.PlayerRepository, PlayerAuthTokenRepository);
    container.registerSingleton<IPlayerAuthService>(ContainerConsts.Auth.PlayerService, PlayerAuthService);
    container.registerSingleton<IAuthAppService>(ContainerConsts.Auth.PlayerAppService, AuthAppService);
    

    container.registerSingleton<PlayerController>(ContainerConsts.Controllers.Player, PlayerController);
    container.registerSingleton<AuthController>(ContainerConsts.Controllers.Auth, AuthController);
}