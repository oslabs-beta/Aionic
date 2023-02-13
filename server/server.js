//importing modules
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();

//importing middleware and keys
const argoController = require('./middleware/argoController');
const authController = require('./middleware/authController');
require('./passport/passport.js');
const keys = require('./keys.js');

//importing routers
const dbRouter = require('./routes/dbrouter');
const apiRouter = require('./routes/apirouter');

//json parsing, cors, and cookie parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//setting up cookie session after logging in
app.use(cookieSession({
  name:'session',
  keys: ['key1', 'key2']
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//github will return an access token and passport will do its magic in grabbing the data and storing the user in the database
//check passport.js for more info
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    return res.redirect('http://localhost:5173/');
  });

//sends user to github for authorization and guthub will send back a code for us to grab the github access token
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

//logout session that destroy cookie and log user out from github
app.get('/logout', (req, res) => {
  console.log('get logged out punlk')
  req.session = null;
  req.logout();
  return res.redirect('/');
})

app.get('/', authController.isLoggedIn, (req, res) => {
  return res.json('success');
})

//routers
app.use('/db', dbRouter)
app.use('/api', apiRouter)

//unknown router handler
app.use('*', (req, res) => {
  return res.status(404).json({
    message: 'unknown route'
  })
})

//global error handler
app.use((err,req,res,next) => {
  const error = {
    message: 'you will never know what is wrong with me **hint** server related ',
    status: 404,
    log: 'if you see this text you did not setup error handling -.-;;'
  }
  err = Object.assign(error, err)
  return res.status(err.status).send(err)
})

//start listening to server
app.listen(3000, () => {
  console.log('Listening on 3000')
})