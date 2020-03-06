// Stock Market Portfolio App by Akshat Chaturvedi

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080;	// use web-hoster's PORT or use 5000


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set Handlebar Home GET route
app.get('/', function (req, res) {
		res.render('home');
});

// Set Handlebar Home GET route
app.get('/home.html', function (req, res) {
		res.render('home');
});

app.post('/', function (req, res) {
		// posted_stuff = req.body.stock_ticker;
		res.render('home');
    
});



// create about page route
app.get('/about.html', function (req, res) {
    res.render('about', {
    	extra_stuff: "This is about page..."
    });

});


// create bollywood page route
app.get('/bollywood.html', function (req, res) {
    res.render('bollywood');

});

// create hollywood page route
app.get('/hollywood.html', function (req, res) {
    res.render('hollywood');

});


/* Creating Page routes for Bollywood Songs Chords */

app.get('/sun-mere-humsafar.html', function (req, res) {
    res.render('bollywood/sun-mere-humsafar');
});

app.get('/nazm-nazm.html', function (req, res) {
    res.render('bollywood/nazm-nazm');
});

app.get('/hawayein.html', function (req, res) {
    res.render('bollywood/hawayein');
});

app.get('/bekhayali.html', function (req, res) {
    res.render('bollywood/bekhayali');
});

app.get('/dil-ka-dariya.html', function (req, res) {
    res.render('bollywood/dil-ka-dariya');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
