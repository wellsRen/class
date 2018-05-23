var mysql  = require('mysql');  
var connection;
module.exports = {
  sqlLink : function(sql){
    this.mesql()
    if(sql != ''){
      let data = [];
      connection.connect();
      //查询
      connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.username);
          return;
        }
        data = result;
        console.log(data) 
        return data;
      });
      connection.end();
      return data;
      // %SystemRoot%\system32\cmd.exe;
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

