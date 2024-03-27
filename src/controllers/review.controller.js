import { Review } from "../models/review.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


function calculateAverageRating(ratings) {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
}

function calculateOverallAverageRating(reviews) {
    const totalRatings = reviews.reduce((acc, review) => acc + review.registrationRating + review.eventRating + review.brunchRating, 0);
    return totalRatings / (reviews.length * 3); // Average of all criteria ratings
}

const createReview = asyncHandler(async(req,res)=>{

    const {event, text, registrationRating, eventRating, brunchRating } = req.body
    const userId = req.user._id

    if([event, text, registrationRating, eventRating, brunchRating].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }


    const review = await Review.create({
        event,
        userId,
        text,
        registrationRating,
        eventRating,
        brunchRating
    })

    if(!review){
        throw new ApiError(400,"Something went wrong while creating review")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{review},"Review created successfully")
    )
})

const reviewSummary = asyncHandler(async(req,res)=>{

    const eventID = req.params.event_id;
    const reviews = await Review.find({ event: eventID });



    const totalReviews = reviews.length;
    const registrationAvgRating = calculateAverageRating(reviews.map(review => review.registrationRating));
    const eventAvgRating = calculateAverageRating(reviews.map(review => review.eventRating));
    const brunchAvgRating = calculateAverageRating(reviews.map(review => review.brunchRating));
    const overallAvgRating = calculateOverallAverageRating(reviews);

    const summary = {
        totalReviews,
        registrationAvgRating,
        eventAvgRating,
        brunchAvgRating,
        overallAvgRating
        // Additional summary data can be included here
      };
      
      // Send summary as the response
      res.status(200)
      .json(
        new ApiResponse(200,{summary},"Summary Fetched")
      );

})

const reportReview = asyncHandler(async(req,res)=>{
    const eventID = req.params.event_id;
    const review = await Review.findOne({ event: eventID })

    if(!review){
        throw new ApiError(400,"No Review found with the provided ID")
    }

    const reportCount= review.reported + 1;
    if(reportCount === 5){
        review.flagged = true
    }

    review.reported = reportCount
    review.save()

    res.status(200)
    .json(
        new ApiResponse(200,{review},"Review Reported Successfully")
    )

})


export {createReview,
    reviewSummary,
    reportReview}