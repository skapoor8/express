# Routing

## TOC
1. Request and Response
2. Query, params and body
3. Http Verbs
4. Route Matching
5. Routers
6. Info across routes - sessions and cookies
7. HTTPS


## 1. Request and Response
Useful request methods
1. params
2. query
3. body
4. cookies

Useful respnse method
1. send
2. redirect
3. render

## 2. Query, Params and Body
Express adds a lot of convenice methods to requests:
1. request.params - from the route
2. request.query - from the query params
3. request.body - from post requests

## 3. HTTP Verbs

```javascript

app.use('/route/', middleware);     // all requests that match route
app.get('/route/', middleware);     // GET
app.post('/route/', middleware);    // POST
app.put('/route/', middleware);     // PUT
app.delete('/route/', middleware);  // DELETE

```

## 4. Route Matching
Express allows you to grab some patterns, or you can use regex. Regex can be useful for example if you're using query params to create api commands. So you can grab appropriate elements from GET https://api.com/{command: todo-index, max: 10} (urlencoded of course)

## 5. Routers
Split routes into multiple files by creating routers, one for API one for static files for example.

## 6. Sharing Info Across Routes
Use query params, sessions or cookies.

## Questions
1. Why bother with put etc. if not acceped by html forms?
2. What's the point of http response codes (other than the major ones)
3. Try catch
```javascript
app.get('/todo/update/:id', function(req, res, next) {
    var todoForId = todoList.find(todo => todo.id == req.params.id);
    if (todoForId) {
        res.render('todo.update.ejs', {todo: todoForId});
    } else {
        req.session.error = 'no todo for this id';
        res.redirect('/todo/');
    }  
});
// internal server error here because todoList doesn't exist
```
4. async await, then, vs. callbacks
5. accept json and form data in same route, yes or no?
6. How to bypass post request size limits?

