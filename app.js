var express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
var pgp = require('pg-promise')({
  // initialization options
});
var morgan = require('morgan');
var session = require('express-session');
var error = "no account found please signup";
var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('public'))
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 60 * 24}
}));

const db = pgp({
  database: 'restaurant'
});
var pbkdf2 = require('pbkdf2');
var crypto = require('crypto');
var UserName = "NOT LOGGED IN";
var UserId = "NOT LOGGED IN";

function create_hash (password) {
  var salt = crypto.randomBytes(20).toString('hex');
  var key = pbkdf2.pbkdf2Sync(
    password, salt, 36000, 256, 'sha256'
  );
  var hash = key.toString('hex');
  var stored_pass = `pbkdf2_sha256$36000$${salt}$${hash}`;
  return stored_pass;
}

function check_pass (stored_pass, password){
  console.log(stored_pass);
  var pass_parts = stored_pass.split('$');
  var key = pbkdf2.pbkdf2Sync( // make new hash
    password,
    pass_parts[2],
    parseInt(pass_parts[1]),
    256, 'sha256'
  );

  var hash = key.toString('hex');
  if (hash === pass_parts[3]) {
    return true
  }
  else {
    console.log('Passwords do not match')
  }
  return false;
}

app.get('/', function (request, response) {
  console.log(request.session.user);
  response.render('login1.hbs');

});

app.post('/', function (request, response, next) {
  let password = request.body.enterpassword;
  let user = request.body.enteremail;
  console.log('password', password);
  console.log('user', user);
  db.one(`SELECT reviewer.password, reviewer.name, reviewer.id from reviewer WHERE reviewer.email = '${user}'`)
  .then(function (results) {
    console.log(results.name);
    console.log(results.id);
    UserName = results.name;
    UserId = results.id;
    if (check_pass(results.password, password)){
      request.session.user = results;
      response.render('search_form.hbs')
  }
    else{
      let error = "incorrect password";
    response.render('login1.hbs', {error:error})
  }
  })
  .catch(function(err){
response.render('login1.hbs', {error:error})
})
});

app.post('/signup', function (request, response, next) {
   let password = create_hash(request.body.password);
   console.log(password);
  db.none("insert into reviewer values \
    (default, $1, $2, NULL, $3)", [request.body.first, request.body.email, password])
    .then(function() {
      response.redirect(`/`)    })
    .catch(next);

});


app.get('/search/res', function (request, response, next) {
  if (request.session.user)
  {
  response.render('search_form.hbs');
  }
  else
  {
  let error = "user not logged in";
  response.render('login1.hbs', {error:error})
  }
});


app.get('/search', function (request, response, next) {
  if (request.session.user) {
    let term = request.query.searchTerm
    db.any(`SELECT * from restaurant WHERE restaurant.name ilike '%${term}%'`)
    .then(function (results) {
      response.render('search_results.hbs', {results: results});
    })
    .catch(next)
  }
  else {
    response.render('login1.hbs', {error:error})
    }
});


app.get('/restaurant/new', function (request, response) {

  response.render('res_form.hbs', {title: 'restaurant entry'});

});

app.post('/restaurant/submit_new', function (request, response, next) {
  console.log('from the form', request.body);
  let query = `insert into restaurant values
    (default, $1, $2, $3) RETURNING id`
  let values = [request.body.name, request.body.address, request.body.category]
  console.log(values)
  db.one(query, values)
    .then(function(id) {
      console.log(id);
      response.redirect(`/restaurant/${id.id}`);
      })
      .catch(next);
  });


app.get('/restaurant/:id?', function (request, response, next) {
  let term = request.params.id
  console.log('Term:', term);
db.any(`SELECT
      restaurant.name as restaurant_name,
      restaurant.address,
      restaurant.category,
      reviewer.name,
      review.title,
      review.stars,
      reviewer.id,
      review.review from restaurant
      left outer join
      review on review.restaurant_id = restaurant.id
      left outer join
      reviewer on review.reviewer_id = reviewer.id
      WHERE restaurant.id = $1;`, term)
.then(function (results) {
  response.render('restaurant.hbs', {first: results[0], results: results, id: term
});
    console.log(results)
})
.catch(next);
});

app.post('/submit_review/:id', function(req, resp, next) {
  if (req.session.user) {
  var restaurantId = req.params.id;
  console.log('restaurant ID', restaurantId);
  console.log('from the form', req.body);
  console.log('username', UserName);
  console.log('userid', UserId, typeof(UserId));
  console.log('SESSION',req.session.user);
  let query = `insert into review values
    (default, $1, $2, $3, $4, $5)`
    console.log(query)
  let values = [req.session.user.id, req.body.stars, req.body.title, req.body.review, restaurantId]
  db.none(query, values)
    .then(function() {
      resp.redirect(`/restaurant/${restaurantId}`);
    })
    .catch(next);
                            }
  else{resp.render('login1.hbs', {error:error})}
});




app.get('/search/:search_term?', function (request, response) {
  let term = request.params.search_term
  response.send("This is the page for the search " + term);
});

app.get('*', function(request, response) {
response.send("ERROR 404 PAGE NOT FOUND");
});

var PORT = process.env.PORT || 8000;
var server = app.listen(PORT, function () {
  console.log('Listening on port 8000');
});

exports.server = server;
exports.create_hash = create_hash;
