const fs = require('fs');
const path = require('path');

const express = require('express');

var todoRouter = express.Router();

todoRouter.get('/', function(req, res, next) {
    console.log('GET /todo/');
    fs.readFile(path.join(__dirname, '..', 'todo.json'), function(err, data) {
        if (err) {
            next(new Error('bad file'));
        }
        var todoList = JSON.parse(data).todoList;
        console.log('todo = ', todoList);
        if (req.session.error) {
            res.render('todo.index.ejs', {todo: todoList, error: req.session.error});
            delete req.session.error;
        } else if (req.session.success) {
            res.render('todo.index.ejs', {todo: todoList, success: req.session.success});
            delete req.session.success;
        } else {
            res.render('todo.index.ejs', {todo: todoList});
        }    
        console.log(todoList);
    });
    
});

todoRouter.get('/create', function(req, res, next) {
    res.render('todo.create.ejs');
});

todoRouter.post('/create', function(req, res, next) {
    fs.readFile(path.join(__dirname, '..', 'todo.json'), function(err, data) {
        if (err) {
            next(new Error('bad file'));
        }
        var todoJson = JSON.parse(data),
            todoList = todoJson.todoList,
            nextIndex = todoJson.nextId,
            newJson;
        todoList.push({
            id: nextIndex,
            task: req.body['todo-task'],
            done: false
        });
        nextIndex += 1;
        newJson = JSON.stringify({
            todoList: todoList,
            nextId: nextIndex
        }, null, 4);
        fs.writeFile(path.join(__dirname, '..', 'todo.json'), newJson, (err) => {
            if (err) {
                next(new Error('cannot write to file'));
            }
            req.session.success = 'todo created';
            res.redirect('/todo/');
        });
        
    }); 
});

todoRouter.get('/update/:id', function(req, res, next) {
    fs.readFile(path.join(__dirname, '..', 'todo.json'), function(err, data) {
        if (err) {
            next(new Error('bad file'));
        }
        var todoList = JSON.parse(data).todoList,
            todoForId = todoList.find(todo => todo.id == req.params.id);;
        if (todoForId) {
            res.render('todo.update.ejs', {todo: todoForId});
        } else {
            req.session.error = 'no todo for this id';
            res.redirect('/todo/');
        } 
    });
});

todoRouter.post('/update/:id', function(req, res, next) {
    console.log(req.url, req.body, req.params, req.query);
    fs.readFile(path.join(__dirname, '..', 'todo.json'), function(err, data) {
        if (err) {
            next(new Error('bad file'));
        }
        var todoJson = JSON.parse(data),
            todoList = todoJson.todoList,
            nextIndex = todoJson.nextId,
            newJson,
            todoForId = todoList.find(todo => todo.id == req.params.id);
        if (todoForId) {
            console.log('todo found');
            todoForId.done = req.body['todo-done'] ? true : false;
            todoForId.task = req.body['todo-task'] ? req.body['todo-task'] : todoForId.task;
            console.log('new todo = ', todoForId)
            newJson = JSON.stringify({
                todoList: todoList,
                nextId: nextIndex
            }, null, 4);

            fs.writeFile(path.join(__dirname, '..', 'todo.json'), newJson, (err) => {
                if (err) {
                    next(new Error('cannot write to file'));
                }
                req.session.success = 'todo updated';
                res.redirect('/todo/');
            });
        } else {
            req.session.error = 'no todo for this id';
            res.redirect('/todo/');
        }
    }); 
});

todoRouter.delete('/delete/:id', function(req, res, next) {
    console.log('DELETE /todo/delete/'+req.params.id);
    fs.readFile(path.join(__dirname, '..', 'todo.json'), function(err, data) {
        if (err) {
            next(new Error('bad file'));
        }
        var todoJson = JSON.parse(data),
            todoList = todoJson.todoList,
            nextIndex = todoJson.nextId,
            todoForId = todoList.find(todo => todo.id == req.params.id);
        if (todoForId) {
            todoList.splice(todoList.indexOf(todoForId), 1); 
            newJson = JSON.stringify({
                todoList: todoList,
                nextId: nextIndex
            }, null, 4);

            fs.writeFile(path.join(__dirname, '..', 'todo.json'), newJson, (err) => {
                if (err) {
                    next(new Error('cannot write to file'));
                }
                req.session.success = 'todo deleted';
                res.json({status: 'success'});
            });
        } else {
            req.session.error = 'no todo for this id';
            res.redirect('/todo/');
        }
    }); 
});

module.exports = todoRouter;