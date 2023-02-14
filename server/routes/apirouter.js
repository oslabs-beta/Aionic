const express = require('express');
const router = express.Router();
const authController = require('../middleware/authController');
const argoController = require('../middleware/argoController');
const updateController = require('../middleware/updateController');
const gitController = require('../middleware/gitController');
const {checkAppsUpdate, startAutoUpdate} = require('../middleware/autoUpdate');

//endpoint for checking if user is authenticated
router.get('/checkUser', authController.isLoggedIn, (req, res) => {
  console.log('user is being checked');
  return res.json(req.user);
})

//endpoint for apps request
router.get('/apps', argoController.getUserToken, argoController.getAllUserApps, (req, res) => {
  return res.status(200).json(res.locals.apps)
});

//endpoint for manifest request for a specific app
router.get('/manifest', argoController.getManifests, (req, res) => {
  return res.json(res.locals.manifests)
})

// //endpoint to check for user argoToken and start querying
// router.get('/argoToken', argoController.getUserToken, argoController.getAllUserApps, updateController.updateAppDatabase, updateController.addManifestForApp, (req, res) => {
//   return res.status(200).json('success');
// })

//testing
router.get('/test', (req, res) => {
  startAutoUpdate()
  return res.status(200)
})

//endpoint to check for general argoToken and start autoupdating from argo to DB
router.get('/startAutoUpdate', argoController.checkToken, updateController.updateApp, updateController.updateAppDatabase, updateController.addManifestForApp, updateController.startConstantUpdate, (req, res) => {
  setTimeout(() => checkAppsUpdate(res.locals.argoToken.url, res.locals.argoToken.api_key), 5000)
  return res.status(200).json(res.locals.argoToken)
})

//endpoint to check if user has gittoken
router.get('/gitToken', gitController.checkToken, (req, res) => {
  return res.status(200).json(res.locals.gitToken)
})

module.exports = router;