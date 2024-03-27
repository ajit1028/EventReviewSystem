import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RegisteredUser } from "../models/registerEvent.model.js";

const createEvent = asyncHandler(async(req,res)=>{
    const {name,desc,startDate,endDate,startTime,endTime} = req.body

    if([name,desc,startDate,endDate,startTime,endTime].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }

    const event = await Event.create({
        name,
        desc,
        startDate,
        endDate,
        startTime,
        endTime,
        createdBy : req.user._id
    })

    if(!event){
        throw new ApiError(401,"Something went wrong while creatning event")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{event},"Event Created Successfully")
    )
})

const registerEvent = asyncHandler(async(req,res)=>{

    const {eventId} = req.body;
    const userId = req.user?._id;

    const registered = await RegisteredUser.create({
        eventId,
        userId
    })

    if(!registered){
        throw new ApiError(400,"Something went wrong while registering user")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{registered},"Successfullly registered for the event")
    )
})

export {createEvent,registerEvent}