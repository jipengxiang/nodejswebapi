var jwt=require('jsonwebtoken');

var config=require('../config');

function verifyToken(req,res,next){
    console.log(req.headers);

    var token=req.headers['authorization'];
    console.log(token);

    if(!token || !token.includes('Bearer')){

        res.status(403);
        return res.send({auth:'false',message:'Not authorized!'});
    }else{
        token=token.split('Bearer ')[1];
        console.log(token);
        jwt.verify(token,config.key,function(err,decoded){
            if (err){
                res.status(403);
                return res.end({auth:false,message:'Not authorized!'});
            }else{

                req.userid=decoded.userid;
                req.role=decoded.role;
                next();
            }

        });
    }




}

module.exports=verifyToken;