var express = require('express');
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var parseurl = require('parseurl');

var app = express();

var users = [
  {'username': 'Batman', 'password': 'supermansucks'},
  {'username': 'Superman', 'password': 'batmansucks'},
  {'username': 'Aquaman', 'password': 'isuck'}
];

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Covfefe',
  resave: false,
  saveUninitialized: true
}));

// app. use(function (req, res, next) {
//
// });


app.get('/', function (req, res) {
  res.send('hello user, you are logged in!');
});

app.get('/login', function (req, res) {
  res.render('login', {});
});




app.listen(3000, function() {
  console.log('listening');
});
