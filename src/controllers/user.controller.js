import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from  "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{

    // console.log("called")

    const {email,fullName,phone,password, isOrganiser} = req.body;

    if([email, password, fullName,phone].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(400,"user already exists")
    }

    const user = await User.create({
        email,
        fullName,
        phone,
        password,
        isOrganiser,
    })

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    res.status(200)
    .json(
        new ApiResponse(200,"User registered Successfully")
    )
})

export {registerUser}