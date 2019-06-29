var db=require('./databaseConfig.js');
var config=require('../config.js');
var jwt=require('jsonwebtoken');
var userDB={

    getUser:function(userid,callback){

        var conn=db.getConnection();
    
        conn.connect(function(err){

            if(err){
                console.log(err);
                return callback(err,null);
            }else{

                console.log("Connected!");
                var sql="Select * from user where userid=?";

                conn.query(sql,[userid],function(err,result){

                    conn.end();
                    if(err){
                        console.log(err);
                        return callback(err,null);
                    }else{

                        return callback(null,result);
                    }

                });

            }


        });

    },
    addUser:function(username,email,role,password,callback){

        var conn=db.getConnection();
    
        conn.connect(function(err){

            if(err){
                console.log(err);
                return callback(err,null);
            }else{

                console.log("Connected!");
                var sql="insert into user(username,email,role,password) values(?,?,?,?)";

                conn.query(sql,[username,email,role,password],function(err,result){
                    conn.end();

                    if(err){
                        console.log(err);
                        return callback(err,null);
                    }else{
                        console.log(result.affectedRows);
                        return callback(null,result.affectedRows);
                    }

                });

            }


        });

    },
    loginUser: function (email,password, callback) {
        
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
        
                console.log("Connected!");
        
                var sql = 'select * from user where email=? and password=?';
        
                conn.query(sql, [email,password], function (err, result) {
                    conn.end();
                            
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                                
                    } else {
        
                        //console.log(config.key);

                        var token="";
                        if(result.length==1){
                            token=jwt.sign({id:result[0].userid,iat: Math.floor(Date.now() / 1000),role:result[0].role},config.key,{

                                expiresIn:86400//expires in 24 hrs
                            });
        
                        }
                        //console.log(result[0].userid);
                                
                        return callback(null,token);
        
                    }
                });
        
            }
        
        });
    }

}

module.exports=userDB;
