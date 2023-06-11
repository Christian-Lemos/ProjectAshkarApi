import ContainerConsts from "@src/constants/ContainerConsts";
import PlayerController from "@src/controllers/PlayerController";
import { Router } from "express";
import jetValidator from "jet-validator";
import { container } from "tsyringe";
import Paths from "./constants/Paths";
import PlayerGuards from "./guards/PlayerGuards";

// **** Variables **** //

const router = Router();
const validate = jetValidator();
const controller: PlayerController = container.resolve(ContainerConsts.Controllers.Player);

router.get(Paths.Players.GetAll, controller.GetAll.bind(controller));
router.get(Paths.Players.GetById, validate(["id", "string", "params"]), controller.GetById.bind(controller));
router.post(Paths.Players.Create, PlayerGuards.IsPlayerCreationOptionsGuard("body"), controller.Create.bind(controller));
router.delete(Paths.Players.Delete, validate(["id", "string", "params"]), controller.DeleteById.bind(controller));


export default router;