const http = require('http');
const path = require('path');
const express = require('express');

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get('/about', function(req, res) {
    res.end("This is the About text page.");
});

app.use(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('File not found');
});

http.createServer(app).listen(3000, function() {
    console.log("Server running on port 3000");
});