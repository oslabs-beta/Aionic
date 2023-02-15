
const {App, Node, ApiKey} = require('../config/MongoDb')



module.exports = {

  // name are comes in req.body save names into res.locals.names names are formated like below array of object to save to the database
  // [
  //   {
  //   name: String,
  //   uid: String
  //   }
  // ]
   saveApp: async(req,res,next) => {
    try {
      if (Array.isArray(res.locals.names)){
        const names = []
        for (let {name, uid} of res.locals.names) {
          names.push({name: name, uid: uid})
        }
        const response = await App.insertMany(names)
      console.log(response)
      }else {
        const err = {
          message:'server/middleware/dbController.js check the data type passed into the saveApp middleware',
          status: 422,
          log: 'server error invaild datatype'
        }
        return next(err)
      }
      return next()
    }catch(err) {
      console.log(err)
      const error = {
        message: `server/middleware/dbController.js dbController.saveApps, mongodb failed during saving new app  ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status: 500,
        log:'database error'
      }
      console.log(error)
      return next(error)
    }
  },
  // list of uid needs to be passed into the function as res.locals.uids 
  // format of the data

  //     res.locals.uids =[ String...]

   getApps: async (req,res,next) => {
    try{
      console.log('here')
      const response = await App.find().where('uid').in(res.locals.uids).exec()
      res.locals.response = await response
      return next()
    }catch(err) {
      const error = {
        message: `server/middleware/dbController.js dbController.getApps ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status: 500,
        log:'database error'
      }
      console.log(error)
      return next(error)
    }
  },
  // pass in the uid of the cluster you want to look at as res.locals.uid 
  // res.locals =
  // {
  //   uid: String, fetched from db or api this is application's uid
  //   manifest: (fetched from api and stringify it plz)
  //   revision: {fetched from api}
  // }
  addNode: async (req,res,next) => {
    // create and save the node to the app
    try {
      const {uid, manifest,revision} = res.locals
      const app = await App.findOne({uid: uid})
      const node = await Node.create({manifest: manifest, revision})
      console.log(node)
      if (app.head === null) {
        app.head = node._id
        app.tail = node._id
      }else {
        const prevNode = await Node.findOne({_id: app.tail});
        prevNode.next = node._id;
        node.prev = app.tail;
        app.tail = node._id;
        prevNode.save();
        node.save();
      }
      app.save()
      if (req === undefined) return node
      return next()
    }catch(err) {
      const error = {
        message: `server/middleware/dbController.js dbController.addNode ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status:500,
        log:'data base error'
      }
      console.log(error)
      return next(error)
    }
  },
  // pass in node as req.locals
  // {
  //   uid:
  // }
  async findLastNode(req, res, next) {
    try{
      const {uid} = req.query
      const app = await App.findOne({uid: uid})
      const lastNode = await Node.findOne({_id: app.tail})
      res.locals.response = await lastNode
      return next()
    }catch(err) {
      const error = {
        message: `server/middleware/dbController.js dbController.findLastNode ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status:500,
        log:'data base error'
      }
      console.error(error)
      return next(error)
    }
  },
  // pass in as res.locals
  // {
  //   _id: Node.prev or next
  // }
  async findNode(req, res, next) {
    try{
      const {_id} = res.locals
      const node = await Node.findOne({_id: _id})
      res.locals.response = node
      return next()
    }catch(err) {
      const error = {
        message: `server/middleware/dbController.js dbController.findNextNode ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status:500,
        log:'data base error'
      }
      console.error(err)
      console.error(error)
      return next(error)
    }
  },
  // pass in as res.locals
  // {
  //   api_key: ,
  //   uid: ,
  // }
  async addKey(req, res, next) {
    try {
      const { api_key, url } = req.body
      let data = await ApiKey.create({ api_key, url })
      return next();
    }
    catch(err) {
      const error = {
        message: `server/middleware/dbController.js dbController.addKey ${typeof err === 'object'? JSON.stringify(err) : err }`,
        status:500,
        log:'data base error'
      }
      return next(error)
    }
  },
  //finds all the admin api keys
  //passes in nothing
  async globalapikey(req, res, next) {
    try {
      let data = await ApiKey.find({});
      if (data.length < 1) {
        console.log('no token');
        if(!next) return undefined;
        return res.status(200).json({
          api_key: false,
          url: false,
        });
      }
      else {
        if(!next) return data;
        else {
          res.locals.argoToken = data;
          return next();
        }
      }
    }
    catch (err) {
      return next({
        log: 'Error while invoking middleware: dbController.checkToken',
        status: 400,
        message: `Error checkToken: ${err}`,
      });
    }
  }
}