const updateController = require('./updateController.js')
const dbController = require('./dbController.js')
const {addNode} = require('../middleware/dbController.js')
const {Node, App} = require('../config/MongoDb');
const { application } = require('express');
const axios = require('axios')

//starts the auto update process
async function startAutoUpdate () {
  //check argo api_keys and urls
  let keys = await dbController.globalapikey();
  if (Array.isArray(keys)) {
    for (let i = 0; i < keys.length; i++) {
      const { url, api_key } = keys[i];
      checkAppsUpdate(url, api_key);
    }
  }else{
    console.log('no token found')
     setTimeout(startAutoUpdate, 3000)}
}

//updates app list for new application clusters
function checkAppsUpdate (url, api_key) {
  let init = true
   setInterval(async () => {
    try {
      console.log('checkAppUpdate function invoked', init)
      // makes api calls to argo
      let appList;
      const apps = await updateController.updateApp(undefined, { locals: { argoToken: { url, api_key }}}, (err)=> {console.error(err)})
      if (init) {
         appList = apps.map( app =>{
          const {name , uid} = app.metadata
          return {name, uid}
         })
         await updateController.updateAppDatabase(undefined, { locals: { apps }}, (err)=> {})
         init = false;
         console.log(appList)
      }else {
        // saving new apps to database
        appList = await updateController.updateAppDatabase(undefined, { locals: { apps }}, (err)=> {})
        console.log(appList)
      }
      
      // await updateController.addManifestForApp(undefined, { locals: { appList, argoToken: { url, api_key }}})
      if (appList !== undefined){ 
        for (let i = 0; i < appList.length; i++) {
          let appDb = await App.findOne({ uid: appList[i].uid });
          const { name, uid, head, tail } = appDb;
          const checkupdate = new checkManifestUpdate({ name, uid, head, tail }, url, api_key);
          checkupdate.update();
        }
      }
    }
    catch (err) {
      console.error('server/middleware/updateAppList.js checkAppsUpdate', err)
    }
  }, 3000)
}



//factory function checks for manifest updates
function checkManifestUpdate(app, url, api_key) {
  this.apikey = api_key
  this.url = url
  this.time = 3000
  this.checkingManifest = false;
  this.app = app
  this.intervalId = undefined
  this.revision = undefined

}



checkManifestUpdate.prototype.update = function() {
  if (!this.checkingManifest) {
    this.checkingManifest = true
    this.intervalId = setInterval(async ()=>{
      try{
        console.log('Checking Manifest Update')
        if (this.app.tail !== null) {
          if (this.revision === undefined){
            const LastNode = await Node.findOne({_id: this.app.tail})
            const {revision} = await LastNode
            this.revision = revision
          }
        }

        const response = await axios.get(`${this.url}/api/v1/applications/${this.app.name}/manifests`, {
          headers: {
            Authorization: `Bearer ${this.apikey}`
          }})
          const {manifests} = response.data
        if (this.revision !== response.data.revision) {
          console.log('revisions:',this.revision,'second', response.data.revision)
          const newNode = await addNode(undefined, {locals:{uid: this.app.uid, manifest: JSON.stringify(manifests), revision: response.data.revision}})
          console.log('newNode',newNode.revision)
          this.revision = await newNode.revision
          return newNode
        }

      }catch(err) {
        console.error('server/middleware/checkUpdate.js checkManifestUpdate', err)
      }
    },this.time)
    return this.intervalId
  }
} 

module.exports = startAutoUpdate;