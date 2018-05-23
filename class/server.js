'use strict';

var fs = require('fs');      //fs模块;  
var url=require('url');
var querystring = require('querystring');//一个和参数相关的帮助类
var text = require('./test/text');

module.exports = {
    index : function(req, res){
        fs.readFile('html/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });     //读取第一个html的文件（注册页面）
    },
    // 学生登录
    studentLogin : function(req, res){
        var _left = this;
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            req.cookies = _left.parseCookie(req.headers.cookie);
            if(!req.cookies.studentInfo){
                
                var tt = querystring.parse(data);
                var name = tt.username;
                var password = tt.password;
                var sql = "select * from student where name = '" + name + "' and password = " + password;
                
                var tabledata = text.sqlLink(sql);
                fs.readFile('html/student.html', function (err, data) {
                    console.log(tabledata);

                    res.setHeader('Set-Cookie',_left.serialize('studentInfo',tabledata,'utf8',{maxAge : '5000'}));
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
            }else{
                fs.readFile('html/student.html', function (err, data) {
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                    res.end(data);
                });
            }
        });
    },
    // 学生信息查询
    studentInfro : function(req, res){
        var _left = this;
        var data;

        if(!req.cookies.isVisit){
            var sql = "select * from student where id = " + id;
            // var taba = _left.htmlload(res,sql);
            res.write(taba);
            res.end();
        } else {
            res.write(false);
            res.end();
        }
    },
    // 学生成绩查询
    studentScore : function(req, res){
        var _left = this;
        var tt;
       
        tt = url.parse(req.url,true).query;

        var sql = "select * from score where studentID = " + tt.id;
        var taba = text.sqlLink(sql);

        fs.readFile('html/studentInfo.html', function (err, data) {
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            res.end(data);
        });
    }
    ,
    // htmlload : function(res,sql,html){
    //     var _left = this;
    //     if(html==undefined){
    //         var tabledata = text.sqlLink(sql);
    //         return tabledata;
    //     } else {
    //         var tabledata = text.sqlLink(sql);
    //         if(tabledata != ''){
    //             fs.readFile('html/student.html', function (err, data) {
    //                 res.writeHead(200, { 'Content-Type': 'text/html' });
    //                 res.setHeader('Set-Cookie',_left.serialize('studentInfo',tabledata,'utf8',{maxAge : '5000'}));
    //                 res.end(data);
    //             });
    //             return tabledata;
    //         }
    //     }
    // },
     handle_request : function(req, res) {
        // 不管是什么请求，对文件的请求的话，应该是针对后缀名进行内容读取发放。
        var suffix = req.url;
        var realpath = __dirname + '\\' + '' + '\\';
        var filename = req.url.substr(0);
        if (suffix.substr(req.url.length - 4, req.url.length) === '.css') {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(this.get_file_content(realpath + suffix));
        } else if (suffix.substr(req.url.length - 3, req.url.length) === '.js') {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(this.get_file_content(realpath + suffix));
        } 
    },
    get_file_content : function(filepath) {
        return fs.readFileSync(filepath);
    },
    //生成cookie
    serialize : function (name, val, opt){
        var pairs = [name + '=' + encodeURI(val)];
        opt = opt || {};
        //Max_Age 告诉浏览器这个cookid多久后过期，与此类似的还有Expaires属性
        if(opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
        //域
        if(opt.domain) pairs.push('Domain=' + opt.domain);
        //路径
        if(opt.path) pairs.push('Path=' + opt.path);
        //在什么时间点过期
        if(opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
        //设置后只有在服务器才能访问cookie
        if(opt.httpOnly) pairs.push('HttpOnly');
        //设置后只有https中cookie才起作用。
        if(opt.secure) pairs.push('Secure');

        return pairs.join(';');
    },

    //解析cookie
    parseCookie : function(cookie){
        var cookies = {};
        if(!cookie){
            return cookies;
        };
        var list = cookie.split(';');
        for(let i = 0; i < list.length; i++){
            var pair = list[i].split('=');
            cookies[pair[0].trim()] = pair[1];
        }
        return cookies;
    }
}