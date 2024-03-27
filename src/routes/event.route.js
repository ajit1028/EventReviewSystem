import { Router } from "express";
import { verifyJWT, verifyPosition } from "../middlewares/auth.middleware.js";
import { createEvent, registerEvent } from "../controllers/event.controller.js";

const router = Router()

router.route("/create").post(verifyJWT,verifyPosition,createEvent)
router.route("/register").post(verifyJWT,registerEvent)
export default router