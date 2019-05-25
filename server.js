"use strict"
const express = require('express'); // Express: Framework HTTP para Node.js
//const userAPI = require('./api/userAPI'); 
const path = require('path');

const mongoose = require('mongoose'); // Mongoose: Libreria para conectar con MongoDB
const flash    = require('connect-flash');
const logger = require('morgan');  //Morgan: llibreria per logging i debugatger
const cookieParser = require('cookie-parser'); //extensió express per parsejar cookies
const bodyParser = require('body-parser'); //extensió express per parsejar uris
const config = require('./config/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const morgan = require('morgan');

// Iniciamos la aplicación Express
const app = express();

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Content-type, Authorization, x-access-token');
  next();
});

// Configuración (Puerto de escucha, sistema de plantillas, directorio de vistas,...)
app.set('port', process.env.PORT || 5000);

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));

// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash()); // use connect-flash for flash messages stored in session


const router = express.Router();
// routes ======================================================================
require('./routes/auth.js')(app, router);
require('./routes/comments.js')(app, router); // load our routes and pass in our app and fully configured passport
require('./routes/books.js')(app, router);

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// Inicio del servidor
app.listen(app.get('port'), () => {
  	console.log('Express App listening port ' + app.get('port'));
});