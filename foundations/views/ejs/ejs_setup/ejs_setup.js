const http = require('http');
const path = require('path');

const express = require('express');
const ejs = require('ejs');

app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index", {
        message: "This is a variable embedded in index.ejs"
    });
});

http.createServer(app).listen(3000, function() {
    console.log("Server running on port 3000");
});

/* 
*   Questions
*   - Why "cannot get" other urls?
*/