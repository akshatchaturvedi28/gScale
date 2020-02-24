// gScale Music App by Akshat Chaturvedi

const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const path = require('path');


const PORT = process.env.PORT || 8080;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
	res.render('home');
});




app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));

