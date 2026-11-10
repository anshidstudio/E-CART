import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {
        console.log("received:", req.body);
        const user = req.body;
        const newuser = await User.create(user);
        res.status(201).json({message: "Registration Completed", success: true, newuser  });

    } catch (error) {
        res.status(500).json({message: "Registration Error", success: false, error: error.message});
    }
};



export const login = async (req, res)=> {
    try {
        const {email, password } = req.body;
        const isExit = await User.findOne({ email : email});
        if (!isExit){
            res.status(404).json({success: false, message: "user not exist!" });
        }
        const auth = await bcrypt.compare(password, isExit.password);
        if(!auth){
            res.status(401).json({message: "incorrect password!",success: false });  
        }
        


        const token = jwt.sign({id: isExit._id, email: isExit.email, role: isExit.role},process.env.JWT_SECRET,{expiresIn: "1hr"})
        console.log(token);
        res.cookie("token", token, {maxAge : 60 * 60 * 1000})
        res.status(200).json({message: "login successfull",success: true });
        

    } catch (error) {
        res.status(500).json({error: error.message ,success: false });
    }
    
}

export default register;


