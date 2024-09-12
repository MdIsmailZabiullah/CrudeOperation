import mongoose, { version } from "mongoose"

const userSchema=mongoose.Schema({
    Name:{required: true, type: String},
    Email:{required: true, type: String, unique: true},
    Pass:{required: true, type: String}
},{versionKey:false})

export default mongoose.model("userschema",userSchema,"User")