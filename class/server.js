'use strict';

var fs = require('fs');      //fs模块;  
var querystring = require('querystring');//一个和参数相关的帮助类
module.exports = {
    index : function(req, res){
        fs.readFile('html/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });     //读取第一个html的文件（注册页面）
    },
    login : function(req, res){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        console.log('解析数据');//当用户提交注册数据的时候，开始进行解析和写入
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            var tt = querystring.parse(data); //参数字符串格式化成对象
            if(tt.username == "" && tt.password == ""){
                return false;
            } else {
                console.log(tt);
                fs.writeFile('hello.json', JSON.stringify(tt), 'utf8', function (err) {
                    if (err) {
                        return res.end('注册错误',"UTF-8");
                    } else {
                        return res.end('注册成功',"UTF-8");
                    }
                }); 
                 //将我们注册的信息写入(writeFile)到本地的一个json文件中，保存起来
            }
        })
    },
     handle_request : function(req, res) {
        // 不管是什么请求，对文件的请求的话，应该是针对后缀名进行内容读取发放。
        var suffix = req.url.substr(req.url.length - 4, req.url.length);
        var realpath = __dirname + '\\' + '' + '\\';
        var filename = req.url.substr(0);
        if (suffix === '.css') {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(this.get_file_content(realpath + filename));
        } else if (suffix === '.gif') {
            res.writeHead(200, {'Content-Type': 'image/gif'});
            res.end(this.get_file_content(realpath+'\\imgs\\1.gif'));
        } else {
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.end('<h1>404</h1>');
        }
    },
    get_file_content : function(filepath) {
        return fs.readFileSync(filepath);
    }
}

