const fs = require('fs');
const path = require('path');
const util = require('util');


class TodoList {
    constructor(json) {
        this.json = json;
    }

    get id() {return this.json.id;} 

    hasProperty(key) {
        return !!this.json[key];
    }

    toJson() {
        return {
            ...this.json
        }
    }
}

async function index(filters={}) {
    var todoListsJson = await processFile(),
        todoLists;
    
    todoLists = todoListsJson.map(json => new TodoList(json));

    // add filters here

    if (filters.format == 'json') {
        todoLists = todoLists.map(list => list.toJson());
    }

    return todoLists;
}

function find(filters) {

}

function get(filters) {

}

function create(params) {
    var createNew = function(todoList) {
        todoList.push({
            "type": "TodoList",
            "id": 1,
            "isMetaList": false,
            "title": "Today",
            "createdAt": null,
            "itemIds": []
        });
    }

}

function update(id, params) {

}

function remove(id) {

}

async function processFile(processor) {
    var readFileAsync = util.promisify(fs.readFile),
        writeFileAsync = util.promisify(fs.writeFile),
        jsonPath = path.join(__dirname, '..', 'json', 'todoLists.json');
    
    try {
        var todoListData = await readFileAsync(jsonPath),
            todoListJson = JSON.parse(todoListData);
        
        if (processor) {
            processor(todoListJson);
            var todoList = 
            todoList.sort((a, b) => a.id < b.id);
            await writeFileAsync(jsonPath, JSON.stringify({nextId: nextId += 1, data: todoList}, null, 4));
        }

        return todoItems;
    } catch (e) {
        console.error('todoList.js: Error reading/writing to file');
        console.error(e);
    }
}

module.exports = {
    index
}