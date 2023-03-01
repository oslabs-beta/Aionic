import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000;
import './passport/passport'

import * as authController from './controllers/authController'
import {startAutoUpdate} from './controllers/autoUpdate'
import apiRouter from './routes/apiRouter'
import * as types from './types'
// import keys from './keys'
startAutoUpdate()
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: '/' }));

app.use(cookieSession({
  name: "session",
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/'}),
  (req: Request, res: Response)=> {
    return res.redirect('/home')
  }
);

app.get('/auth/github',
  passport.authenticate('github', {scope: ['user:email']})
);

//req.logout required callback function so added one err => console.log(err)
app.get('/logout', (req: Request,res: Response)=> {
  req.session = null;
  req.logout((err)=> {console.log(err)});
  return res.json({logout: true });
})

/*********** did not make authController yet comeback to activate this route ********/
app.get('/', authController.isLoggedIn, (req:Request,res: Response)=> {
  return res.json('success')
})

app.use('/api', apiRouter)

app.use('*', (req: Request,res: Response)=> {
  return res.status(404).send({
    message: '404 requested page not found'
  })
})


app.use((err:types.error | any, req: Request, res: Response, next:NextFunction) => {
  const error:types.error = {
    message: 'you will never know what is wrong with me **hint** server related ',
    status: 404,
    log: 'if you see this text you did not setup error handling -.-;;'
  }
  err = Object.assign(error, err)
  return res.status(err.status).send(err) 
})


app.listen(PORT, ()=>{
  console.log(`listening ${PORT}...`)
})