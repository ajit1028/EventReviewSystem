import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createReview, reviewSummary, reportReview, getReview, likeReview } from "../controllers/review.controller.js";

const router = Router()

router.route("/create").post(verifyJWT,createReview)
router.route("/:event_id/summary").get(reviewSummary)
router.route("/:event_id/report").post(verifyJWT,reportReview)
router.route("/reviews").get(verifyJWT,getReview)
router.route("/:review_id/like").post(verifyJWT,likeReview)

export default router