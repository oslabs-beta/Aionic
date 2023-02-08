const keys = require('../keys.js')
const mongoose = require('mongoose')
const {Schema} = mongoose
const uri = `mongodb+srv://${keys.MongoUser}:${keys.MongoPassword}@cluster0.axjjrae.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Stonkz'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const UserSchema = new Schema({
  argo_token: {type: String, default: ''},
  App: {type: Array, default: [AppSchema]}
})

const AppSchema = new Schema({
  name: {type: String, default: ''},
  head: {type: String, default: null},
  tail: {type: String, default: null}
})

const NodeSchema = new Schema({
  manifest: {type: String}, //stringafy
  prev: {type: String, default: null},
  next: {type: String, default: null}
})

const User = new mongoose.model("User", UserSchema)
const App = new mongoose.model("App", AppSchema)
const Node = new mongoose.model("Node", NodeSchema)


module.exports ={
  User,
  App,
  Node
}