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
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const router = require('./routes/api')
const bd = require('./routes/mysql')

var app = express();
var cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/img', express.static('public/images'));  
app.use(session({ secret: "Shh, its a secret!" }))

router.api(app) //envoie app vers routage de api
bd.routerMysql(app) //envoie app vers routage de mysql

module.exports = app;
