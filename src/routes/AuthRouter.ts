import ContainerConsts from "@src/constants/ContainerConsts";
import AuthController from "@src/controllers/Auth.Controller";
import { Router } from "express";
import jetValidator from "jet-validator";
import { container } from "tsyringe";
import Paths from "./constants/Paths";

// **** Variables **** //

const router = Router();
const validate = jetValidator();
const controller: AuthController = container.resolve(ContainerConsts.Controllers.Auth);


router.post(Paths.Auth.Login, validate(["email", "string", "body"], ["password", "string", "body"]), controller.Login.bind(controller))
router.get(Paths.Auth.IsAuthenticated, controller.HasValidToken.bind(controller));
router.delete(Paths.Auth.Logout, controller.Logout.bind(controller));


export default router;