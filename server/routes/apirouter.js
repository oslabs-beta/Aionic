const express = require('express');
const router = express.Router();
const authController = require('../middleware/authController');
const argoController = require('../middleware/argoController');
const updateController = require('../middleware/updateController');
const gitController = require('../middleware/gitController');
const {checkAppsUpdate, startAutoUpdate} = require('../middleware/autoUpdate');
const dbController = require('../middleware/dbController');


// req.body ={
//   githubId,
//   githubToken
// }
router.post('/usergithubtoken', dbController.updateUserGitToken, (req,res)=> {
  return res.json(res.locals.response)
})

//
router.post('/userapikey', dbController.updateUserApiKey, (req,res)=> {
  return res.json(res.locals.response)
})
// req.body ={
//   api_key
//   url
// }

// this as global apiKey for autoupdate functionality
router.post('/globalkey', dbController.addKey, (req,res) =>{
  return res.json('successfully added')
})
//endpoint for checking if user is authenticated
router.get('/checkUser', authController.isLoggedIn, (req, res) => {
  console.log('user is being checked');
  return res.json(req.user);
})
//frontend request 
//endpoint for apps request
// req.query.user = string
router.get('/apps', argoController.getUserToken, argoController.getAllUserApps, (req, res) => {
  return res.status(200).json(res.locals.apps)
});

//endpoint for manifest request for a specific app

// [
//   {
//     _id: 'object_id:asdasdasdasd',
//     manifest: {type: String, required: true}, //stringify
//     revision: {type: String, required: true},
//     prev: {type: String, default: null},
//     next: {type: String, default: null}
//   }
// ]
// this gets the first five of the manifests
router.get('/manifests', argoController.getManifests, (req, res) => {
  return res.json(res.locals.manifests)
})



// [
//   {
//     _id: 'object_id:asdasdasdasd',
//     manifest: {type: String, required: true}, //stringify
//     revision: {type: String, required: true},
//     prev: {type: String, default: null},
//     next: {type: String, default: null}
//   }
// ]
// this gets the next five of the manifests
router.get('/nextManifests', argoController.getNextManifests, (req,res)=>{
  return res.json(res.locals.manifests)
}), 
// //endpoint to check for user argoToken and start querying
// router.get('/argoToken', argoController.getUserToken, argoController.getAllUserApps, updateController.updateAppDatabase, updateController.addManifestForApp, (req, res) => {
//   return res.status(200).json('success');
// })

//endpoint to check for general argoToken and start autoupdating from argo to DB
// router.get('/startAutoUpdate', argoController.checkToken, updateController.updateApp, updateController.updateAppDatabase, updateController.addManifestForApp, updateController.startConstantUpdate, (req, res) => {
//   setTimeout(() => checkAppsUpdate(res.locals.argoToken.url, res.locals.argoToken.api_key), 5000)
//   return res.status(200).json(res.locals.argoToken)
// })

//endpoint to check if user has gittoken
router.get('/gitToken', gitController.checkToken, (req, res) => {
  return res.status(200).json(res.locals.gitToken)
})

router.get('/argoToken', argoController.getUserToken, (req, res) => {
  return res.json(res.locals.argoToken);
})

module.exports = router;