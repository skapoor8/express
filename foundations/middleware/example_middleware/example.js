const http = require('http');
const express = require('express');
const morgan_logger = require('morgan');

var app = express();

const password = 'vagabond';

// passive middleware (custom)
app.use(function(req, res, next) {
    console.log("request method: " + req.method);
    console.log(`request url: ${req.url}`);
    console.log(`query: ${JSON.stringify(req.query)} \n\n`);
    next();
});

// passive 3rd part middleware
app.use(morgan_logger("short"));
// Adding empty lines after morgan logging
app.use(function(req, res, next) {
    res.on('finish', () => {
        console.log("\n");
    });
    next();
});

// middleware that changes request - check for query param password
app.use(function(req, res, next) {
    if (req.query.password == password) {
        res.writeHead(200, {"Content-Type": "text/plain" }); // has to precede any other write
        res.write("Logged in.")
        next();
    } else {
        res.statusCode = 403;
        res.end("Not authorized");
    }
});


// final routing middleware
app.use(function(req, res) {
    //res.writeHead(200, {"Content-Type": "text/plain" });
    res.end("Hello from example middleware!");
});

http.createServer(app).listen(3000, function() {
    console.log("Server running on port 3000");
});