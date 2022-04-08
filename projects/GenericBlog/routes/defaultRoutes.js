const express = require('express');
const defaultController = require('../controllers/defaultController');

// Create router
const router = express.Router();

/* 
instead of app.use, the same functions can be passed to the express router, 
and the router can then be returned from this module
to use this module, in the server file, import the router module

*/

/*
router.get('/', (req, res) => {
    res.render('default/index');
})

This syntax is verbose. Altrnatrely we can pass the middleware
itself to a controller - defaultController here - and access it
via the module

router.get('/', defaultController.index);
Using the route function, we can declate different http methods for 
the same route

*/

// Change layout for admin app
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default'; 
    next();
})


router.route('/')
    .get(defaultController.index);

router.route('/post/:id')
    .get(defaultController.viewPost);

router.route('/tag/:tag')
    .get(defaultController.viewTag);

router.route('/login')
    .get(defaultController.loginGet)
    .post(defaultController.loginPost);

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);

 
module.exports = router;