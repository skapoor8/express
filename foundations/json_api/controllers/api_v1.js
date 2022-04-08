const TodoItem = require('../models/todoItem.js');
const TodoList = require('../models/todoList.js');

var methods = {
    getTodoLists: getTodoLists,
    getTodoItems: getTodoItems
}

async function getTodoLists(params) {
    var result = await TodoList.index({...params, format: 'json'});

    var output = {
        result: result,
        error: null
    }

    return output;
}

function createTodoList(params) {

}

function updateTodoList(params) {

}

function deleteTodoList(params) {

}

function getTodoItems(params) {
    
    var output = {
        result: {
            type: 'ItemsList',
            data: []
        },
        error: null
    }

    return output;
}

function createTodoItem(params) {

}

function editTodoItem(params) {

}

function deleteTodoItem(params) {

}

async function methodParser(req, res, next) {
    var body = req.body,
        methodName = body.method,
        params = body.params,
        id = body.id,
        result;

    if (methods[methodName]) {
        result = {
            ... await methods[methodName](params),
            id: id
        }
    } else {
        result = {
            result: null,
            error: `method ${methodName} does not exist.`,
            id: id
        };
    }

    res.json(result);
}

module.exports = methodParser;