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

app.post('/', function (req, res) {
		// posted_stuff = req.body.stock_ticker;
		res.render('home');
    
});



// create about page route
app.get('/about.html', function (req, res) {
    res.render('about', {
    	title: "AboutMe",
    	style: "about.css",
    });

});


// create Bollywood page route
app.get('/bollywood.html', function (req, res) {
    res.render('bollywood', {
        style: "bollywood.css",
    });

});

// create Hollywood page route
app.get('/hollywood.html', function (req, res) {
    res.render('hollywood',{
        style: "hollywood.css",
    });

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



/* Creating Page routes for Hollywood Songs Chords */

app.get('/perfect.html', function (req, res) {  
    res.render('hollywood/perfect');
});

app.get('/say_you_wont_let_go.html', function (req, res) {
    res.render('hollywood/say_you_wont_let_go');
});

app.get('/im_yours.html', function (req, res) {
    res.render('hollywood/im_yours');
});

app.get('/photograph.html', function (req, res) {
    res.render('hollywood/photograph');
});

app.get('/heyjude.html', function (req, res) {
    res.render('hollywood/heyjude');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
