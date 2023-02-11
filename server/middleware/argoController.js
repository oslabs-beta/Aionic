const axios = require('axios');
const {App, Node} = require('../config/MongoDb')

const argoController = {};

argoController.setToken = (req, res, next) => {
  axios.get('https://localhost:8080/api/v1/applications', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJqYXNvbjphcGlLZXkiLCJuYmYiOjE2NzU3OTU2NzYsImlhdCI6MTY3NTc5NTY3NiwianRpIjoiZDg1M2QwYzgtNDI1MC00NGRlLTlhOTQtYjI1NjZmY2UxOGI5In0.ZH83uroRxmuckUA1oX5vjeubYm9JN-TEli_qKcBxJc0`,
    }
  })
    .then((data) => {
      console.log(data.data.items);
      res.locals.manifest = data.data;
      return next();
    })
}

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

//grabs all the manifests for the requetsed application cluster
argoController.getManifests = async (req, res, next) => {
  const { uid } = req.query;
  try {
    let data = await App.findOne({ uid });
    const manifests = [];
    let curr = data.head;
    console.log(curr);
    while (curr) {
      let manifestData = await Node.findOne({ _id: curr });
      manifests.push(manifestData.manifest); 
      curr = manifestData.next;
    }
    res.locals.manifests = manifests;
    return next();
  }
  catch {
    return next({
      log: 'Error while invoking middleware: getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    });
  }
}


module.exports = argoController;