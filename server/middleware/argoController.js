const axios = require('axios');
const {App, Node, ApiKey, User} = require('../config/MongoDb')

const argoController = {};

//grabs all the application clusters
argoController.getApps = async (req, res, next) => {
  try {
    let data = await App.find({});
    data = data.map(app => {
      const apps = {};
      apps.name = app.name;
      apps.uid = app.uid;
      return apps;
    })
    res.locals.apps = data;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: getApps',
      status: 400,
      message: `Error getApps: ${err}`,
    });
  }
}

//grabs all the manifests for the requested application cluster
// show all manifests
argoController.getManifests = async (req, res, next) => {
  const { uid } = req.query;
  try {
    let data = await App.findOne({ uid });
    const manifests = [];
    let curr = data.tail;
    let i =0
    while (i < 5 && curr) {
      let manifestData = await Node.findOne({ _id: curr });
      manifests.push(manifestData); 
      curr = manifestData.prev;
      i++
    }
    res.locals.manifests = manifests;
    return next();
  }
  catch (err){
    return next({
      log: 'Error while invoking middleware: getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    });
  }
}

// get 5 manifests
// data comes as req.query 
// {
//   _id: string
// }
argoController.getNextManifests = async (req, res, next) => {
  const { _id } = req.query;
  try {
    let i = 0
    const manifests = [];
    let cur = _id;
    while (i< 5 && cur){
      const curNode = Node.find({_id:cur});
      manifests.push(curNode); 
      cur = curNode.prev;
      i+=1;
    }

    res.locals.manifests = manifests;
    return next();
  }
  catch (err){
    return next({
      log: 'Error while invoking middleware: getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    });
  }
}

//checks if argo token is in database
//Change it
argoController.checkToken = async (req, res, next) => {
  try {
    let data = await ApiKey.find({});
    console.log(data);
    if (data.length < 1) {
      console.log('no token');
      res.status(200).json({
        api_key: false,
        url: false,
      });
    }
    else {
      res.locals.argoToken = data
      return next();
    }
  }
  catch {
    return next({
      log: 'Error while invoking middleware: checkToken',
      status: 400,
      message: `Error checkToken: ${err}`,
    });
  }
}

// user is passed in as req,body.user
argoController.checkUserToken = async (req, res, next) => {
  try {
    const github_id = req.body.user.githubId
    const User = await User.findOne({githubId: github_id});
    // after finding user make sure user has apikey and url
    if (User.argoToken)
      return next();
    }
  catch(err) {
    console.log(err)
    return next({
      log: 'Error server/middleware/argoController : checkUserToken',
      status: 500,
      message: `Error checkToken: ${err}`,
    });
  }
}

//check for all user tokens
argoController.getUserToken = async (req, res, next) => {
  try {
    const { user } = req.query;
    let data = await User.findOne({ githubId: user });
    if (data.argo_tokens.length < 1) {
      return res.status(400).json('no token');
    }
    else {
      res.locals.argoTokens = data.argo_tokens
      return next();
    }
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: getUserToken',
      status: 400,
      message: `Error getUserToken: ${err}`,
    });
  }
}

//grabs all apps user has access to
argoController.getAllUserApps = async (req, res, next) => {
  try {
    let appList = [];
    for (let i = 0; i < res.locals.argoTokens.length; i++) {
      let data = await axios.get(`${res.locals.argoTokens[i].url}/api/v1/applications`, {
        headers: {
          Authorization: `Bearer ${res.locals.argoTokens[i].api_key}`,
        }
      })
      appList = appList.concat(data.data.items);
    }
    res.locals.apps = appList.map(app => {
      const apps = {};
      apps.name = app.metadata.name;
      apps.uid = app.metadata.uid;
      return apps;
    })
    console.log(res.locals.apps);
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: getAllUserApps',
      status: 400,
      message: `Error getAllUserApps: ${err}`,
    });
  }
}

module.exports = argoController;