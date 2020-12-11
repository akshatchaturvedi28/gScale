// Guitar chords App by Akshat Chaturvedi

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const request = require('request');


const PORT = process.env.PORT || 8080;	// use web-hoster's PORT or use 5000


// Database Connection
mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set Handlebar Home GET route
app.get('/', function (req, res) {
		res.render('home',{
            style: "home.css",
        });
});

// Set Handlebar Home GET route
app.get('/home.html', function (req, res) {
		res.render('home',{
            style: "home.css",
        });
});

app.get('/users/home.html', function (req, res) {
    res.render('home',{
            style: "home.css",
        });
});

app.post('/', function (req, res) {
// posted_stuff = req.body.stock_ticker;
		res.render('home');
    
});



// create about page route
app.get('/users/about.html', function (req, res) {
    res.render('about', {
    	title: "AboutMe",
    	style: "about.css",
    });

});

app.get('/about.html', function (req, res) {
    res.render('about', {
      title: "AboutMe",
      style: "about.css",
    });

});


// create Bollywood page route
app.get('/users/bollywood.html', function (req, res) {
    res.render('bollywood', {
        style: "bollywood.css",
    });

});

// create Hollywood page route
app.get('/users/hollywood.html', function (req, res) {
    res.render('hollywood',{
        style: "hollywood.css",
    });

});


// create theory page route
app.get('/users/music-theory', function (req, res) {
    res.render('music-theory',{
        style: "music-theory.css",
    });
});


/* Creating routing for Scales */
app.get('/users/scales', function (req, res) {
    res.render('theory/scales',{
    });
});

app.get('/users/major-scale', function (req, res) {
    res.render('theory/scales/major',{
    });
});

app.get('/users/minor-scale', function (req, res) {
    res.render('theory/scales/minor',{
    });
});

app.get('/users/pentatonic-scale', function (req, res) {
    res.render('theory/scales/pentatonic',{
    });
});

app.get('/users/minor-pentatonic', function (req, res) {
    res.render('theory/scales/minor-pentatonic',{
    });
});


/* Creating routing for techniques */
app.get('/users/techniques', function (req, res) {
    res.render('theory/techniques',{
    });
});

app.get('/users/alternate-picking', function (req, res) {
    res.render('theory/techniques/alternate-picking',{
    });
});

app.get('/users/bend', function (req, res) {
    res.render('theory/techniques/bend',{
    });
});

app.get('/users/hammer-on', function (req, res) {
    res.render('theory/techniques/hammer-on',{
    });
});

app.get('/users/slide', function (req, res) {
    res.render('theory/techniques/slide',{
    });
});


/* Creating routing for types */
app.get('/users/types', function (req, res) {
    res.render('theory/types',{
    });
});


/* Routing for Cheatsheet */
app.get('/users/cheatsheet', function(req,res) {
    res.render('cheatsheet',{
    });
});

/* Routing for Chords */
app.get('/users/chords', function(req,res) {
    res.render('chords',{
    });
});

/* Creating Page routes for Bollywood Songs Chords */

app.get('/users/sun-mere-humsafar.html', function (req, res) {
    res.render('bollywood/sun-mere-humsafar');
});

app.get('/users/nazm-nazm.html', function (req, res) {
    res.render('bollywood/nazm-nazm');
});

app.get('/users/hawayein.html', function (req, res) {
    res.render('bollywood/hawayein');
});

app.get('/users/bekhayali.html', function (req, res) {
    res.render('bollywood/bekhayali');
});

app.get('/users/dil-ka-dariya.html', function (req, res) {
    res.render('bollywood/dil-ka-dariya');
});



/* Creating Page routes for Hollywood Songs Chords */

app.get('/users/perfect.html', function (req, res) {  
    res.render('hollywood/perfect');
});

app.get('/users/say_you_wont_let_go.html', function (req, res) {
    res.render('hollywood/say_you_wont_let_go');
});

app.get('/users/im_yours.html', function (req, res) {
    res.render('hollywood/im_yours');
});

app.get('/users/photograph.html', function (req, res) {
    res.render('hollywood/photograph');
});

app.get('/users/heyjude.html', function (req, res) {
    res.render('hollywood/heyjude');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));



// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Route Files
let users = require('./routes/users');
app.use('/users', users);

app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
