const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session')
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const {mongoDbUrl, PORT, globalVariables} = require('./config/config');
const {selectOption} = require('./config/helperFunctions');

const app = express();

// Configure Mongoose w/ MongoDB
mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => {
        console.log('MongoDB connected');
    }).catch(err => {
        console.log('Database connection failed');
        console.log('MongoDB Err:', err);
    });

// Configure Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine to use Handlebars
app.engine('hbs', hbs({defaultLayout: 'default', extname: '.hbs', helpers: { select: selectOption }}));
app.set('view engine', 'hbs');

// add method over-ride for using DELETE method in forms
app.use(methodOverride('newMethod'));

// Flash and Session
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true,
}));

app.use(flash());

// Use global variables
app.use(globalVariables);

// File upload
app.use(fileUpload());

// Routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/haiku', adminRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
})