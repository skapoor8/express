const http = require('http');
const path = require('path');
const express = require('express');

const app = express(); // returns a node request handler

// middleware is executed in order, more queue than stack - double check this

// adding a middleware that logs the requested url
app.use(function(req, res, next) {
    console.log('In comes a request to :' + req.url);
    next(); 
    // must call next to proceed to next middleware in stack
    // otherwise server will never respond to request
});

// routing with get
app.get('/hey', function(req, res) {
    res.end("Hey there");
});

// parse params with express req extensions
app.get('/hey/:first&:last', function(req, res) {
    res.end('Hey there '+req.params.first+' '+req.params.last);
});
/**
 * QUESTIONS
 * 1. what are valid param separators? & seems to work
 */

// express provides redirect
app.get('/boogeyman', function(req, res) {
    res.redirect("http://expressjs.com");
});

// and sendFile among other utilities
app.get('/random-file', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/random-file.html'));
});

// adding a view engine - must run 'npm i ejs'
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/view/:msg', function(req, res) {
    res.render('message', {
        message: req.params.msg
    });
});

// We get here if no url is matched
app.use(function(req, res) {
    res.statusCode = 404; // wouldn't be 404 without this
    res.end('404 Not Found');
});

// create server and pass it the middleware stack
http.createServer(app).listen(3000, function() {
    console.log('Server running on port 3000');
});