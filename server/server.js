const cookieParser = require('cookie-parser');
const express = require('express');
const argoController = require('./middleware/argoController');
const cors = require('cors');

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


app.listen(3000, () => {
  console.log('Listening on 3000')
})