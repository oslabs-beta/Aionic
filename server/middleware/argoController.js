const axios = require('axios');
const {App, Node, ApiKey, User} = require('../config/MongoDb')

const argoController = {};


//grabs the first five most recent manifests for the requested application cluster
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
  const { id } = req.query;
  try {
    let i = 0
    const manifests = [];
    let cur = id;
    while (i< 5 && cur){
      const curNode = await Node.findOne({_id:cur});
      manifests.push(curNode); 
      cur = curNode.prev;
      i+=1;
    }

    res.locals.manifests = manifests;
    return next();
  }
  catch (err){
    console.log(err)
    return next({
      log: 'Error while invoking middleware: getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    });
  }
}

//check for all user tokens
argoController.getUserToken = async (req, res, next) => {
  try {
    const { user } = req.query;
    let data = await User.findOne({ githubId: user });
    console.log(data.argo_tokens.length)
    if (data.argo_tokens.length < 1) {
      return res.status(400).json({
        api_key: false,
        url: false,
      });
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
    console.log
    return next({
      log: 'Error while invoking middleware: getAllUserApps',
      status: 400,
      message: `Error getAllUserApps: ${err}`,
    });
  }
}

module.exports = argoController;