const keys = require('../keys.js')
const mongoose = require('mongoose')
const {Schema} = mongoose
const uri = `mongodb+srv://${keys.MongoUser}:${keys.MongoPassword}@cluster0.axjjrae.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Aionic'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const AppSchema = new Schema({
  name: {type: String, required: true},
  uid: {type: String, required: true, unique: true},
  head: {type: String, default: null},
  tail: {type: String, default: null}
})

const NodeSchema = new Schema({
  manifest: {type: String}, //stringify
  prev: {type: String, default: null},
  next: {type: String, default: null}
})

const UserSchema = new Schema({
  githubId: {type: String, required: true},
  argo_token: {type: String, default: ''}
})

const User = new mongoose.model("User", UserSchema)
const App = new mongoose.model("App", AppSchema)
const Node = new mongoose.model("Node", NodeSchema)


module.exports ={
  User,
  App,
  Node
}