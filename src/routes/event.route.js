import { Router } from "express";
import { verifyJWT, verifyPosition } from "../middlewares/auth.middleware";
import { createEvent, registerEvent } from "../controllers/event.controller";

const router = Router()

router.route("/create").post(verifyJWT,verifyPosition,createEvent)
router.route("/register").post(verifyJWT,registerEvent)
export default router