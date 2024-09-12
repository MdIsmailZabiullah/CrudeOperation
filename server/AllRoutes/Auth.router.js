import express from "express"
import userSchema from "../Models/Auth.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userRouter=express.Router()
//Signup
function hasspass(Pass){
    const salt=10
    return bcrypt.hashSync(Pass,salt)
} 

userRouter.post("/signup",(req,res)=>{
    const {name,email,password}=req.body
    const newUser= new userSchema({
        Name:name,
        Email:email,
        Pass:hasspass(password)
    })

    newUser.save()
        .then((userData)=>{
            if(userData){
                res.status(200).json({"message":"Sign up successfull "})
            }else{
                res.status(201).json("Something went worng !! try again later")
            }
        })
        .catch((error)=>{
            res.status(201).json(error.errorResponse.errmsg)
        })
})


//login


userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find the user by email
    const existingUser = await userSchema.findOne({ Email: email });

    if (!existingUser) {
      return res.status(404).json({ message: 'No such user exists' });
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, existingUser.Pass, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error while comparing passwords' });
      }

      if (result) {
        // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send the response with user information and token
        return res.status(200).json({
          message: 'Login successful',
          user: {
            id: existingUser._id,
            email: existingUser.Email,
            // Add other user fields if needed, but avoid sensitive information like passwords
          },
          token,
        });
      } else {
        return res.status(401).json({ message: 'Wrong credentials' });
      }
    });
  } catch (error) { 
    return res.status(500).json({ message: 'Internal server error' });
  }
});




export default userRouter;
