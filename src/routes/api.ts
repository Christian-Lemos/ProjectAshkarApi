import { Router } from "express";

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

apiRouter.use(Paths.Players.Base, PlayerRouter);
//apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
