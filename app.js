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

app. use(function (req, res, next) {
  var pathname = parseurl(req).pathname;
  if(!req.session.user && pathname != '/login') {
    res.redirect('/login');
  } else {
    next();
  }
});


app.get('/', function (req, res) {
  res.send('hello ' + req.session.user.username + ', you are logged in!');
});

app.get('/login', function (req, res) {
  res.render('login', {});
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var person = users.find(function (user) {
    return user.username === username;
  });
  if (person && person.password == password) {
    req.session.user = person;
  }

  if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});




app.listen(3000, function() {
  console.log('listening');
});
