const {User, App, Node} = require('../config/MongoDb.js')
const {addNode} = require('../middleware/dbController.js')
const axios = require('axios')
function checkManifestUpdate(app, url, api_key) {
  this.apikey = api_key
  this.url = url
  this.time = 3000
  this.checkingManifest = false;
  this.app = app
  this.revision = undefined
  this.intervalId = undefined
}

checkManifestUpdate.prototype.update = function() {
  if (!this.checkingManifest) {
    this.checkingManifest = true
    this.intervalId = setInterval(async ()=>{
      try{
        console.log('Checking Manifest Update')
        if (this.revision === undefined) {
          const LastNode = await Node.findOne({_id: this.app.tail})
           this.revision = await LastNode.revision
        }

        const response = await axios.get(`${this.url}/api/v1/applications/${this.app.name}/manifests`, {
          headers: {
            Authorization: `Bearer ${this.apikey}`
          }})
          const {manifests, revision} = response.data
        if (revision !== this.revision) {
          const newNode = addNode(undefined, {locals:{uid: this.app.uid, manifest: JSON.stringify(manifests), revision: revision}})
          return newNode
        }

      }catch(err) {
        console.error('server/middleware/checkUpdate.js checkManifestUpdate', err)
      }
    },this.time)
    return this.intervalId
  }
} 

module.exports = checkManifestUpdate