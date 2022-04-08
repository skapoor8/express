const http = require('http');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const logger = require('morgan');


var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

let notes = [];
app.locals.notes = notes;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/notes", function(req, res) {
    res.render("notes-index");
});

app.get("/notes/new", function(req, res) {
    res.render("new-note");
});

app.post("/notes/new", function(req, res) {
    console.log(req.body.title, req.body.body);
    res.end("Note creation attempted");
});

app.get("/notes/edit/:id", function(req, res) {
    res.render("edit-note", {
        note_id: req.params.id
    });
});

app.use(function(req, res) {
    res.statusCode = 404;
    res.end("Not found.");
});


http.createServer(app).listen(3000, function() {
    console.log('Server started on port 3000');
});