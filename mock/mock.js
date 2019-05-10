var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.get('*', (req, res) => {
    const urlArr = req.url.split('?')[0].split('/');
    const fileName = urlArr[urlArr.length-1];
    const file = path.join(__dirname, fileName+'.json');
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
})

var server = app.listen(4000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})