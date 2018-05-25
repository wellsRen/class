'use strict';

var http = require('http');  //http的模块;
var url = require('url');   //url模块;
var fs = require('fs');
var server = require("./server");

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/')));    

app.listen(8080, (req, res) => {
    // var host = server.address().address
    // var port = server.address().port
    console.log('http://127.0.0.1:8080/');
})

app.get('/', function (req, res) {
    server.index(req, res);
})
app.get('/studentLogin', function (req, res) {
    server.index(req, res);
})
app.post('/studentLogin', function (req, res) {
    server.studentLogin(req, res);
})
app.post('/studentInfro', function (req, res) {
    server.studentInfo(req, res);
})
app.get('/studentScore', function (req, res) {
    server.studentScore(req, res)
})
app.get('/login', function (req, res) {
    server.login(req, res);
})
app.post('/teacherLogin', function (req, res) {
    server.teacherLogin(req, res);
})






// http.createServer(function (req, res) {   //创建服务
//     server.handle_request(req, res);
//     var pathname = url.parse(req.url).pathname;
//     // 通过parse的pathname这个方法,获得地址栏的: /xxx
//     // 初始页面
//     if (pathname == '/') {
//         server.index(req, res);
//     }
//     //学生登录页面
//     else if(pathname == '/studentLogin' ){
//         server.studentLogin(req, res);
//     }
//     //学生信息查询
//     else if(pathname == '/studentInfro' && req.method == 'POST'){
//         server.studentInfo(req, res);
//     }
//     else if(pathname == '/studentScore' && req.method == 'GET'){
//         server.studentScore(req, res);
//     }
// }).listen(8080, function () {
//     console.log('http://localhost:8080');
// });

