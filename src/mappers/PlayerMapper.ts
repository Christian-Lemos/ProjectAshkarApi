import Player from "@src/models/Player/Player";
import PlayerBasicResponse from "@src/models/Player/PlayerBasicResponse";
import { injectable } from "tsyringe";
import TokenMapper from "./TokenMapper";

export interface IPlayerMapper{
    PlayerToBasicPlayerResponse(player: Player): PlayerBasicResponse
}

const tokens = {
    Model: "player.model",
    Response: "player.response",
};

@injectable()
export class PlayerTokenMapper extends TokenMapper implements IPlayerMapper{
    public constructor(){
        super();
		
        this.Register<Player, PlayerBasicResponse>(tokens.Model, tokens.Response, (source) => {
            const response =  new PlayerBasicResponse();
            response.id =source.id;
            response.nickname = source.nickname;
            return response;
        });
    }
    public PlayerToBasicPlayerResponse(player: Player): PlayerBasicResponse {
        return this.Resolve(tokens.Model, tokens.Response, player);
    }
}
