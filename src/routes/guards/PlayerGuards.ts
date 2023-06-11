import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RequestHandler } from "express";
import PlayerValidator from "../validators/PlayerValidator";


function IsPlayerCreationOptionsGuard(key: null | "query" | "body"): RequestHandler{
    return (req, res, next)=> {

        let obj: object;
        if(key == "query"){
            obj = req.query;
        }
        else{
            obj = req.body;
        }
        
        const valid = PlayerValidator.IsPlayerCreationOptions(obj);

        if(valid){
            next();
        }
        else{
            res.status(HttpStatusCodes.BAD_REQUEST).json({message: "invalid parameters"});
        }
    };
}



export default{
    IsPlayerCreationOptionsGuard,
} as const;