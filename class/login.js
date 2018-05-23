'use strict';

var http = require('http');  //http的模块;
var url = require('url');   //url模块;

var server = require("./server");

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'public')));    

// app.listen(8000, (req, res) => {
//     console.log('http://127.0.0.1:8000/');
// })

http.createServer(function (req, res) {   //创建服务
    server.handle_request(req, res);
    var pathname = url.parse(req.url).pathname;
    // 通过parse的pathname这个方法,获得地址栏的: /xxx
    // 初始页面
    if (pathname == '/') {
        server.index(req, res);
    }
    //学生登录页面
    else if(pathname == '/studentLogin' ){
        server.studentLogin(req, res);
    }
    //学生信息查询
    else if(pathname == '/studentInfro' && req.method == 'POST'){
        server.studentInfro(req, res);
    }
    else if(pathname == '/studentScore' && req.method == 'GET'){
        server.studentScore(req, res);
    }

}).listen(8080, function () {
    console.log('http://localhost:8080');
});

