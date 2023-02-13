const axios = require('axios');
const {App, Node} = require('../config/MongoDb')
const {addNode} = require('./dbController.js')
const checkManifestUpdate = require('./checkupdate.js')

const updateController = {}

//queries argoCD for all application clusters running
updateController.updateApp = async (req, res, next) => {
  try {
    let data = await axios.get(`${res.locals.argoToken.url}/api/v1/applications`, {
      headers: {
        Authorization: `Bearer ${res.locals.argoToken.api_key}`,
      }
    })
    if (!next) return data.data.items
    res.locals.apps = data.data.items;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: updateApp',
      status: 400,
      message: `Error updateApp: ${err}`,
    })
  }
}

//detects all new application clusters and adds them to the database
updateController.updateAppDatabase = async (req, res, next) => {
  try {
    const appList = [];
    for (let i = 0; i < res.locals.apps.length; i++) {
      const { name, uid } = res.locals.apps[i].metadata;
      let data = await App.find({ name, uid });
      if (data.length < 1) {
        await App.create({ name, uid });
        appList.push({ name, uid });
      }
    }
    if (!next) return appList;
    res.locals.appList = appList;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: updateAppDatabase',
      status: 400,
      message: `Error updateAppDatabase: ${err}`,
    })
  }
}

//queries argoCD for the manifest of all the new application clusters
updateController.addManifestForApp = async (req, res, next) => {
  try {
    for (let i = 0; i < res.locals.appList.length; i++) {
      const data = await axios.get(`${res.locals.argoToken.url}/api/v1/applications/${res.locals.appList[i].name}/manifests`, {
        headers: {
          Authorization: `Bearer ${res.locals.argoToken.api_key}`,
        }
      })
      const { manifests, revision } = data.data;
      const newNode = await addNode(undefined, { locals: {
        uid: res.locals.appList[i].uid,
        manifest: JSON.stringify(manifests), 
        revision: revision
      }})
    }
    setTimeout(() => {
      if (!next) return;
      return next();
    }, 0)
  }
  catch (err){
    return next({
      log: 'Error while invoking middleware: addManifestToApp',
      status: 400,
      message: `Error addManifestToApp: ${err}`,
    })
  }
}

//starts constant manifest update for all application clusters
updateController.startConstantUpdate = async (req, res, next) => {
  try {
    let apps = await App.find({});
    for (let i = 0; i < apps.length; i++) {
      const { name, uid, head, tail } = apps[i];
      const { api_key, url } = res.locals.argoToken;
      const checkupdate = await new checkManifestUpdate({ name, uid, head, tail }, url, api_key);
      checkupdate.update();
    }
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: startConstantUpdate',
      status: 400,
      message: `Error startConstantUpdate: ${err}`,
    })
  }
}

module.exports = updateController;