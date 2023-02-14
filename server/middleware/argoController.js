const axios = require('axios');
const {App, Node, ApiKey} = require('../config/MongoDb')

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
argoController.getManifests = async (req, res, next) => {
  const { uid } = req.query;
  try {
    let data = await App.findOne({ uid });
    const manifests = [];
    let curr = data.tail;
    while (curr) {
      let manifestData = await Node.findOne({ _id: curr });
      manifests.push(manifestData.manifest); 
      curr = manifestData.prev;
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
      res.locals.argoToken = {
        api_key: data[0].api_key,
        url: data[0].url,
      };
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


module.exports = argoController;