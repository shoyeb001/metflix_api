import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const verifyfunction = (req,res,next)=>{
    const acc_token = req.headers.authorization;
    if(acc_token){
        const token = acc_token.split(" ")[1];
        jwt.verify(token, JWT_SECRET, function(err,user) {
            if (err) {
                return res.json({msg:"Token is invalid"});
            }
            req.user = user;
            next();
        });
    }else{
        return res.json({msg:"User unauthorized"});
    }

}

const verifyuser = (req,res,next)=>{
    verifyfunction(req,res,()=>{
        if (req.user.id === req.params.id || req.params.type==="admin") {
            next();
        }
        else{
            return res.json({msg:"User is unauthorized"});
        }
    });
}

const verifyadmin = (req,res,next)=>{
    verifyfunction(req,res,()=>{
        if (req.user.type==="admin") {
            next();
        }
        else{
            return res.json({msg:"user unauthorized"});
        }
    })
}

export {verifyfunction,verifyuser,verifyadmin};
