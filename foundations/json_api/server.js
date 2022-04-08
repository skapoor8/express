const http = require('http');

const express = require('express');

const API_V1 = require('./controllers/api_v1.js');
const TodoItems = require('./models/todoItem.js');


var app = express();

app.use(express.json());

app.get('/', async function(req, res, next) {
    var todoItems = await TodoItems.index();
    console.error('todoItems = ', todoItems);
    res.json({data: todoItems.map(todo => todo.toJson())})
});

app.use('/v1/', API_V1);


app.use(function(req, res, next) {
    res.send('Hello API');
});




http.createServer(app).listen(3009);