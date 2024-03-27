import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createReview, reviewSummary, reportReview } from "../controllers/review.controller.js";

const router = Router()

router.route("/create").post(verifyJWT,createReview)
router.route("/:event_id/summary").get(reviewSummary)
router.route("/:event_id/report").post(verifyJWT,reportReview)

export default router