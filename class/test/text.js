var mysql  = require('mysql');  
var connection;
let data = [];
module.exports = {
  sqlLink : function(sql,callback){
    if(sql != ''){
      //查询this.mesql()
      this.mesql();
      connection.connect();
      connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err);
          callback('');
          return false;
        }
        callback(result);
      });
      connection.end();
    }
  },
  mesql : function(){
    connection = mysql.createConnection({     
      host     : 'localhost',       
      user     : 'root',              
      password : '123',       
      port: '3306',                   
      database: 'school', 
    }); 
  }
}

