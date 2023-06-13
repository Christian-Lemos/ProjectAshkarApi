import ContainerConsts from "@src/constants/ContainerConsts";
import EnvVars from "@src/constants/EnvVars";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IPlayerAuthService } from "@src/services/AuthService";
import { Router } from "express";
import { container } from "tsyringe";
import AuthRouter from "./AuthRouter";

import Paths from "./constants/Paths";
import PlayerRouter from "./PlayerRouter";

const apiRouter = Router();

/*
// Get all users
userRouter.get(
    Paths.Users.Get,
    UserRoutes.getAll,
);

// Add one user
userRouter.post(
    Paths.Users.Add,
    validate(["user", User.isUser]),
    UserRoutes.add,
);

// Update one user
userRouter.put(
    Paths.Users.Update,
    validate(["user", User.isUser]),
    UserRoutes.update,
);

// Delete one user
userRouter.delete(
    Paths.Users.Delete,
    validate(["id", "number", "params"]),
    UserRoutes.delete,
);
*/

const authService: IPlayerAuthService = container.resolve(ContainerConsts.Auth.PlayerService);

apiRouter.use(async (req, res, next) => {
    req.authToken = req.header(EnvVars.Auth.HttpHeader);
    try{
        console.log(`auth token: ${req.authToken as string}`)
        if(req.authToken != null){
            const id = await authService.GetPlayerId(req.authToken);
            console.log("middleware: found id" + String(id));
            if(id != null){
                req.userId = id;
            }
        }
        next();
    }
    catch(err){
        res.status(HttpStatusCodes.UNAUTHORIZED).json({message: "invalid token"});
    }
});

apiRouter.use(Paths.Players.Base, PlayerRouter);
apiRouter.use(Paths.Auth.Base, AuthRouter);
//apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
