const checkManifestUpdate = require('./checkupdate.js')
const updateController = require('./updateController.js')

//updates app list for new application clusters
function checkAppsUpdate (url, api_key) {
  const intervalId = setInterval(async () => {
    try {
      console.log('checking apps update')
      const apps = await updateController.updateApp(undefined, { locals: { argoToken: { url, api_key }}})
      const appList = await updateController.updateAppDatabase(undefined, { locals: { apps }})
      await updateController.addManifestForApp(undefined, { locals: { appList, argoToken: { url, api_key }}})
      for (let i = 0; i < appList.length; i++) {
        let appDb = await App.findOne({ uid: appList[i].uid });
        const { name, uid, head, tail } = appDb;
        const checkupdate = await new checkManifestUpdate({ name, uid, head, tail }, url, api_key);
        checkupdate.update();
      }
    }
    catch (err) {
      console.error('server/middleware/updateAppList.js checkAppsUpdate', err)
    }
  }, 3000)
}

module.exports = checkAppsUpdate;