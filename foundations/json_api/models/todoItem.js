const fs = require('fs');
const path = require('path');
const util = require('util');


class TodoItem {
    constructor(json) {
        this.json = json;
    }

    get id() {return this.json.id;} 

    toJson() {
        return {
            ...this.json
        }
    }
}

async function index(filters) {
    var todoItemsJson = await processFile(),
        todoItems;
    
    todoItems = todoItemsJson.map(json => new TodoItem(json));

    // add filters here

    return todoItems;
}

function find(filters) {

}

function get(filters) {

}

function create(params) {

}

function update(id, params) {

}

function remove(id) {

}

async function processFile(processor) {
    var readFileAsync = util.promisify(fs.readFile),
        writeFileAsync = util.promisify(fs.writeFile),
        jsonPath = path.join(__dirname, '..', 'json', 'todoItems.json');
    
    try {
        var todoItemsData = await readFileAsync(jsonPath),
            todoItemsJson = JSON.parse(todoItemsData);
        
        if (processor) {
            processor(todoItemsJson);
            todoItemsJson.sort((a, b) => a.id < b.id);
            await writeFileAsync(jsonPath, JSON.stringify(todoItemsJson, null, 4));
        }

        return todoItemsJson;
    } catch (e) {
        console.error('todoItems.js: Error reading/writing to file');
        console.error(e);
    }
}

module.exports = {
    index
}