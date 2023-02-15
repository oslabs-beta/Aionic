const axios = require('axios');
const {App, Node} = require('../config/MongoDb')
const {addNode} = require('./dbController.js')


const updateController = {}

//queries argoCD for all application clusters running
updateController.updateApp = async (req, res, next) => {
  try {
    console.log(res.locals)
    let data = await axios.get(`${res.locals.argoToken.url}/api/v1/applications`, {
      headers: {
        Authorization: `Bearer ${res.locals.argoToken.api_key}`,
      }
    })
    if (req === undefined) return data.data.items
    res.locals.apps = data.data.items;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: updateApp',
      status: 400,
      message: `Error updateApp `,
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
    if (req === undefined) return appList;
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

module.exports = updateController;