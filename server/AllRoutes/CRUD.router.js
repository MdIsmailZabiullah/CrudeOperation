import express from "express"
import StudentModel from "../Models/Student.model.js";
import cheakAuth from "../Middleware/Auth.js";

const crudRouter=express();

crudRouter.get("/all",(req,res)=>{
    StudentModel.find({})
        .exec()
        .then((studentData)=>{
            res.status(200).json(studentData)
        })
        .catch((error)=>{
            res.status(201).json(error._message)
        })
})

crudRouter.post("/add",cheakAuth,(req,res)=>{
    const {name,age,stream,address} =  req.body;
    // const {token}=req.headers.authorization
    // console.log(token);
    

    const newStudent= new StudentModel({
        Name: name,
        Age: age,
        Stream: stream,
        Address: address 
    })

    newStudent.save()
        .then((successData)=>{
            if(!successData){
                res.status(201).json("Add student Failed!!")
                return
            }
            res.status(200).json("Successfully added Student")
        })
        .catch((error)=>{
            res.status(201).json(error._message)
        })
})

crudRouter.delete("/delete/:id",cheakAuth,(req,res) => {
    StudentModel.deleteOne({'_id':req.params.id})
            .then((Data) => {
                if(Data.acknowledged){
                    res.status(200).json("Successfully Deleted")
                    return
                }
                res.status(200).json("Failed to delete")

            })
            .catch((error) => {
                res.status(201).json(error._message)  
            })
})

crudRouter.all("/update/:id", cheakAuth,(req,res) => {

    if(req.method==='PUT' || req.method==='PATCH'){
        const {name,age,stream,address} =  req.body;
        StudentModel.updateOne({"_id":req.params.id},{$set:{Name:name, Age:age, Stream:stream, Address:address}})
                .then((Data) => {
                    if(Data.acknowledged){
                        res.status(200).json("successfully Updated")
                        return
                    }
                    res.status(200).json("failed to Update")
                })
                .catch((error) => {res.status(201).json(error._message)})
    }
    else{
        res.status(201).json(`only PUT and PATCH method works Here`)
    } 
})
export default crudRouter; 