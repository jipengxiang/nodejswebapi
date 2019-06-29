var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"nodejs-user",
            password:"password",
            database:"furniture"

        }

        );

        return conn;

    }
}
module.exports=dbConnect;