const cookieParser = require('cookie-parser');
const express = require('express');
const argoController = require('./middleware/argoController');
const cors = require('cors');
const dbRouter = require('./routes/dbrouter')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get('/', (req, res) => {
  res.json('success');
})

app.get('/test', argoController.setToken, (req, res) => {
  console.log(JSON.parse(res.locals.manifest.manifests[1]))
  res.json(res.locals.manifest);
})

app.use('/db', dbRouter)

app.use((err,req,res,next) => {
  const error = {
    message: 'you will never know what is wrong with me **hint** server related ',
    status: 404,
    log: 'if you see this text you did not setup error handling -.-;;'
  }
  err = Object.assign(error, err)
  return res.status(err.status).send(err)
})
app.listen(3000, () => {
  console.log('Listening on 3000')
})