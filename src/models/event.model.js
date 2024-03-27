import mongoose, {Schema} from "mongoose";

const EventSchema = new Schema({
    name : {
        type : String,
        requiree : true,
    },
    startDate : {
        type : Number,
        required : true,
    },
    endDate : {
        type : Number,
        required : true,
    },
    startTime : {
        type : Number,
        required : true,
    },
    endTime : {
        type : Number,
        required : true
    },
},{
    timestamps : true,
})

export const Event = mongoose.model("Event",EventSchema)