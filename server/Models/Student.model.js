import mongoose from "mongoose"

const studentModel=mongoose.Schema({
    Name:{type : String, required : true},
    Age:{type : Number, required : true},
    Stream:{type : String, required : true},
    Address:{type : String, required : true}
},{versionKey:false})

export default mongoose.model("studentShcema",studentModel,"Students")