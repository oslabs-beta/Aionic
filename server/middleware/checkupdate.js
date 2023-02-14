const {User, App, Node} = require('../config/MongoDb.js')
const {addNode} = require('../middleware/dbController.js')
const axios = require('axios')
function checkManifestUpdate(app, url, api_key) {
  this.apikey = api_key
  this.url = url
  this.time = 1000
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
          if (this.revision === undefined){
          const LastNode = await Node.findOne({_id: this.app.tail})
          const {revision} = await LastNode
          this.revision = revision
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

module.exports = checkManifestUpdate