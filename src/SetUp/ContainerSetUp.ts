import { IPlayerAppService, PlayerAppService } from "@src/appservices/PlayerAppService";
import ContainerConsts from "@src/constants/ContainerConsts";
import PlayerController from "@src/controllers/PlayerController";
import { IPlayerMapper, PlayerTokenMapper } from "@src/mappers/PlayerMapper";
import { IPlayerRepository, PlayerRepository } from "@src/repositories/PlayerRepository";
import { IPlayerService, PlayerService } from "@src/services/PlayerService";
import { container } from "tsyringe";



export function SetUpContainers(){
    container.registerSingleton<IPlayerRepository>(ContainerConsts.Player.DefaultRepository, PlayerRepository);
    container.registerSingleton<IPlayerService>(ContainerConsts.Player.Service, PlayerService);
    container.registerSingleton<IPlayerAppService>(ContainerConsts.Player.AppService, PlayerAppService);
    container.registerSingleton<IPlayerMapper>(ContainerConsts.Player.Mapper, PlayerTokenMapper);
    
    container.registerSingleton<PlayerController>(ContainerConsts.Controllers.Player, PlayerController);
}