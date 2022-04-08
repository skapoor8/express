const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const { fstat } = require('fs');

var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());

var todoRouter = require('./routers/todoRouter.js');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use('/todo', todoRouter);


app.use(function(req, res, next) {
    res.send('Hello routing!');
});

app.use(function(err, req, res, next) {
    res.status(500);
    res.send('Internal Server Error')
});

http.createServer(app).listen(3008);