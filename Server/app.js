/********************************************************
    App
*********************************************************
    Andres Vicente Caballero Cantillo
    Alex erne
    Projet Transversal I
    Group 5 - Système de recommendation	de produits
**********************************************************/

var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'A1'
};

var sessionStore = new MySQLStore(options);

const router = require('./routes/api')
const bd = require('./routes/mysql')

var app = express();
var cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/img', express.static('public/images'));  
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

router.api(app, sessionStore) //envoie app vers routage de api
bd.routerMysql(app, sessionStore ) //envoie app vers routage de mysql

module.exports = app;
