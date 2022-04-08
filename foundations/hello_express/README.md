# Hello, Express

Express is a framework, it adds a lot of convenience functionality to node.js like routing, static file serving, security, auth, sessions, etc. on a need basis.

Good to get things done quick, without knowing node.js too deeply. Also great for getting things done quicker, and provide a lot of thrid party functionality via other people's open-source middleware.


## Installation
```bash
npm i express (--save?)
```


## Create express app
```javascript
// app.js

const http = require('http');
const express = require('express');

const app = express(); // returns a node request handler

// ADD ANY MIDDLEWARE HERE

// create server and pass it the middleware stack
http.createServer(app).listen(3000, function() {
    console.log('Server running on port 3000');
});
```


## Create middleware

Typical node.js server has one request handler that is passed into server. But with express, you can let the same request pass through a stack of middleware, giving the ability to do routing or apply modular request handling code to every request like auth, logging, etc.

Requests pass through middleware in order. If middleware A returns a response, request will not pass to middleware B downstream.

```javascript
// all requests 
app.use(function(req, res, next) {
    // do whatever res.end() or call next()
});
```
It's also possible to use app.get, app.post etc. Passing next an argument is a way to indicate there's an error, and control passes to error handling middleware which as err as a param in addition to req, res, and next.


## 3rd party middleware
Use 3rd party express or connect middleware to add functionality without writing it yourself.

```javascript
// 3rd party middleware
var logger = require("morgan");
app.use(logger("short"));
```


## Routing
```javascript

```