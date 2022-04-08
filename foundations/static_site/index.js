const http = require('http');
const path = require('path');
const express = require('express');
const { response } = require('express');

var publicPath = path.resolve(__dirname, 'public');
var app = express();

app.use(express.static(publicPath));
app.use(function(req, res) {
    // res.sendFile(path.join(__dirname+'/public/404.html'));
    res.status(404).redirect('/404.html');
});

http.createServer(app).listen(3000);