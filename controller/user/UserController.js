import UserSchema from "../../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

const UserController = {
    async AddUserOne(req,res,next){
       const {email,password,status,valid,type} = req.body;
       const salt = bcrypt.genSaltSync(10);
       const hashpassword = bcrypt.hashSync(password, salt);

       try {
        const data = new UserSchema({
            email,
            password: hashpassword,
            type,
            status,
            valid,
        });

        const savedata = await data.save();
        if (!savedata) {
            return res.status(501).json({msg:"User not created"});
        }
        return res.status(200).json({msg:"User created"});
       } catch (error) {
        next(error);
       }
    },

    async UserLogin(req,res,next){
        try {
            const isExit = await UserSchema.findOne({email:req.body.email});
            if (!isExit) {
               return res.status(401).json({msg:"User is not authorized1"});
            }
            
            const validatePass = bcrypt.compareSync(req.body.password, isExit.password);
            
            if(!validatePass){
                return res.status(401).json({msg:"user is not authorized3"});
            }

            if(isExit.type!="admin"){
                const date =  new Date(Date.now()).toLocaleString().split(',')[0];

                if(isExit.valid<date){
                    return res.status(401).json({msg:"Your Subscription Expried. Renew it now"});
                }
    
            }

            var token = jwt.sign({ 
                id:isExit._id,
                type:isExit.type
            }, JWT_SECRET);

            const {password,isadmin,__v, ...others} = isExit._doc;

            // return res.cookie("access_token",token,{httpOnly:true}).status(201).json(others);
            res.status(200).json({access_token:token, id:others._id, valid:others.valid});
            
        } catch (error) {
            next(error);
        }
    },

    async viewUsers(req,res,next){
        try {
            const users = await UserSchema.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async viewUserById(req,res,next){
        try {
            const user = await UserSchema.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            const id = req.params.id;
            if(error){
                return console.log("error");
            }

            const {name,email,address,language} = req.body;
            
            try {
                const update = await UserSchema.findByIdAndUpdate(
                    {_id:id},
                    {
                        name,
                        email,
                        language,
                        address
                    },
                    {new:true}
                );
                if (!update) {
                    res.status(501).json({msg:"User not updated"});
                }
                res.status(200).json({msg:"User updated Successfully"});
            } catch (error) {
                next(error);
            }
            
        })
    },

    async updatePassword(req,res,next){
        const id = req.params.id;

        const {oldpassword, newpassword} = req.body;

        try {
            const user = await UserSchema.findById({_id:id});
            const validatePass = bcrypt.compareSync(oldpassword, user.password);
            if (!validatePass) {
                res.status(401).json({msg:"Invalid Password"});
            }
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(newpassword, salt);

            const update = await UserSchema.findByIdAndUpdate(
                {_id:id},
                {
                   password:hashpassword,
                },
                {new:true}
            );
            res.status(200).json({msg:"User updated Successfully"});
        } catch (error) {
            next(error);
        }
    },

    async  deleteUser(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            const id = req.params.id;
            if(error){
                console.log(error);
                
            }
            try {
                await UserSchema.findByIdAndDelete({_id:id});
                res.status(201).json({msg:"User deleted successfully."});
            } catch (error) {
                next(error);
            }    
        })
    },

    async GetUserRole(req,res,next){
        const id = req.params.id;
        try {
            const role = await UserSchema.findById({_id:id})
            return res.status(200).json({role:role.type});
        } catch (error) {
            next(error);
        }
    },

    async TotalUser(req,res,next){
        try {
            const user = await UserSchema.find().countDocuments();
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async LatestUser(req,res,next){
        try {
            const user = await UserSchema.find().limit(10);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }


    
}

export default UserController;